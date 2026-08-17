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
2. **Assess scope.** If the request spans independent subsystems, propose the split, confirm it with the user, then run the remaining workflow independently for each spec. Keep one coherent but implementation-heavy change in one spec; it may be sliced after approval when necessary.
3. **Clarify intent.** Handle one decision context per message and ask one to three closely related questions. Prefer concrete choices and include your recommendation when useful. Resolve purpose, scope, constraints, compatibility, success criteria, and important edge behavior.
4. **Compare approaches.** Present two or three materially different approaches with trade-offs and a recommendation. If only one is credible, explain why instead of inventing alternatives. Apply YAGNI.
5. **Prototype only when needed.** If a material choice must be exercised to be judged, ask the user whether to invoke the `prototype` skill. State the exact question, competing assumptions, and decision criterion. Pause design validation, run the bounded prototype, then bring its verdict back here.
6. **Validate the design.** Present it in sections sized to complexity and get confirmation after each section. Cover architecture, responsibilities, interfaces, data flow, errors, migration, and testing as relevant.
7. **Write and review the spec.** Use the `to-spec` skill to write a self-contained Draft spec and complete its final review. PRDs and requirement documents are context, not downstream authority.
8. **Obtain approval.** Ask the user to review the file. Apply requested changes through `to-spec` and repeat its final review. Only explicit approval changes the status to `Approved`.
9. **Size delivery and recommend the next step.** Reassess the approved spec against relevant current code using the Delivery Sizing Gate. Resolve any sizing blocker, then recommend `feature-dev` with the full spec when the complete delivery fits one 200K development session or `to-roadmap` when scale or ordered dependencies prevent fit. State the evidence briefly. Do not start either workflow automatically.

## Delivery Sizing Gate

Size the final approved spec, not the original request or an early design impression. Include the complete delivery workload: implementation discovery, code and artifact changes, TDD or justified alternative verification, migrations and rollout, relevant broader validation, independent review, and fix margin.

Recommend the full spec for one development session only when repository evidence supports one cohesive delivery boundary that can be implemented and verified reliably within 200K. Strong roadmap signals include multiple meaningful engineering outcomes that can be delivered in order, staged data or compatibility transitions, several independent integration or verification surfaces, and expensive or slow feedback loops. These are judgment signals, not mechanical thresholds based on requirement, file, or subsystem counts. When scale or ordered dependencies prevent reliable fit, recommend `to-roadmap`. Do not use a roadmap to hide unresolved behavior, design, feasibility, or verification decisions; return to the relevant earlier step and resolve them before handoff.

## Visual Decisions

When a specific question would be materially clearer visually, read [`references/visual-decisions.md`](references/visual-decisions.md). Use a lightweight inline visual directly when it is sufficient. Route to `prototype` only when the decision must be exercised or experienced, and only with user consent. Do not make visual tooling a session mode.

## Design Rules

- Treat current code as evidence of existing behavior and constraints, not as the definition of intended behavior.
- Treat the approved spec as the sole source of truth for intended behavior and fixed technical decisions.
- Follow established patterns when they are compatible with the approved spec; otherwise make the smallest necessary targeted change.
- Preserve existing behavior outside the scope of the approved change unless the spec explicitly requires otherwise.
- Prefer cohesive units with clear responsibilities and explicit dependencies. Introduce abstractions only when they materially improve separation of concerns, reuse, or testability.
- Do not introduce abstractions, configuration, dependencies, frameworks, or infrastructure for hypothetical future requirements.
- Keep public APIs and externally observable behavior stable unless the approved spec explicitly requires a change.
- Resolve any project constraint, missing requirement, or code conflict that makes the proposed design impossible or unsafe before approving the spec.

## Completion Checklist

- Project context and optional inputs were examined.
- Product intent and important constraints are resolved.
- Meaningful approaches and trade-offs were considered.
- Any prototype finding was captured as a textual design decision.
- The written spec follows `to-spec` and passes material review.
- The user explicitly approved the final file.
- Delivery sizing covers the complete development workflow and cites repository evidence.
- No unresolved behavior, design, feasibility, or verification decision is hidden by delivery sizing.
- The valid recommended handoff is `feature-dev` or, when scale or ordered dependencies require slicing, `to-roadmap`.
