---
name: improve-req-doc
description: Refines a rough requirement by inspecting code first, asking focused questions, updating the requirement document, and saving it under docs/requirements/. Use this skill when the user provides a rough requirement or existing requirement document and wants it clarified based on the current codebase.
---

# Code-grounded Requirement Refinement

## Goal

Turn the user's rough requirement into a clear lightweight requirement document.

Final output must follow the `to-req-doc` skill and be saved to `docs/requirements/<yyyy-mm-dd>-<title>_final.md`.

## Core Rules

- Inspect code before asking the user.
- Do not ask questions that can be answered from code.
- Ask the user only about business intent, product behavior, scope, compatibility, or unresolved ambiguity.
- Ask at most 5 questions per round, 20 questions in total.
- Do not design.
- Do not implement.
- Do not create task breakdowns.
- Do not do broad brainstorming.
- Do not paste large code blocks.

## Workflow

1. Read the user's draft requirement instruction or existing requirement document.
2. Extract title, goal, scenario, known requirements, possible scope, and unclear points.
3. Search the codebase for related behavior and entry points.
4. Summarize current behavior using code evidence.
5. Compare the draft with current code behavior.
6. Ask focused clarification questions only if needed.
7. Update the requirement document after the user answers.
8. Repeat until no blocking questions remain.
9. Save the final document to `docs/requirements/<yyyy-mm-dd>-<title>_final.md` with `to-req-doc` skill.

## Code Study Targets

Look for relevant:

- UI pages, components, and routes
- API endpoints, controllers, and handlers
- services and domain logic
- models, schemas, and migrations
- configs and feature flags
- jobs, events, queues, and cron tasks
- tests
- similar existing features

## Code Evidence Rules

When mentioning code:

- Include file path.
- Include symbol name when available.
- Include endpoint or route when relevant.
- Separate confirmed behavior from inferred behavior.
- If related code is not found, say so.
- Keep each code entry explanation short.

## Initial Study Output

Respond with:

```markdown
# Requirement Refinement Study: <title>

## 1. Current Understanding

- Goal:
- Scenario:
- Known requirements:
- Possible scope:
- Possible non-scope:

## 2. Related Code Entry Points

| Type | Entry | Current Role | Relation to Requirement |
|---|---|---|---|
| UI | `<path>` / `<component>` | ... | ... |
| API | `<path>` / `<endpoint>` | ... | ... |
| Service | `<path>` / `<function>` | ... | ... |
| Model | `<path>` / `<model>` | ... | ... |
| Test | `<path>` | ... | ... |

## 3. Current Code Understanding

### Confirmed from code

### Inferred from code

### Still unknown

## 4. Requirement Gaps

## 5. Questions for User

Ask at most 5 questions with suggested answers.

### Blocking

### Can default if you agree

## 6. Next Step

After you answer, I will update the requirement document, and ask you more questions if needed. We will repeat until no blocking questions remain, then I will save the final document to `docs/requirements/<yyyy-mm-dd>-<title>_final.md`.
```

## Update Rules

When the user answers:

- Update the requirement document using `to-req-doc`.
- Prefer incremental updates if the document already exists.
- Keep unresolved questions in the document.
- If no blocking questions remain, save the document as final version.

## Save Rules

- Create `docs/requirements/` if it does not exist.
- Use current local date as `yyyy-mm-dd`.
- Generate a short file-safe title.
- English titles should use lowercase kebab-case, replace spaces and punctuation with `-`.

## Final Response

After saving, respond with:

```markdown
# Requirement Document Saved

Saved to:

`docs/requirements/<yyyy-mm-dd>-<title>_final.md`

## Summary

- Title:
- Main requirements:
- Related code entry points:
- Remaining unresolved questions:

## Next Step

Ready for later brainstorming or design.
```

## Completion Criteria

This skill is complete when:

- The requirement document follows `to-req-doc` format.
- Main behavior is clear.
- Scope and non-scope are clear.
- Related code entry points are listed.
- No blocking questions remain.
- The document is saved under `docs/requirements/`.