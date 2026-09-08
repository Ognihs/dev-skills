---
name: maintain-readme
description: Create, update, or maintain a repository README by inspecting current code, configuration, tests, documentation, and focused history, then producing a dense project map for humans and AI agents. Use when the user asks to create, rewrite, refresh, audit, or repair a project README. Do not use for general documentation, requirement or design writing, changelogs, contribution guides, or agent instruction files.
---

# Maintain a Project README

Create or repair the repository README as an evidence-backed orientation map. Optimize for fast human understanding and reliable AI navigation, not exhaustive documentation.

## Scope Gate

- Determine the target repository, README path, intended readers, and requested mode: create, targeted update, or maintenance audit.
- Treat a review or audit request as read-only unless the user also asks to update or repair the README.
- Modify only the README unless the user explicitly expands scope. Do not create agent instructions, detailed documentation, badges, or support and contribution policies on the user's behalf.
- Preserve accurate content and unrelated user edits. A targeted update must remain narrow, while checking adjacent statements that the change could make false.
- Follow repository instructions and declared document authority. Ask only when intended audience, scope, or a material conflict cannot be resolved from available evidence.

## Evidence Pass

Inspect the smallest sufficient set of current sources before writing:

1. Existing README and repository instructions.
2. Manifests, lockfiles, build configuration, executable entry points, and task definitions.
3. Capability or module boundaries, representative implementation paths, tests, runtime configuration, deployment assets, and external integration seams relevant to the README.
4. Authoritative project documents and focused Git history when they clarify intent, terminology, or why a surprising constraint exists.

Treat each source at its own level: approved documents define intended behavior when the repository says they are authoritative; code and configuration show the checked-out implementation; tests show asserted examples; history provides rationale, not current truth. A search miss is inconclusive. Never invent commands, versions, features, architecture, ownership, support channels, or operational guarantees. Surface unresolved conflicts instead of silently choosing a convenient claim.

## Content Contract

Choose headings and depth for the actual project. Do not emit empty or ceremonial sections. Ensure applicable content lets a reader answer:

- **Identity and purpose:** What is this project, who or what uses it, why does it exist, and what is explicitly outside its boundary?
- **Fastest verified start:** What prerequisites, setup, build, run, and first-use commands get a reader to a meaningful result?
- **Technology constraints:** Which languages, frameworks, storage systems, package tools, and important pinned versions shape development?
- **Project map:** Which business capabilities or major components exist, where do they live, and what does each own? Prefer a capability-oriented map over an exhaustive directory tree.
- **System behavior:** What architecture, execution flow, data flow, state model, or external integration must be understood before changing the project?
- **Invariants and traps:** Which stable business rules, boundaries, generated areas, destructive operations, or counterintuitive conventions are easy to misunderstand?
- **Configuration and operations:** Which configuration groups, profiles, migrations, deployment paths, observability entry points, and environment dependencies matter?
- **Verification:** Which focused and broader commands verify a normal change, and what external services or credentials do they require?
- **Deeper sources:** Where are API references, designs, runbooks, contribution rules, and agent instructions, and which source is authoritative for each kind of detail?

Libraries, services, applications, command-line tools, and monorepos need different emphasis. Include usage examples, data models, API orientation, troubleshooting, licensing, or contribution links only when they are relevant and verified.

## Information Design

- Lead with a short project summary and the quickest useful path; order later sections from orientation to deeper reference.
- Use one `#` title, descriptive hierarchical headings, stable domain terminology, exact repository paths, and copyable commands.
- Use prose for explanation, lists for simple collections or steps, tables for repeated comparable fields, and code blocks only for material readers will use.
- Use repository-relative links for repository files. Link to detailed sources of truth instead of duplicating volatile specifications, API catalogs, or runbooks.
- Keep stable summaries in README. Put agent-only behavioral rules in repository instruction files and detailed reference or design material in their authoritative locations.
- Optimize density by removing repeated framing, obvious file-by-file narration, speculative guidance, unexplained jargon, and decorative badges.
- Match the existing README language unless the user requests another; for a new README, use the user's language. Preserve established vocabulary and formatting when they remain clear and correct.

## Visuals

Use Mermaid only when a diagram makes architecture, cross-boundary flow, state transitions, or data relationships materially easier to understand. Give one diagram one relationship model, keep labels short, explain its scope in nearby text, and verify every edge against evidence. Omit the diagram when concise prose works better or rendering cannot be checked adequately.

## Maintenance Rules

- For a targeted update, trace the requested delta and repair only directly invalidated neighboring content.
- For a maintenance audit, check for stale facts, broken navigation, duplicated authorities, low-value bulk, missing orientation, and terminology drift. Do not rewrite correct content merely to impose a different style.
- Remove contradicted content; summarize and link when detail belongs elsewhere. If authority is unclear or evidence conflicts materially, leave the README honest and report the unresolved issue.
- Never expose credentials, tokens, personal data, internal secrets, or unsafe production commands. Use clear placeholders only when a documented command genuinely requires them.

## Validation

Before finishing:

1. Re-read the README as a newcomer and confirm the applicable Content Contract questions are answered without unsupported filler.
2. Verify local links and referenced paths. Check commands, versions, configuration names, and diagrams against current sources; run only safe, proportionate commands.
3. Check one-title heading hierarchy, readable rendering assumptions, consistent terminology, relative links, sensitive values, duplication, and claims that are likely to become stale.
4. Inspect the scoped diff and repository status. Confirm no unrelated file changed and no correct user content was lost.

Do not execute destructive, production, credentialed, or externally mutating operations merely to validate documentation. Distinguish passed checks from unrun, blocked, or environment-dependent checks.

## Completion Report

Report the README path, important content created or repaired, evidence inspected, validation commands and outcomes, unresolved conflicts or freshness risks, and any checks that could not be run. Do not claim rendered, runtime, or external-system validation unless it was actually performed.
