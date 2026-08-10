# dev-skills

A small, composable set of agent skills for disciplined software development. The workflow separates product intent, technical design, implementation, diagnosis, and review so that each stage has a clear input, output, and completion gate.

The skills use host-independent instructions and are intended for coding agents that support `SKILL.md`-based skills.

## Install

```bash
npx skills@latest add Ognihs/dev-skills
```

Select the skills you need, or copy individual skill directories into your agent's skills directory.

## Core Workflow

```text
Optional requirement intake
  -> brainstorming + to-spec
  -> approved spec
  -> to-roadmap, only when the spec is too large for one session
  -> feature-dev, using the full spec or exactly one selected slice
```

`brainstorming` with `to-spec`, followed by `feature-dev`, is the required path for planned feature work. Requirement intake and roadmap slicing are optional.

| Situation | Skill | Result |
| --- | --- | --- |
| Large initiative with dependent unknowns | `discover-initiative` | A compact discovery map and one selected requirement path |
| Early product idea | `to-mini-prd` | A concise, code-agnostic Mini PRD |
| Substantial requirement draft that must match current code | `improve-req-doc` | A code-grounded requirement document |
| Feature, component, behavior change, or non-trivial refactor | `brainstorming` | An approved, code-grounded spec |
| Resolved design that must be persisted | `to-spec` | A reviewed Draft that becomes authoritative after approval |
| Approved spec too large for one development session | `to-roadmap` | Ordered, independently deliverable slices |
| Approved spec or one selected slice | `feature-dev` | Tested, reviewed implementation with requirement evidence |

## Supporting Skills

| Situation | Skill |
| --- | --- |
| Hard bug or performance regression | `diagnose` |
| Stress-test a plan or design against the repository | `grill-me-with-doc` |
| Explore a state model or several UI directions before design approval | `prototype` |
| Audit architectural friction and rank evidence-backed improvement candidates | `improve-codebase-architecture` |

## Working Principles

- The approved spec is the sole authority for intended behavior and fixed technical decisions; current code is evidence of existing behavior.
- Facts should be investigated from code, documentation, history, and available tools before asking the user. Product and material design decisions remain with the user.
- Planned feature work is test-driven by default at stable public seams, delivered in vertical slices, and independently reviewed.
- Alternative verification must be explicit and evidence-backed when meaningful test-first automation is not possible.
- Preserve unrelated user changes and never claim completion without fresh verification evidence.

## Recommended Project Policy

When adopting the complete workflow, add equivalent rules to the project's agent instructions:

```markdown
### Documentation and Git

- Ask for approval before creating a Git branch. Do not commit, push, or overwrite existing user changes without explicit permission.
- Store requirement documents in `docs/requirements/` and design documents in `docs/specs/`.
- Treat design documents as the sole source of truth for intended behavior. Requirement documents and other artifacts are supporting inputs, not authorities.
- Commit only `docs/specs/` with the code. Ignore all other content under `docs/`.
- Do not make a design document reference or depend on files ignored by Git.
- When documents conflict, prefer the newer dated document, then validate it against the current executable code and configuration.

### Development

- Add appropriate docstrings and comments to generated code. Keep comments useful for long-term maintenance; do not include requirement IDs or similar delivery metadata.
- Unless the user states otherwise, assume the project serves at most a few hundred users. Avoid overengineering and accept non-critical information-security, concurrency, and edge-case risks when addressing them would add disproportionate complexity.
- Prefer the clearest, simplest solution that correctly satisfies the current requirement. Reuse existing code and language or framework capabilities before adding abstractions, dependencies, files, or configuration.
- Do not design for hypothetical future requirements or perform unrelated refactoring. Add complexity only when the current problem requires it.
```

See [AGENTS.md](AGENTS.md) for the repository's workflow-maintenance rules.

## License

[MIT](LICENSE)
