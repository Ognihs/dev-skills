# dev-skills

A small, composable set of agent skills for disciplined software development. The workflow separates product intent, technical design, implementation, diagnosis, and review so that each stage has a clear input, output, and completion gate.

The skills use host-independent instructions and are intended for coding agents that support `SKILL.md`-based skills.

## Install

```bash
npx skills@latest add Ognihs/dev-skills
```

Select the skills you need, or copy individual skill directories into your agent's skills directory. `design-arch` carries the shared architecture document template; install it alongside `sync-arch` for the canonical format. `sync-arch` has a compact fallback when installed alone.

## Core Workflow

```text
Optional preparation: study-change and/or requirement intake
  -> new project needing system-level design: design-arch -> docs/architecture.md
  -> unresolved design: brainstorming -> to-spec
  -> resolved design: to-spec
  -> approved spec, then the Delivery Readiness Gate inside to-spec
  -> to-plan when delivery needs implementation coordination, producing one local delivery plan
  -> feature-dev, using the spec alone or with the plan and a selected delivery scope
  -> sync-arch, when docs/architecture.md needs creation or reconciliation with code
```

All planned feature work requires an approved spec before `feature-dev`. `design-arch` records project-wide architecture in one concise `docs/architecture.md`; detailed changes then use `brainstorming` and `to-spec`, or `to-spec` directly when the design is resolved. After approval, the Delivery Readiness Gate inside `to-spec` — the only proactive routing decision — judges from a fresh implementation agent's view whether the spec can be developed directly or needs a delivery plan. `sync-arch` creates that same architecture document from an existing codebase or reconciles it with implementation. An approved spec takes precedence over the architecture document within its scope; elsewhere only confirmed `Agreed` architecture decisions constrain detailed design and development. Change study, requirement intake, architecture design, and delivery planning are optional.

| Situation | Skill | Result |
| --- | --- | --- |
| Proposed change needs code-grounded study before requirements or design | `study-change` | A read-only current-behavior, impact, and requirement-readiness report |
| Large initiative with dependent unknowns | `discover-initiative` | A compact discovery map followed by requirement clarification |
| Product idea or existing draft that needs requirement clarification | `clarify-requirements` | A confirmed requirement document, with current-code evidence where needed |
| New project needing system-level structure before detailed design | `design-arch` | One concise project architecture document |
| Feature, component, behavior change, or non-trivial refactor with unresolved design decisions | `brainstorming` | A resolved design orchestrated into an approved, code-grounded spec |
| Resolved design that must be persisted | `to-spec` | A reviewed Draft that becomes authoritative after approval |
| Approved spec needing implementation coordination (stable repository states, multi-module coordination, consequential implementation paths) | `to-plan` | One complete local delivery plan: ordered delivery units with intent-level steps |
| Approved spec, optionally with its plan and a selected delivery scope | `feature-dev` | Tested, reviewed implementation with requirement evidence |

## Supporting Skills

| Situation | Skill |
| --- | --- |
| Hard bug or performance regression | `diagnose` |
| Stress-test a plan against repository evidence and capture decisions, conflicts, and open questions | `grill-me-with-doc` |
| Answer a bounded design question with a disposable logic or UI prototype; production integration is separate | `prototype` |
| Audit architectural friction and rank evidence-backed improvement candidates | `improve-codebase-architecture` |
| Create or reconcile the project's architecture document against implemented code | `sync-arch` |
| Create, update, or audit a current, evidence-backed repository map for humans and AI agents, with verified first-use and task-navigation paths | `maintain-readme` |
| Explicitly requested durable HTML report, architecture explainer, showcase, static information dashboard, or slide deck | `create-html-artifact` (manual invocation only; deliberate visual direction and normally frozen diagrams) |

## Working Principles

