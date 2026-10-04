---
name: brainstorming
description: Resolve the material technical design decisions for a coding idea or software change through project inspection, focused questioning, approach comparison, and incremental validation, then orchestrate its approved spec. Use before implementing any feature, component, behavior change, or non-trivial refactor when design decisions remain, with or without an optional PRD or requirement document. Do not use for bug diagnosis, for implementing an already approved spec, or when the design is already resolved and only needs to be persisted or reviewed as a spec.
---

# Brainstorming Ideas Into Specs

Convert a request into an approved spec through collaborative design. Create a checklist for the workflow and complete it in order.

## Hard Gate

Do not write implementation code, scaffold, or invoke an implementation workflow until the written spec is explicitly approved and handover to another process. This applies even to small changes; a small design may be brief, but it may not be skipped.

A user-approved `prototype` is the only exception. Use it only to resolve one material design question that prose or a static diagram cannot answer reliably. Treat its code as disposable evidence, not approved implementation, and return its finding to this workflow before continuing the spec.

## Workflow

1. **Explore project context.** Read repository instructions, the project architecture document if present, relevant docs, current code, tests, and recent commits. Read any supplied PRD or requirement document as optional input. Do not ask questions the project already answers.
2. **Assess scope.** If the request spans independent subsystems, propose the split, confirm it with the user, then run the remaining workflow independently for each spec. Keep one coherent but implementation-heavy change in one spec; it may be sliced after approval when necessary.
3. **Clarify intent.** Reuse confirmed intent and decisions from supplied material; revisit them only when new evidence or a contradiction requires it, explaining why. Resolve remaining purpose, scope, constraints, compatibility, success criteria, and important edge behavior. Handle one decision context per message and ask one to three closely related questions. Prefer concrete choices and include your recommendation when useful.
4. **Compare approaches.** Present two or three materially different approaches with trade-offs and a recommendation. If only one is credible, explain why instead of inventing alternatives. Apply YAGNI.
5. **Prototype only when needed.** If a material choice must be exercised to be judged, ask the user whether to invoke the `prototype` skill. State the exact question, competing assumptions, and decision criterion. Pause design validation, run the bounded prototype, then bring its verdict back here.
6. **Validate the design.** Present it in sections sized to complexity and get confirmation after each section. Cover architecture, responsibilities, interfaces, data flow, errors, migration, and testing as relevant.
7. **Write and review the spec.** Once material design decisions are resolved, use the `to-spec` skill to write a self-contained Draft spec and complete its final review. `to-spec` owns document structure and review but must not resolve design decisions. If review reports a blocking design decision, return to the relevant steps 3–6, resolve it, then update and review the Draft again. Proceed to approval only after the review reports `Ready for User Review`. PRDs and requirement documents are context, not downstream authority.
8. **Obtain approval.** Ask the user to review the file. Resolve any requested semantic change in this workflow, then use `to-spec` to update and review the document. Only explicit approval of the exact reviewed semantic content allows `to-spec` to change the status to `Approved`; that status-only change does not require another approval.
9. **Hand off per the delivery readiness outcome.** After approval, adopt the handoff recommendation produced by the `to-spec` workflow's Delivery Readiness Gate — direct development, or an implementation plan first — and relay it to the user with its evidence. Do not define a second readiness judgment in this workflow and do not start any downstream workflow automatically.

## Visual Decisions

When a specific question would be materially clearer visually, read [`references/visual-decisions.md`](references/visual-decisions.md). Use a lightweight inline visual directly when it is sufficient. Route to `prototype` only when the decision must be exercised or experienced, and only with user consent. Do not make visual tooling a session mode.

## Design Rules

- Treat current code as evidence of existing behavior and constraints, not as the definition of intended behavior.
- Respect the agreed project architecture unless the scoped approved spec explicitly changes it. The spec takes precedence where the two conflict; carry the relevant architecture constraints or their intended change into the self-contained spec.
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
- The handoff follows the delivery readiness outcome — direct development or an implementation plan first — with no unresolved behavior, design, feasibility, or verification decision hidden behind the handoff.
