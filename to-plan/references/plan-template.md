# Delivery Plan Template

Repeat Units and Steps as needed and write the generated plan in the user's language. Preserve essential delivery information; omit optional fields with no useful content. Coverage rules, planning granularity, and review requirements are defined in `SKILL.md`.

```markdown
# <Topic> Delivery Plan

- Source spec: `<path>` (`<approved content identifier, when practical>`)
- Planned against: `<repository baseline revision>`
- Relevant local changes: <uncommitted changes affecting planning; omit when absent>

## Delivery Overview

<Briefly explain relationships between units only when the delivery structure or ordering is not obvious. Do not repeat the spec's background, architecture, or design trade-offs.>

## Requirement Coverage

- S1 — Unit 1 — full
- S2 — Unit 1: <portion A>; Unit 2: <portion B> — full
- S3 — already satisfied: <satisfied scope and supporting code and verification evidence>

## Unit 1: <Stable outcome>

Delivery boundary:
<The concrete capability or stable state established by this unit. When needed, identify behavior not yet provided and reserved for later units.>

Covers:
- S1 — full
- S2 — partial: <portion delivered by this unit>; remaining: <remaining portion and target unit>

Prerequisites / contracts:
- <verified existing capability and the specific contract this unit relies on>
- Unit <N> — <state or contract that must be established first>
- <required execution or verification environment conditions; omit when unnecessary>

Fixed module-level decisions:
- <responsibility allocation, reuse location, or cross-module coordination decision>
- <implementation contract later units must rely on; specify an interface when necessary>

Anchors:
- Concrete: `<verified existing file, module, public interface, or test seam>`
- Logical: <contract or state an earlier unit will establish>
- New: <new artifact's responsibility; specify a path or name only when it is a useful execution constraint>

### Step 1.1: <Verifiable implementation increment>

- Covers: <requirement IDs and the specific portion covered by this step>
- Depends on: <genuine prerequisite step and what it must supply; omit when absent>
- Anchors: <reference unit anchors; add step-specific anchors when necessary>
- Intent: <what this step establishes and where it connects; add one sentence of execution rationale when needed>
- Test-first: <behavior to verify first and its test seam; for alternative verification, state the method and reason>
- Verify: <concrete command or executable manual check>
- Done when: <observable result proving this step is complete>

### Step 1.2: <Verifiable implementation increment>

- Covers: <requirement IDs and specific scope>
- Depends on: <prerequisite step and required output>
- Anchors: <relevant anchors>
- Intent: <implementation intent>
- Test-first: <behavior and test seam, or justified alternative verification>
- Verify: <command or check>
- Done when: <completion evidence>

Unit acceptance:
- <observable condition that must hold within this unit's delivery boundary>

Unit verification:
- <command or check> — <result proving the acceptance condition holds>
- <required cross-module, migration, compatibility, or regression check>
- <in the final unit, add any overall delivery checks not yet covered>

Next unit entry:
- <additional state, contract, or evidence required before a later unit starts; omit when unnecessary>
```
