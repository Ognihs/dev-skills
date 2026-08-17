---
name: study-change
description: Study a proposed behavior change before requirement or design work by inspecting current code, documentation, tests, configuration, and history; reconstruct existing business behavior, map evidence-backed impact, and assess requirement readiness. Use when the user asks what a change would involve, how related logic currently works, whether it conflicts with existing behavior, or whether the request is clear. Do not use for defect diagnosis, general architecture audits, requirement or design writing, implementation planning, or code changes.
---

# Study a Change

Investigate a proposed change and return a bounded, evidence-backed study report. Create a checklist for the workflow and complete it in order.

## Read-Only Gate

Do not modify project files, external state, or production systems. Read-only commands and safe non-persistent inspection are allowed. Save a study report only when the user explicitly requests a file.

Do not write requirements, choose architecture, plan implementation, diagnose a defect, or implement a solution. Describe possible adjustment surfaces without turning them into a must-edit file list or an unapproved design.

## Workflow

1. **Set the boundary.** Read repository instructions, supplied inputs, and authoritative project documents. Identify the requested outcome and smallest credible investigation scope. Ask one focused question first only when the repository or minimum boundary cannot be determined; otherwise investigate before asking about user intent.
2. **Locate the behavior.** Map domain terms to real UI, API, service, model, schema, configuration, job, integration, and test entry points as relevant. Inspect comparable behavior and useful history. Treat a search miss as inconclusive.
3. **Reconstruct current logic.** Trace at least one representative normal flow and the important related error, edge, or state-transition paths within the investigation boundary. Capture calls, data transformations, validation, permissions, transactions, side effects, and business invariants only where relevant.
4. **Expand the impact surface.** Follow callers, callees, shared data, interfaces, events, jobs, configuration, tests, deployment boundaries, and external consumers. Use runtime evidence or change history when available and proportionate.
5. **Compare the request with reality.** State which existing behavior would remain, change, conflict, or depend on an unresolved decision. Classify every material surface with one impact label and one evidence confidence.
6. **Assess readiness.** Check the goal, actors, trigger, scope, normal and adverse behavior, boundaries, compatibility, data, permissions, and verifiability. Investigate answerable facts first, then separate blocking product decisions from non-blocking questions.
7. **Deliver and stop.** Return the report in the conversation by default. Do not proceed into requirement writing, design, planning, or implementation.

## Evidence Rules

Use these confidence labels:

- `Verified`: direct inspected evidence supports the stated claim at that source's level; name the evidence type.
- `Strongly supported`: multiple consistent indirect sources support the conclusion.
- `Inference`: plausible interpretation that has not been verified.
- `Unknown`: evidence is missing, inaccessible, or conflicting.

Apply these limits:

- Follow the repository's declared authority order. Current code is evidence of existing behavior, not authority for intended behavior.
- Match claims to evidence: documentation verifies documented intent or contracts, configuration verifies declared settings, code verifies the checked-out implementation, and runtime verifies only observed scenarios.
- Tests show asserted behavior but may be stale or incomplete.
- Static dependencies show possible reachability, runtime traces cover only exercised scenarios, and historical co-change suggests correlation rather than causation.
- Never claim the impact set is exhaustive. State sampled areas and uninspected boundaries for large repositories.

## Impact Labels

- `Confirmed related`: verified part of the current business or execution flow.
- `Likely affected`: the requested outcome and verified current behavior materially differ.
- `Conditional`: impact depends on an unresolved product or compatibility decision.
- `Inspected, no direct impact found`: examined with no direct effect found in the available evidence.
- `Unknown`: relevance or impact could not be established.

## Readiness Verdict

- `Ready`: no unresolved decision blocks writing a coherent requirement.
- `Partially ready`: the main outcome is stable, but a small number of explicit decisions remain.
- `Not ready`: the goal, scope, or important behavior still has materially different plausible interpretations.

List no more than three highest-priority blocking questions first. Do not ask the user for facts that repository evidence can answer.

## Report Contract

Include, and omit only when irrelevant:

1. Summary and readiness verdict.
2. Current understanding of the request.
3. Current business flow and invariants.
4. Related entry points with paths and symbols.
5. Impact map with current role, impact label, evidence confidence, and reason.
6. Existing-behavior collisions, compatibility concerns, and regression risks.
7. Blocking and non-blocking questions.
8. Inspected scope, unknowns, conflicting evidence, and validation limits.

## Completion Checklist

- The investigation boundary and authority sources are explicit.
- A representative normal flow and material related edge or error behavior are traced or marked unavailable.
- Direct dependencies, data ownership, interfaces, and test surfaces are checked where relevant.
- Every material conclusion separates evidence confidence from impact classification.
- The readiness verdict and remaining user decisions are explicit.
- No unsupported must-change claim or hidden product or architecture decision remains.
- No persistent change was made except an explicitly requested report file.
