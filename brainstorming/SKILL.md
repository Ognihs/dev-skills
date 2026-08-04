---
name: brainstorming
description: Turn a coding idea or change request into an approved, code-grounded spec through project inspection, focused questioning, approach comparison, and incremental design validation. Use before implementing any feature, component, behavior change, or non-trivial refactor, with or without an optional PRD or requirement document. Do not use for bug diagnosis or for implementing an already approved spec.
---

# Brainstorming Ideas Into Specs

Convert a request into an approved spec through collaborative design. Create a checklist for the workflow and complete it in order.

## Hard Gate

Do not write implementation code, scaffold, or invoke an implementation workflow until the written spec is explicitly approved. This applies even to small changes; a small design may be brief, but it may not be skipped.

A user-approved `prototype` is the only exception. Use it only to resolve one material design question that prose or a static diagram cannot answer reliably. Treat its code as disposable evidence, not approved implementation, and return its finding to this workflow before continuing the spec.

## Workflow

1. **Explore project context.** Read repository instructions, relevant docs, current code, tests, and recent commits. Read any supplied PRD or requirement document as optional input. Do not ask questions the project already answers.
2. **Assess scope.** Split multiple independent subsystems into separate specs. Keep one coherent but implementation-heavy change in one spec; it may use `to-roadmap` after approval.
3. **Clarify intent.** Ask one focused question per message. Prefer concrete choices and include your recommendation when useful. Resolve purpose, scope, constraints, compatibility, success criteria, and important edge behavior.
4. **Compare approaches.** Present two or three materially different approaches with trade-offs and a recommendation. If only one is credible, explain why instead of inventing alternatives. Apply YAGNI.
5. **Prototype only when needed.** If a material choice must be exercised to be judged, ask the user whether to invoke the `prototype` skill. State the exact question, competing assumptions, and decision criterion. Pause design validation, run the bounded prototype, then bring its verdict back here.
6. **Validate the design.** Present it in sections sized to complexity and get confirmation after each section. Cover architecture, responsibilities, interfaces, data flow, errors, migration, and testing as relevant.
7. **Write the spec.** Use the `to-spec` skill and write a self-contained Draft spec. PRDs and requirement documents are context, not downstream authority.
8. **Review the spec.** Read [`references/spec-review.md`](references/spec-review.md), review the written file, and fix material issues.
9. **Obtain approval.** Ask the user to review the file. Apply requested changes and repeat review. Only explicit approval changes the status to `Approved`.
10. **Recommend the next step.** If implementation and verification fit one session, recommend `feature-dev` with the full spec. Otherwise recommend `to-roadmap`. Do not start either workflow automatically.

## Visual Decisions

When a specific question would be materially clearer visually, read [`references/visual-decisions.md`](references/visual-decisions.md). Use a lightweight inline visual directly when it is sufficient. Route to `prototype` only when the decision must be exercised or experienced, and only with user consent. Do not make visual tooling a session mode.

## Design Rules

- Treat current code as evidence of existing behavior, not intended behavior.
- Follow established patterns unless a targeted change is necessary for the requested design. Exclude unrelated refactoring.
- Prefer small units with clear responsibilities, interfaces, dependencies, and independent tests.
- Make the approved spec the sole source of truth for intended behavior and fixed technical decisions.
- Do not commit the spec or mutate unrelated files unless the user asks.

## Completion Checklist

- Project context and optional inputs were examined.
- Product intent and important constraints are resolved.
- Meaningful approaches and trade-offs were considered.
- Any prototype finding was captured as a textual design decision.
- The written spec follows `to-spec` and passes material review.
- The user explicitly approved the final file.
- The recommended handoff is `feature-dev` or, only when needed, `to-roadmap`.
