---
name: prototype
description: Build a disposable prototype to answer a bounded design question, using an interactive terminal app for logic or state, or several UI variants on one route. Use when the user asks to prototype, exercise a data model or state machine, mock up a UI, or compare design options. Deliver runnable evidence and a finding, not production integration.
---

# Prototype a Design Question

A prototype is disposable code that answers a question. Its findings may inform a design; its code is not an approved implementation.

## Input Contract

- Establish the exact question, competing assumptions or options, and a criterion for judging the result before writing code. Extract them from supplied context and ask only for consequential missing decisions.
- Read repository instructions and relevant code. Record the starting state of files the prototype may touch and preserve unrelated changes.
- Bound the experiment to that question. If a simple textual comparison or static diagram answers it, use that evidence unless the user specifically wants a runnable prototype.

## Choose One Branch

- **Logic, state, or data shape:** read [LOGIC.md](LOGIC.md) and build a tiny interactive terminal app exposing relevant transitions and state.
- **Layout or interaction:** read [UI.md](UI.md) and build structurally different variants using the existing UI context where practical.

If the branch would materially change the experiment and the prompt does not decide it, clarify before coding. Resolve incidental tooling choices from the project's existing runtime and conventions.

## Shared Rules

1. **Keep it visibly disposable.** Name prototype files clearly and locate them near the relevant module or page. Keep the code and temporary wiring easy to identify and remove.
2. **Make it runnable.** Reuse the project's runtime and task runner; provide one command or URL. Do not add a runtime or package manager just for the experiment.
3. **Isolate effects.** Use in-memory state and stub mutations. If persistence is the question, use a clearly marked scratch store; do not connect experiments to live writes.
4. **Preserve ordinary behavior.** Existing routes keep their original behavior without explicit prototype selection. Restrict all prototype rendering and routes to development; hiding a switcher alone is insufficient.
5. **Build only what the question needs.** Skip production hardening and a comprehensive test suite, but run the prototype and exercise representative scenarios and the judging criterion. Add a small assertion or deterministic replay only when needed to trust the experiment.
6. **Expose evidence.** Show relevant state and differences. Distinguish observed results, user preference, assumptions, and untested cases; do not invent a verdict while awaiting feedback.

## Delivery and Cleanup

Provide the run command or URL, question, options, observations, verdict, remaining uncertainty, checks run, and prototype-owned files or wiring. Record the finding in an existing suitable working document when authorized; otherwise return a self-contained summary. A local `NOTES.md` may hold the pending question and next action when continued experimentation needs it.

If user evaluation is still needed, mark the result `Awaiting evaluation` and keep the runnable prototype available. A working demonstration is not proof that the design is correct.

Once the finding is captured and evaluation is finished, remove prototype-owned files and wiring unless the user wants to retain them for further inspection. Restore touched code selectively from the baseline without overwriting later user changes; verify the ordinary route or command still works. State any retained artifacts and their purpose.

Production integration is a separate authorized implementation task, subject to the project's design approval, testing, and review requirements. Do not merge a winning variant, promote a route, or move prototype logic into production as prototype cleanup. This boundary applies regardless of how the prototype was requested.

## Completion Checklist

- The question, options, and judging criterion are explicit.
- The experiment runs, or its execution limitation is clearly reported.
- Relevant scenarios were exercised and observations support the finding.
- The outcome is `Answered`, `Inconclusive`, or `Awaiting evaluation`; remaining input or investigation is named.
- Ordinary behavior and development-only isolation were checked where relevant.
- Prototype artifacts are removed after evaluation or explicitly retained with a reason.
- No production integration or design approval is implied by the prototype result.
