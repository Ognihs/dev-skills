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
| Find deeper modules, cleaner seams, and architectural improvements | `improve-codebase-architecture` |

## Working Principles

- The approved spec is the sole authority for intended behavior and fixed technical decisions; current code is evidence of existing behavior.
- Facts should be investigated from code, documentation, history, and available tools before asking the user. Product and material design decisions remain with the user.
- Planned feature work is test-driven by default at stable public seams, delivered in vertical slices, and independently reviewed.
- Session fit covers discovery, implementation, verification, review, and fix margin; scale or ordered dependencies that prevent reliable fit are routed through a roadmap instead of guessed from document or file counts.
- Alternative verification must be explicit and evidence-backed when meaningful test-first automation is not possible.
- Preserve unrelated user changes and never claim completion without fresh verification evidence.

## Recommended Project Policy

When adopting the complete workflow, add equivalent rules to the project's agent instructions:

```markdown
- Ask before creating a Git branch, committing, or pushing. Never overwrite unrelated user changes.
- Store discovery, PRD, requirement, spec, and roadmap artifacts under their workflow-defined `docs/` paths.
- Treat `docs/specs/` as the permanent source of truth for intended behavior. Keep other workflow artifacts local or ignored unless the project explicitly chooses to track them.
- Do not make a spec depend on ignored files. For intended behavior, the active approved spec wins; for existing behavior, verify against executable code and configuration.
```

See [AGENTS.md](AGENTS.md) for the repository's workflow-maintenance rules.

## License

[MIT](LICENSE)
