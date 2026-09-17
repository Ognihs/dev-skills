---
name: study-change
description: Study a proposed behavior change before requirement or design work; reconstruct current behavior, map evidence-backed impact, and assess requirement readiness. Use when the user asks what a proposed change would involve, how its related logic works, or where it conflicts with existing behavior. Do not use for general code explanation, defect diagnosis, architecture audits, requirement or design writing, implementation planning, or code changes.
---

# Study a Change

Investigate a proposed change and return a bounded, evidence-backed study report. Track the workflow with a checklist; revisit affected steps when new evidence changes an earlier conclusion.

Input is a proposed behavior change and an identifiable target repository; incomplete intent is acceptable and no requirement document is required. If invoked with only a current-behavior question, answer the bounded question, identify the missing change intent, and stop before change-specific analysis; do not invent target behavior, impact, or a readiness verdict.

## Read-Only Gate

Do not modify project files, external state, or production systems. Read-only commands and safe non-persistent inspection are allowed. Save a study report only when the user explicitly requests a file.

Do not write requirements, choose architecture, plan implementation, diagnose a defect, or implement a solution. Describe possible adjustment surfaces without turning them into a must-edit file list or an unapproved design.

## Workflow

1. **Set the boundary.** Read repository instructions, supplied inputs, and authoritative project documents. Identify the requested outcome and smallest credible investigation scope. Ask one focused question first only when the repository or minimum boundary cannot be determined; otherwise investigate before asking about user intent.
2. **Locate the behavior.** Map domain terms to real UI, API, service, model, schema, configuration, job, integration, and test entry points as relevant. Inspect comparable behavior and useful history. Treat a search miss as inconclusive.
3. **Reconstruct current logic.** Trace at least one representative normal flow and the important related error, edge, or state-transition paths within the investigation boundary. Capture calls, data transformations, validation, permissions, transactions, side effects, and business invariants only where relevant.
4. **Expand the impact surface.** Follow callers, callees, shared data, interfaces, events, jobs, configuration, tests, deployment boundaries, and external consumers. Use runtime evidence or history when available and proportionate; if runtime inspection would violate the read-only gate, use static evidence and state the limitation.
5. **Compare the request with reality.** State which existing behavior would remain, change, conflict, or depend on an unresolved decision. Label each material impact claim and its confidence separately from the current role; split distinct conditions into separate claims. If the request is already satisfied, report that rather than inventing work.
6. **Challenge key conclusions.** Inspect the relevant branch, configuration override, consumer, or conflicting evidence most likely to overturn a major conclusion. If unavailable, disclose the limitation and qualify the conclusion.
7. **Assess readiness.** Check the goal, actors, trigger, scope, normal and adverse behavior, boundaries, compatibility, data, permissions, and verifiability. Investigate answerable facts first, then distinguish decision gaps, evidence gaps, and non-blocking questions.
8. **Deliver and stop.** End when the main questions have sufficient support and further expansion is unlikely to change scope, impact, or readiness. If blocked by inaccessible evidence or user decisions, deliver bounded findings instead of repeating unproductive searches. Return the report in the conversation; do not proceed into requirement writing, design, planning, or implementation.

## Evidence Rules

Use these confidence labels:

- `Verified`: direct inspected evidence supports the stated claim at that source's level; name the evidence type.
- `Strongly supported`: multiple consistent indirect sources support the conclusion.
- `Inference`: plausible interpretation that has not been verified.
- `Unknown`: evidence is missing, inaccessible, or conflicting.

Apply these limits:

- Follow the repository's declared authority order. Current code is evidence of existing behavior, not authority for intended behavior.
- Identify the repository and inspected code state; include revision, relevant local changes, and configuration differences when material. Attach direct source locations or symbols to important claims. Treat indexes, search summaries, and prior reports as leads; verify key claims against original evidence and check freshness where relevant.
- Match claims to evidence: documentation verifies documented intent or contracts, configuration verifies declared settings, code verifies the checked-out implementation, and runtime verifies only observed scenarios.
- Tests show asserted behavior but may be stale or incomplete.
- Static dependencies show possible reachability, runtime traces cover only exercised scenarios, and historical co-change suggests correlation rather than causation.
- Confidence belongs to a specific claim: a verified current relationship does not verify a predicted impact. Preserve independently supported facts when sources conflict, and identify which conclusion remains unresolved.
- Never claim the impact set is exhaustive. State sampled areas and uninspected boundaries for large repositories.

## Impact Labels

- `Likely affected`: evidence links the explicitly requested change to an effect on current behavior or a contract; explain how the effect propagates, not merely that a dependency exists.
- `Conditional`: impact depends on a named unresolved choice; state the condition and its consequence.
- `Inspected, no direct impact found`: examined with no direct effect found in the available evidence.
- `Unknown`: missing or conflicting material facts prevent an impact judgment.

## Readiness Verdict

- `Ready`: the goal and scope are stable enough to write coherent, verifiable requirements; no unresolved product decision or evidence gap blocks defining their meaning or scope.
- `Partially ready`: the main requirement is stable, but specific behavior remains blocked by explicit decisions or evidence gaps.
- `Not ready`: the goal, scope, or core behavior cannot be established reliably; missing decisions or evidence could reshape the requirement.

Readiness is for requirement writing, not design completion, implementation approval, or absence of risk. Unresolved implementation choices are not blockers unless they change the requirement's meaning or scope.

List up to three highest-priority blockers first. Distinguish choices requiring user decisions from facts requiring evidence; for each, state what is missing, why it blocks, and what answer or evidence would resolve it. Do not ask the user for facts that repository evidence can answer.

## Report Contract

Cover the following content, merging sections for small questions and omitting only irrelevant items. The report is supporting evidence, not an approved requirement or design decision.

1. Summary and readiness verdict.
2. Current understanding of the request.
3. Current business flow and invariants.
4. Related entry points with paths and symbols.
5. Impact map using `Surface / current role | Impact claim / condition | Label | Confidence + evidence` or an equivalent compact view.
6. Existing-behavior collisions, compatibility concerns, and regression risks.
7. Blocking decisions, blocking evidence gaps, and non-blocking questions.
8. Inspected scope and code state, unknowns, conflicting evidence, and validation limits.

## Report Presentation

- Use the smallest inline view that clarifies the current question; keep prose when a visual adds little, and show only relevant calls, states, and boundaries.
- Use a short call tree for key execution paths, Mermaid for cross-boundary interactions or state transitions, and brief pseudocode for existing business conditions. Fall back to plain text when rendering is unavailable.
- Keep impact labels, confidence, reasons, and source pointers in a compact table; place any supporting visual beside the claim it explains.
- Compare current behavior, explicitly requested behavior, and unresolved decisions without inventing target behavior or presenting proposed code or file-layout diffs as an agreed solution.
- Verify visual relationships against inspected evidence and label inferences and unknowns; static reachability must not appear as observed runtime execution. Simplification must preserve material branches and boundaries.
- Keep visuals in the conversation by default; do not create HTML or other persistent artifacts unless explicitly requested.

## Completion Checklist

- The investigation boundary and authority sources are explicit.
- A representative normal flow and material related edge or error behavior are traced or marked unavailable.
- Direct dependencies, data ownership, interfaces, and test surfaces are checked where relevant.
- Every material conclusion separates evidence confidence from impact classification.
- Key conclusions received a targeted challenge or an explicit limitation; impact claims, evidence, and readiness are consistent.
- The readiness verdict and remaining decisions or evidence gaps are explicit when a proposed change is present.
- No unsupported must-change claim or hidden product or architecture decision remains.
- No persistent change was made except an explicitly requested report file.