- Confirmed `Agreed` architecture decisions and approved specs guide intended structure and behavior. `Proposed` and `Reconstructed` architecture is context until its decisions are confirmed. Where an agreed architecture and approved spec conflict, the spec takes precedence within its scope. Current code is evidence of implementation; an unexplained code difference does not change an agreed architecture decision.
- Facts should be investigated from code, documentation, history, and available tools before asking the user. Product and material design decisions remain with the user.
- Planned feature work is test-driven by default at stable public seams and delivered in vertical slices. Review covers quality, correctness, and delivery compliance with one to three independent reviewers according to risk; unavailable delegation uses an explicitly reported self-review fallback.
- Delivery readiness is judged once, inside `to-spec` after approval, for implementation coordination needs. Plans use verified context and intent-level steps sized by verifiable outcomes and simultaneous reasoning; execution verifies each increment before advancing and retains overall constraints. Plans remain local artifacts excluded from commits and implementation diffs; local implementation design stays with the executor.
- Alternative verification must be explicit and evidence-backed when meaningful test-first automation is not possible.
- Preserve unrelated user changes and never claim completion without fresh verification evidence.

## Recommended Project Policy

When adopting the complete workflow, add equivalent rules to the project's agent instructions:

```markdown
### Documentation and Git

- Ask for approval before creating a Git branch. Do not commit, push, or overwrite existing user changes without explicit permission.
- Store requirement documents in `docs/requirements/`, implementation design specs in `docs/specs/`, and the single project architecture document in `docs/architecture.md`.
- Treat approved specs as authoritative for intended behavior and fixed decisions within their scope. Respect the agreed project architecture elsewhere; an approved spec takes precedence over a conflicting architecture statement. Code establishes implemented behavior, and code/architecture differences must be recorded rather than silently adopted as design decisions.
- Changing an agreed architectural decision requires an approved spec or renewed user agreement. Updating code evidence and implementation status in the same architecture document does not by itself change that decision.
- Any semantic modification to an approved implementation spec returns it to Draft and requires final review and renewed approval. Before implementation starts, update the original only when the user authorized editing that spec. Once implementation has started, preserve the original as a historical baseline unless the user explicitly requests modifying that spec; a request to change implemented behavior is not that permission. Otherwise capture the change in a new Draft spec that supersedes it.
- Commit `docs/specs/` and `docs/architecture.md` with the code. Ignore other content under `docs/` unless project instructions say otherwise.
- Do not make a design document reference or depend on files ignored by Git.
- When an approved spec and the architecture document conflict, follow the spec within its scope and reconcile the architecture document. For current implementation, verify claims against checked-out code and configuration rather than document dates.
- After completing changes, update `README.md` only if it already exists and verified project facts or navigation paths (such as commands, configuration, architecture boundaries, or primary entry points) have materially changed. Update only the directly affected statements, do not create a new `README.md` if one does not exist, and do not rewrite unrelated content.

### Architecture

- Unless an approved design states otherwise, organize application code by business capability. Add technical layers only when they separate real responsibilities; avoid ceremonial structure.
- Let each module own its business rules, data, tests, and narrow public contract. Keep internals private and do not directly access data owned by another module.
- Keep module dependencies acyclic and directed toward stable business policy. Keep business code independent of UI, transport, persistence, frameworks, and vendor SDKs.
- Express important business rules explicitly in named code, types, constraints, and tests. Validate external data and isolate side effects at system boundaries.
- Avoid ownerless `common`, `utils`, pass-through abstractions, and god modules. Share code only when current consumers have stable common semantics.
- Enforce important architectural boundaries with types, dependency checks, architecture tests, or CI, with actionable failure messages.

### Development

- Add appropriate docstrings and comments to generated code. Keep comments useful for long-term maintenance; do not include requirement IDs or similar delivery metadata.
- Unless the user states otherwise, assume the project serves at most a few hundred users. Avoid overengineering and accept non-critical information-security, concurrency, and edge-case risks when addressing them would add disproportionate complexity.
- Prefer the clearest, simplest solution that correctly satisfies the current requirement. Reuse existing code and language or framework capabilities before adding abstractions, dependencies, files, or configuration.
- Do not design for hypothetical future requirements or perform unrelated refactoring. Add complexity only when the current problem requires it.
```

See [AGENTS.md](AGENTS.md) for the repository's workflow-maintenance rules.

## License

[MIT](LICENSE)
