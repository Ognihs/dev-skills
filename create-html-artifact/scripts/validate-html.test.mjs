import assert from "node:assert/strict";
import { after, test } from "node:test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const validatorPath = join(scriptDirectory, "validate-html.mjs");
const fixtureDirectory = mkdtempSync(join(tmpdir(), "html-artifact-validation-"));

after(() => rmSync(fixtureDirectory, { recursive: true, force: true }));

/** Build the smallest complete artifact around a fixture fragment. */
function artifact(body, head = "") {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Fixture</title>${head}</head><body><main><h1>Fixture</h1>${body}</main></body></html>`;
}

/** Run the public validator CLI against one isolated temporary artifact. */
function validate(name, html, extraArguments = []) {
  const path = join(fixtureDirectory, `${name}.html`);
  writeFileSync(path, html, "utf8");
  return spawnSync(process.execPath, [validatorPath, path, ...extraArguments], { encoding: "utf8" });
}

test("accepts a minimal self-contained artifact", () => {
  const result = validate("valid", artifact("<p>Complete content.</p>"));
  assert.equal(result.status, 0, result.stderr);
});

test("rejects common runtime network paths", async (context) => {
  const cases = [
    ["fetch", artifact('<script>fetch("https://example.com/data.json")</script>')],
    ["xhr", artifact("<script>new XMLHttpRequest()</script>")],
    ["websocket", artifact('<script>new WebSocket("wss://example.com")</script>')],
    ["event-source", artifact('<script>new EventSource("https://example.com/events")</script>')],
    ["beacon", artifact('<script>navigator.sendBeacon("https://example.com", "data")</script>')],
    ["worker", artifact('<script>new Worker("./worker.js")</script>')],
    ["import-scripts", artifact('<script>importScripts("./worker.js")</script>')],
    ["sibling-import", artifact('<script type="module">import("./helper.js")</script>')],
    ["form-action", artifact('<form action="https://example.com/submit"><button>Send</button></form>', "<style>:focus-visible{outline:2px solid}</style>")],
    ["svg-image", artifact('<svg viewBox="0 0 10 10"><title>Remote image</title><desc>External media.</desc><image href="https://example.com/image.png"/></svg>')],
    ["base-url", artifact("<p>Content.</p>", '<base href="https://example.com/">')],
    ["meta-refresh", artifact("<p>Content.</p>", '<meta http-equiv="refresh" content="0;url=https://example.com">')],
  ];

  for (const [name, html] of cases) {
    await context.test(name, () => {
      const result = validate(name, html);
      assert.equal(result.status, 1, `${name} unexpectedly passed`);
      assert.match(result.stderr, /- ERROR:/);
    });
  }
});

test("does not treat data-style as an inline style attribute", () => {
  const result = validate("data-style", artifact('<div data-style="background:url(https://example.com/image.png)">Text</div>'));
  assert.equal(result.status, 0, result.stderr);
});

test("does not treat data-src as a script source attribute", () => {
  const result = validate("data-src", artifact('<script data-src="https://example.com/script.js">const ready = true;</script>'));
  assert.equal(result.status, 0, result.stderr);
});

test("requires both title and description for informative SVG", () => {
  const result = validate("svg-title-only", artifact('<svg viewBox="0 0 10 10"><title>Circle</title><circle cx="5" cy="5" r="4"/></svg>'));
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /without a <desc>/i);
});

test("allows hidden decorative SVG without accessible-text warnings", () => {
  const result = validate("svg-decorative", artifact('<svg aria-hidden="true" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4"/></svg>'));
  assert.equal(result.status, 0, result.stderr);
  assert.doesNotMatch(result.stdout, /title|description|<desc>/i);
});

test("requires UTF-8 metadata", () => {
  const html = '<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width"><title>Fixture</title></head><body><main><h1>Fixture</h1></main></body></html>';
  const result = validate("missing-charset", html);
  assert.equal(result.status, 1, "missing charset unexpectedly passed");
  assert.match(result.stderr, /UTF-8/i);
});

test("allows only explicitly approved and fully pinned remote Mermaid", () => {
  const pinned = artifact('<script src="https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js"></script>');
  const pinnedResult = validate("pinned-mermaid", pinned, ["--allow-remote-mermaid"]);
  assert.equal(pinnedResult.status, 0, pinnedResult.stderr);

  const floating = artifact('<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>');
  const floatingResult = validate("floating-mermaid", floating, ["--allow-remote-mermaid"]);
  assert.equal(floatingResult.status, 1, "floating Mermaid unexpectedly passed");
});
