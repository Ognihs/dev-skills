# Project Architecture Document

Use this format for both new-project design and code-grounded documentation. Keep one document, normally `docs/architecture.md`. Preserve the heading order; use `N/A` briefly when a section does not apply. A typical document should fit roughly 60–120 lines, but useful accuracy takes precedence. Add a diagram only when it clarifies a boundary or flow.

```markdown
# Project Architecture: <name>

- Architecture state: Proposed | Agreed | Reconstructed
- Scope: <system and exclusions>
- Code checked: Not implemented | <revision or working-tree state>

## System Boundary

<Users, external systems, and major inputs and outputs.>

## Building Blocks

| Part | Responsibility and owned data | Dependencies | Implementation |
| --- | --- | --- | --- |

## Key Flows

<One or two flows, labeled planned or implemented.>

## Boundaries and Rules

<Data ownership, dependency direction, and important system constraints.>

## Decisions and Trade-offs

<Chosen structure, drivers, credible alternatives, and accepted costs.>

## Implementation and Gaps

<Implementation evidence or "not started"; known deviations, uncertainties, and deferred detail.>
```

`Proposed` means the design awaits confirmation. `Agreed` means the architecture decisions were confirmed and may constrain later work outside a scoped approved spec; code evidence may still show planned or partial implementation. `Reconstructed` means the document was inferred from existing code without a prior confirmed architecture. Neither `Proposed` nor `Reconstructed` independently makes its statements binding; an approved spec remains authoritative within its scope. Use exact existing paths in the implementation column and `Planned` for unimplemented parts. Do not invent decision rationale when reconstructing.
