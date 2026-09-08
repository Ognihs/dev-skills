# Project Profiles and Examples

Read this only when project type, audience, or content selection is uncertain. It narrows README content; it does not prescribe fixed headings.

## Project Emphasis

| Project type | Human first result | Agent first navigation | Agent-critical map |
| --- | --- | --- | --- |
| Library or package | Install and run one minimal supported example | Find the public API and its implementation | API, implementation, tests, compatibility |
| Service | Start locally and confirm one healthy request or job | Find the request or job entry and business owner | Transport, service, persistence, migrations |
| User-facing application | Install or launch and complete one core action | Trace a user action through UI, state, and backend | Page, state, API, tests |
| Command-line tool | Install and run one representative command | Find command registration and its handler | Parser, handler, output, exit behavior |
| Monorepo | Identify packages and choose the correct starting package | Locate the capability-owning package and dependency direction | Ownership, shared boundaries, package READMEs |

Choose the row that best matches the project's human and agent tasks. A repository can combine profiles, but do not merge every topic from every row.

## Evidence Example

Before retaining a statement, be able to complete this record mentally or in temporary notes:

```text
Claim: Run `npm test` from the repository root.
Evidence: package.json script `test` at the repository root.
Check: Command completed locally; 24 tests passed.
README placement: Verification.
```

If only the script definition was inspected, say that the command was verified against configuration, not that the tests passed.

## Audit Finding Example

```text
High — Quick start uses a removed task
README location: README.md, Quick start
Repository evidence: package.json defines `dev`; no `start` task exists.
Impact: A new contributor's first command fails, and an agent is directed to a nonexistent task.
Correction: Replace `npm start` with `npm run dev` and state the expected local URL only if configuration confirms it.
```

Do not report a preference as a defect. A finding needs a concrete mismatch, reader failure, authority duplication, navigation problem, or material omission.

## Uncertainty Example

If code, configuration, and authoritative documents disagree:

```text
Do not write: The service supports Oracle and PostgreSQL.
Current evidence: Only the Oracle driver and configuration are present.
Design evidence: An approved document plans PostgreSQL support.
README action: Describe Oracle as current. Link or label PostgreSQL as planned only when roadmap information belongs in this README; otherwise report the conflict.
```
