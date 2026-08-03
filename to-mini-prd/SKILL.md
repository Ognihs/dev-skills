---
name: to-mini-prd
description: Use this skill to write concise PRDs for product/features/experiments. Focus on alignment, not completeness.
---

Create a minimal PRD file with file name `<YYYY-MM-DD>-<short-description>.md` and following the template below in `docs/requirements` folder.

## Instructions

1. Write the document in **user's language** unless the user explicitly requests another language.
2. Keep the document short:
   - Avoid long explanations
   - Remove anything not necessary for execution alignment
3. Focus on:
   - What problem exists
   - What will be done
   - How success is measured
4. Do NOT include:
   - Technical implementation details
   - File paths
   - API specs
   - Database/schema design
   - Exhaustive edge cases
5. Prefer concrete and measurable statements over abstract descriptions.
6. If a section is irrelevant, mark it with `N/A`.

## Template

<mini-prd-template>

## Background

Describe the problem briefly.

Include:
- What is happening now
- Why it matters
- Who is affected

Keep this section short (1–3 sentences).

## Goal

Define success clearly.

Include:
- Business/User goal
- Success metric

Examples:
- Increase onboarding completion rate from 42% → 60%
- Reduce task completion time from 5min → 2min

## Solution

Describe what will be built.

Prefer:
- Core user flow
- Main behavior changes
- Scope of the feature

Avoid implementation details.

## Non-Goals

Explicitly define what is NOT included.

Examples:
- No admin support
- No multi-language support
- No redesign of existing dashboard

## Acceptance Criteria

Define what must be true for the feature to be considered complete.

Prefer checklist style.

Example:
- [ ] First-time users see onboarding
- [ ] Users can skip onboarding
- [ ] Completed users never see onboarding again

## Notes

Optional additional context, assumptions, dependencies, or risks.

If none, write `N/A`.

## Related Files

Optional name list of related documents, code files, or resources.

</mini-prd-template>