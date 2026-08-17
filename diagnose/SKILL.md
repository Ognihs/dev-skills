---
name: diagnose
description: Diagnose and repair hard bugs, failures, flaky behavior, and performance regressions through evidence collection, minimisation, boundary localisation, falsifiable hypotheses, and regression verification. Use when a user reports something broken, throwing, incorrect, intermittent, or slower than before, or asks to diagnose, debug, root-cause, or fix a bug. Diagnose before changing project files, and cross an explicit user-controlled change gate before applying a fix.
---

# Diagnose and Repair

Drive the problem from symptom to proven or confidence-qualified cause, then apply the smallest corrective change only after the change gate. Skip a step only when the reason and resulting evidence limitation are explicit.

## Entry Contract

- Accept a problem report plus any codebase, environment, logs, traces, dumps, screenshots, or reproduction steps available.
- Read repository instructions, relevant approved specifications and decisions, tests, configuration, dependencies, and recent history before deciding what should happen.
- Remain read-only until the change gate. Read-only commands and isolated, non-persistent experiments are allowed; persistent project edits, external-state changes, and production instrumentation are not.
- Record the starting working-tree state and preserve unrelated user changes. Run history bisection or invasive experiments in an isolated workspace when they could disturb the current checkout.
- For an active incident or possible data corruption, preserve evidence and propose containment before root-causing. Do not mutate a live system without explicit authority.

## Workflow

### 1. Define the symptom

Capture expected versus actual behavior, impact, affected and unaffected cases, first known bad and last known good state, reproducibility, and relevant code, configuration, data, dependency, environment, and timing differences. Distinguish an approved behavior change from a defect.

### 2. Build a trusted observation signal

Prefer the fastest signal that detects the exact reported failure: an existing test, isolated temporary test or harness, API or CLI invocation, captured-request replay, browser automation, trace/log/dump/metric query, property or stress loop, history bisection, or good-versus-bad differential run.

- Reproduction is preferred, not mandatory. When only production artifacts are available, continue with observational evidence and qualify confidence.
- For intermittent failures, measure the baseline failure rate and make the trigger more frequent without silently changing it into a different failure.
- Make the signal specific, repeatable, and as fast as practical. Preserve the original unminimised scenario for final verification.
- If no trustworthy signal can be obtained, list what was tried and request the smallest missing artifact, access, or permission. Do not present an untested hypothesis as root cause.

### 3. Minimise and localise

Trace one representative execution path across its meaningful boundaries. Compare inputs, outputs, state, and timing at each boundary to find the first divergence from a known-good case. Remove irrelevant inputs or components while retaining the same symptom.

For performance regressions, establish a comparable baseline before using profiles, traces, resource measurements, query plans, or bisection. For distributed or asynchronous flows, correlate evidence across boundaries with request, trace, job, or equivalent identifiers.

### 4. Test hypotheses

Maintain a concise evidence ledger:

```text
Hypothesis | Prediction | Probe | Result | Status
```

Rank credible hypotheses by likelihood, discriminatory power, test cost, and risk. Every probe must test a prediction and should change one variable at a time when an active experiment is required. Prefer existing observability, debugger inspection, or narrowly targeted instrumentation over broad logging. Tag temporary instrumentation uniquely, avoid secrets and personal data, and define its removal or rollback before adding it.

Record disconfirming evidence as carefully as confirming evidence. Add, remove, or rerank hypotheses as results arrive instead of preserving an arbitrary count.

### 5. Conclude the diagnosis

Call a root cause confirmed only when evidence connects the mechanism to the symptom and, when practical, inducing or neutralising the cause changes the observation signal as predicted. Separate the root cause, trigger, and contributing conditions. Label conclusions as `confirmed`, `strongly supported`, or `unresolved`; configuration or code inspection alone is not runtime proof.

## Change Gate

Before making persistent project changes, present:

- the diagnosis and confidence;
- the proposed minimal corrective change and expected behavior impact;
- the files or system state expected to change;
- the regression seam or strongest alternative verification;
- material risks, limitations, and unresolved evidence.

Ask whether to begin modification and wait for explicit approval after presenting this diagnosis and repair scope. Do not treat an earlier general request to fix the bug as approval of a repair whose concrete scope and risks were not yet known.

## Repair and Verify

1. Convert the minimised reproduction into a failing regression test at the highest stable public seam that captures the real failure pattern. If no meaningful automated observer is practical, document why and use the strongest deterministic alternative; do not automatically classify this as an architecture defect.
2. Apply the smallest corrective change that addresses the confirmed cause. Do not mix in cleanup or architectural refactoring.
3. Run the focused regression check, the original unminimised observation signal, and broader relevant checks supported by the repository.
4. Return to the change gate if new evidence materially expands the repair scope or risk.
5. If a safe fix requires broader changes to responsibilities, dependency direction, module boundaries, or public-contract design beyond the expected corrective behavior, stop and report the architecture evidence instead of refactoring here.

## Cleanup and Report

- Remove only temporary instrumentation and artifacts created by this diagnosis; verify unique tags are gone and preserve user-owned files.
- Report the symptom, observation method, root cause and confidence, evidence ledger summary, fix or no-fix status, validation actually run, remaining risks, and environment limitations.
- When architectural friction materially contributed, include a self-contained observation with the failure scenario, affected boundary or ownership, evidence, whether a local fix is sufficient, relevant contracts and tests, and known constraints. Leave refactor work to a separate architecture task.
- Do not assume a commit, pull request, deployment, or production change is authorised.

## Completion Checklist

- [ ] The observation signal matches the reported symptom.
- [ ] The root-cause confidence and unresolved alternatives are explicit.
- [ ] The change gate was satisfied before persistent modification.
- [ ] The original signal and regression check pass after an authorised fix, or the strongest available evidence and limitation are reported.
- [ ] Temporary diagnostic changes are removed and unrelated user changes remain intact.
