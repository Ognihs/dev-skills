---
name: clarify-requirements
description: Clarify a product idea or refine an existing requirement draft into a concise requirement document, checking current code only where the intended behavior depends on it. Use when the user wants to explore, organize, or improve requirements or create a PRD before technical design. Do not trigger merely because a coding request is vague, or use for technical design, implementation planning, coding, or a critique without requirement writing.
---

# Clarify Requirements

Turn an idea, product context, or existing requirement document into agreed behavior, scope, constraints, and acceptance criteria. Input maturity determines what needs clarification, not a separate workflow or document type.

## Input and Boundaries

- Accept spoken or written ideas, product notes, PRDs, and requirement drafts without requiring a minimum level of detail or a particular source.
- Determine who has the problem, the desired outcome, target behavior, scope, non-goals, important constraints, and observable acceptance criteria.
- Record existing interfaces or data formats when they impose compatibility requirements. Do not design new APIs, schemas, architecture, module boundaries, implementation order, or delivery slices.
- Treat current code as evidence of existing behavior, not authority over intended behavior. A requirement document is design input; an approved implementation spec remains authoritative.

## Workflow

1. **Read and extract.** Read repository instructions and supplied material. Separate settled intent, claims about current behavior, assumptions, and missing decisions. Ask for the subject only if it cannot be identified.
2. **Verify relevant facts.** Apply the evidence rules below before asking questions that inspection can answer. Record only findings that affect the requirement.
3. **Clarify consequential gaps.** Prioritize decisions that change scope, core behavior, compatibility, or acceptance. Ask one to three closely related questions around one decision context per round; explain the scenario and recommend a default when justified. Resolve prerequisite decisions before asking dependent questions, and reassess remaining questions after each answer. Wait for the answer before treating intent as settled.
4. **Maintain one draft.** After each answer round, fold decisions into every affected section, preserving confirmed choices and material rationale. Apply the Decision Updates rules below; remove superseded statements rather than leaving conflicting answers in an open-question list.
5. **Review and confirm.** Check agreement between goals, scope, behavior, constraints, evidence, and acceptance criteria. Walk through each relevant role's main flow: trigger or precondition, action, observable result, and material boundary or failure behavior. Check that acceptance criteria distinguish success from failure without inventing thresholds or implementation choices. Fix inconsistencies, present the draft for confirmation, and incorporate requested changes. Do not ask again if the user has already confirmed that exact content.

## Decision Updates

- Treat a partial answer or local revision as an update, not a replacement of all prior intent. Preserve unaffected decisions; changing CSV to Excel does not remove previously confirmed export permissions.
- Honor explicit deletions and documents the user confirms as full replacements; do not restore removed decisions. If the replacement boundary is unclear and materially affects scope or behavior, clarify it before removing content.
- Accept user-initiated changes to settled choices and reconcile their consequences. Reopen a settled choice on the agent's initiative only when new evidence or a contradiction warrants it; explain why.

## Evidence Rules

- For a new idea independent of existing behavior, discuss product intent without requiring code inspection.
- When a requirement relies on claims such as "already supports," "preserve compatibility," or "replace the existing flow," inspect the relevant implementation, tests, and configuration. Stop once the claimed behavior and material constraints are sufficiently established; do not expand into a general architecture audit.
- If the user requests product-only discussion, respect that boundary and label unverified current-behavior claims as assumptions.
- When code or other evidence is unavailable, state what could not be verified. A missing fact that prevents defining scope, core behavior, or acceptance remains blocking; deliver a partial draft if it cannot be resolved.
- Distinguish verified facts, inference, assumptions, and user decisions. Cite concise verified paths and symbols only where useful, without repeating them in a second inventory.
- Inspect further if an answer introduces a new dependency on current behavior. Never infer the desired product decision from code.

## Document Rules

- Write in the user's language. Default new files to `docs/requirements/<YYYY-MM-DD>-<topic>.md` relative to the repository root unless a path is supplied.
- If no repository or writable destination is available, deliver the complete Markdown in the conversation and state that it is unsaved. Report content confirmation separately from persistence; never invent a saved path.
- When asked to improve an existing document, update that file instead of creating a duplicate. Follow its approval rules, preserve unrelated edits, and require explicit document-edit authorization before changing an approved document. A request to change implemented behavior alone does not authorize rewriting its approved spec.
- After an authorized change to confirmed behavior, scope, constraints, or acceptance criteria, mark the requirement document Draft until the revised content is confirmed. Edit authorization alone is not content confirmation. Pure wording fixes that preserve meaning do not invalidate confirmation; do not reconfirm an exact revision the user has already confirmed.
- Keep one concise document that a fresh reader can understand without the conversation. Preserve relevant source context and decision rationale; do not copy interview transcripts.
- Use the core template below for new documents; preserve an existing document's useful structure. Scale detail to the problem and group important boundary or failure behavior with its requirement. Preserve existing requirement IDs; new IDs are optional when they aid reference.
- Add a short `Current Behavior and Evidence` section only when evidence was gathered. Do not require code entries per requirement, a duplicate entry-point table, or empty technical sections.
- Keep unconfirmed content clearly labeled Draft. Record unresolved questions as blocking or deferred, with consequences and the next action; do not invent decisions to finish the document.

## Core Template

```markdown
# Requirements: <title>

- Status: Draft | Confirmed

## Background and Goals

<Problem, affected users, desired outcome, and meaningful success criteria.>

## Scope and Non-Goals

- In scope: <included behavior>
- Out of scope: <explicit exclusion>

## Target Behavior and Acceptance Criteria

### <Cohesive requirement>

<Expected behavior and important boundary or failure cases.>

- [ ] <Observable acceptance condition.>

## Constraints and Dependencies

<Relevant compatibility, business constraints, dependencies, or assumptions; none if absent.>

## Open Questions

- <Blocking or deferred question, consequence, and next action; none if resolved.>
```

## Completion and Handoff

- [ ] Goals, scope, target behavior, constraints, and acceptance criteria agree.
- [ ] Evidence limits and assumptions are explicit; no blocking question about scope, core behavior, or acceptance remains.
- [ ] The document stands alone, preserves confirmed decisions, and has been reread and corrected; it is saved or delivered in full through the stated fallback.
- [ ] The user has confirmed the final content; requirement confirmation does not approve a technical design.

Report the saved path or unsaved delivery, main requirements, evidence limits, and any deferred questions. If confirmation or blocking input is missing, report a partial Draft and the exact remaining step rather than claiming completion. If saving was explicitly required but remains unavailable, report that outstanding step even when the content is confirmed.

After confirmation, recommend `brainstorming` when material technical design decisions remain, or `to-spec` when a complete resolved design is already available. Pass the complete requirement document as self-contained input, supplying its path when saved or its full content otherwise. Do not start design or implementation automatically.
