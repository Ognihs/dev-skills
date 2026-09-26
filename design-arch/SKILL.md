---
name: design-arch
description: Design a new software project's system-level architecture and record it in one concise architecture document for later detailed design. Use when project-wide boundaries, ownership, dependencies, or deployment choices remain. Do not write a feature spec, document only existing code, or implement the system.
---

# Design Project Architecture

Design the project's overall structure and write its architecture document. Default to `docs/architecture.md`, reusing an existing architecture document if the project has one. The result is an architecture artifact, not an implementation spec; later development still requires its own approved spec.

## Input and Workflow

Accept a new-project goal, requirements, or brief plus known constraints. Read supplied material and repository guidance. Do not require a PRD when the intent is already clear.

1. Identify the few functional needs, quality scenarios, and constraints that affect system structure. Verify available facts before asking; ask focused questions for unknowns that change a major boundary or decision. Do not invent load, availability, or compliance targets.
2. Compare credible structures where a choice matters, including the simpler viable option. Choose boundaries, data ownership, dependencies, and runtime shape for current needs; avoid speculative services, interfaces, files, and infrastructure.
3. Trace one or two important flows through the chosen structure. Check relevant failure and operational behavior against the actual drivers. State meaningful trade-offs and leave feature-level details for later design.
4. Present the design in coherent sections and resolve material corrections. Read the [project architecture template](references/architecture-template.md), then write one concise document with `Architecture state: Proposed`. Review that each major part has a purpose, dependencies are intelligible, and decisions follow from a stated driver.
5. Ask the user to confirm the exact reviewed architecture document. Mark its architecture state `Agreed` only after confirmation. A later change to an agreed architectural decision needs an approved spec that takes precedence or renewed user agreement; updating code evidence alone does not grant that authority.

For a new project, mark unimplemented building blocks `Planned`; do not invent code paths. Record only architecture-level decisions. An approved detailed spec takes precedence over this document where they conflict; elsewhere the agreed architecture guides subsequent design. When a later spec changes the architecture, reconcile this same document and show any work still pending in its implementation column.

## Completion

Return the document path, confirmed decisions, remaining non-blocking assumptions, and the detailed-design handoff. Do not create a second architecture document, a feature spec, or implementation code. Never describe planned structure as implemented.
