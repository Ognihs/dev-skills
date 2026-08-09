---
name: improve-req-doc
description: Refine an existing substantial requirement input by inspecting the current code, discussing gaps, and producing an accurate requirement document under docs/requirements/. Use when the input already contains enough product intent to need structured, code-grounded reconciliation. Do not use for early-stage product exploration, technical design, implementation planning, or coding.
---

# Code-Grounded Requirement Refinement

Convert an existing substantial input into accurate, cohesive requirement points. Before writing or updating the document, read [`references/requirement-document-format.md`](references/requirement-document-format.md) completely and follow it.

## Workflow

1. Read the input and extract its goal, scenarios, requirements, scope, and gaps. Stop and report missing product intent if it is not substantial enough for code-grounded refinement.
2. Trace related UI, API, service, model, configuration, job, and test entry points as relevant.
3. Summarize confirmed behavior, inferred behavior, and unresolved gaps with concise path and symbol evidence.
4. Ask focused questions only where user intent is required.
5. Update the requirement document incrementally after each answer round.
6. Repeat until no blocking question remains, then perform a consistency review.
7. Save to `docs/requirements/<YYYY-MM-DD>-<title>-requirements.md`.

## Rules

- Inspect relevant code before asking questions.
- Treat supporting product summaries as context, not as sufficient reason to create this document.
- Do not ask questions that code or the supplied input already answers.
- Separate confirmed code behavior, inference, and desired product behavior.
- Ask only about unresolved behavior, scope, compatibility, constraints, or business intent, with at most three focused questions per round.
- Recommend a default when useful, but do not invent a product decision.
- Split requirements into cohesive, testable points, not session-sized tasks.
- Do not design architecture, plan implementation order, create a roadmap, or implement code.

## Gotchas

- Current code describes what exists; it does not decide what should exist.
- A requirement point may span multiple 200K development sessions. Roadmap slicing happens only after an approved spec exists.
- Do not silently restore decisions omitted from the latest user-approved input.
- Keep non-blocking unresolved questions explicit in the final document.

## Completion Checklist

- The reference format is followed.
- Scope, non-scope, target behavior, boundaries, and acceptance criteria agree.
- Relevant code paths and symbols are verified or marked inferred/not found.
- No blocking question remains.
- The saved document is ready as input to technical design.

After saving, report the path, main requirement points, relevant code entry points, and any non-blocking unresolved questions.

## Handoff

After the user confirms the saved requirement document, recommend `brainstorming` for technical design.
