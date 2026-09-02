#!/usr/bin/env node

/**
 * Validate universal invariants for a durable HTML artifact without requiring
 * a frontend package or build tool. Remote Mermaid is an explicit exception.
 */

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const allowRemoteMermaid = args.includes("--allow-remote-mermaid");
const inputPath = args.find((argument) => argument !== "--allow-remote-mermaid");

if (!inputPath) {
  console.error("Usage: node validate-html.mjs <artifact.html> [--allow-remote-mermaid]");
  process.exit(2);
}

const artifactPath = resolve(inputPath);
let html;

try {
  html = await readFile(artifactPath, "utf8");
} catch (error) {
  console.error(`Unable to read ${artifactPath}: ${error.message}`);
  process.exit(2);
}

const failures = [];
const warnings = [];

function requireMatch(pattern, message) {
  if (!pattern.test(html)) failures.push(message);
}

function rejectMatch(pattern, message) {
  if (pattern.test(html)) failures.push(message);
}

function findStartTags(names) {
  const pattern = new RegExp(`<(?:${names.join("|")})\\b[^>]*>`, "gi");
  return [...html.matchAll(pattern)].map((match) => match[0]);
}

function getAttribute(tag, name) {
  const pattern = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i");
  const match = tag.match(pattern);
  return match ? (match[1] ?? match[2] ?? match[3]) : undefined;
}

/** Return whether a URL is an HTTPS Mermaid CDN asset pinned to a full version. */
function isPinnedRemoteMermaid(source) {
  try {
    const url = new URL(source);
    const allowedHosts = new Set(["cdn.jsdelivr.net", "unpkg.com"]);
    return url.protocol === "https:" && allowedHosts.has(url.hostname) && /(?:^|\/)mermaid@\d+\.\d+\.\d+(?:[-+][^/]*)?\//i.test(url.pathname);
  } catch {
    return false;
  }
}

/** Validate one external script reference against the narrow Mermaid exception. */
function validateExternalScript(source) {
  if (allowRemoteMermaid && isPinnedRemoteMermaid(source)) {
    warnings.push(`Pinned remote Mermaid runtime allowed by explicit validation flag: ${source}`);
  } else {
    failures.push(`External or sibling script dependency is not allowed: ${source}`);
  }
}

const cssFragments = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((match) => match[1]);
for (const tag of findStartTags(["[a-z][a-z0-9:-]*"])) {
  const inlineStyle = getAttribute(tag, "style");
  if (inlineStyle) cssFragments.push(inlineStyle);
}
const css = cssFragments.join("\n");

requireMatch(/<!doctype\s+html\s*>/i, "Missing <!doctype html>.");
requireMatch(/<html\b[^>]*\blang\s*=\s*["'][^"']+["']/i, "Missing a non-empty html lang attribute.");
requireMatch(/<title\b[^>]*>\s*[^<\s][\s\S]*?<\/title>/i, "Missing a meaningful document title.");
requireMatch(/<meta\b[^>]*\bname\s*=\s*["']viewport["'][^>]*>/i, "Missing viewport metadata.");

if (/@import\s+(?:url\s*\()?\s*["']?/i.test(css)) {
  failures.push("CSS @import dependencies are not allowed.");
}

for (const tag of findStartTags(["script"])) {
  const source = getAttribute(tag, "src");
  if (source !== undefined) validateExternalScript(source);
}

const inlineScriptBodies = [...html.matchAll(/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
for (const body of inlineScriptBodies) {
  const remoteImports = body.matchAll(/\bimport(?:\s+[^"'()]*?\s+from\s+|\s*\(\s*|\s*)(["'])(https?:\/\/[^"']+)\1/gi);
  for (const match of remoteImports) validateExternalScript(match[2]);
}

for (const tag of findStartTags(["link"])) {
  const rel = getAttribute(tag, "rel") ?? "";
  if (/\b(?:stylesheet|preload|modulepreload|icon)\b/i.test(rel)) {
    failures.push("Linked styles, preload resources, and icons are not allowed.");
  }
}

for (const tag of findStartTags(["img", "source", "audio", "video", "track", "iframe", "embed"])) {
  const source = getAttribute(tag, "src");
  if (source && !source.startsWith("data:") && !source.startsWith("#")) {
    failures.push(`Media must be inline, found src=${source}.`);
  }
  if (getAttribute(tag, "srcset") !== undefined) {
    failures.push("srcset is not allowed; embed one data URI or use inline SVG.");
  }
}

for (const tag of findStartTags(["video"])) {
  const poster = getAttribute(tag, "poster");
  if (poster && !poster.startsWith("data:")) {
    failures.push(`Video poster images must be inline, found poster=${poster}.`);
  }
}

for (const tag of findStartTags(["object"])) {
  const data = getAttribute(tag, "data");
  if (data && !data.startsWith("data:")) {
    failures.push(`Object data must be inline, found data=${data}.`);
  }
}

for (const match of css.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)) {
  const value = match[2].trim();
  if (value && !value.startsWith("data:") && !value.startsWith("#")) {
    failures.push(`CSS resource must be inline, found url(${value}).`);
  }
}

rejectMatch(/\b(?:PLACEHOLDER|LOREM\s+IPSUM)\b/i, "Unfinished placeholder content remains.");

if (/\b(?:TODO|TBD)\b/i.test(html)) {
  warnings.push("TODO or TBD text found; confirm that it is source content rather than an unfinished placeholder.");
}

for (const match of html.matchAll(/(<svg\b[^>]*>)([\s\S]*?)<\/svg>/gi)) {
  if (!/\bviewBox\s*=\s*["'][^"']+["']/i.test(match[1])) {
    warnings.push("Inline SVG found without a responsive viewBox.");
  }
  if (!/<(?:title|desc)\b/i.test(match[2])) {
    warnings.push("Inline SVG found without a title or description element.");
  }
}

if (/<(?:button|a\b[^>]*href|input|select|textarea)\b/i.test(html) && !/:focus(?:-visible)?\b/i.test(html)) {
  warnings.push("Interactive content found without an obvious CSS focus style.");
}

if (/(?:animation\s*:|transition\s*:|@keyframes\b)/i.test(css) && !/prefers-reduced-motion/i.test(css)) {
  warnings.push("Motion found without prefers-reduced-motion handling.");
}

if (!/<main\b/i.test(html)) warnings.push("No <main> landmark found.");
if (!/<h1\b/i.test(html)) warnings.push("No <h1> found.");

if (failures.length > 0) {
  console.error(`HTML artifact validation failed: ${artifactPath}`);
  for (const failure of failures) console.error(`- ERROR: ${failure}`);
  for (const warning of warnings) console.error(`- WARN: ${warning}`);
  process.exit(1);
}

console.log(`HTML artifact validation passed: ${artifactPath}`);
for (const warning of warnings) console.log(`- WARN: ${warning}`);
