---
name: grill-me-with-doc
description: Stress-test a supplied plan, design, or requirement through focused questions grounded in the existing code and decisions. Use when the user asks to challenge their assumptions, get grilled on a design, or resolve its decision branches. Return confirmed decisions, evidence-backed conflicts, unresolved questions, and proposed document changes; do not implement the plan.
---

# Stress-Test a Plan or Design

Resolve decisions that could materially change the plan. Question depth follows uncertainty and consequence, not a target question count.

## Input and Boundaries

- Accept a plan, design, or requirement in conversation or a document, plus any available repository and constraints. If the subject cannot be identified, ask for it before interviewing.
- Read the supplied material, repository instructions, relevant decisions, and code before asking questions that inspection can answer. State evidence limits when a repository is unavailable.
- Treat current code as evidence of existing behavior, not the authority for intended behavior. Keep confirmed facts, user decisions, and agent recommendations distinct.
- Do not implement code, create a roadmap, or turn the interview into a full specification-writing task.

## Workflow

1. **Map the decisions.** Identify the goal, settled choices, assumptions, contradictions, and consequential unknowns. Keep a compact decision list; investigate dependencies before their downstream choices.
2. **Choose the next question.** Prefer a decision that unlocks others or could materially alter scope, compatibility, ownership, or failure behavior. Revisit a settled choice only when new evidence undermines it.
3. **Ask and wait.** Ask one focused question at a time, explaining the concrete scenario and relevant evidence. Give a recommended answer and trade-off when justified; do not invent a preference without enough context. Use a question interface when available and appropriate, otherwise ordinary text. Wait for the user's answer before treating the choice as settled.
4. **Stress-test the answer.** Check its important normal, boundary, and failure consequences against the supplied plan and inspected code. Update dependent questions instead of mechanically walking every possible branch.
5. **Capture immediately.** Record each confirmed decision and its reason under the document rules below. Update or remove stale assumptions so a fresh reader can understand the current result.
6. **Review and conclude.** Check that decisions agree, evidence supports claims, and material unknowns are either resolved or explicitly deferred with their consequences. Stop when this holds, or report a partial result if the user ends the interview or required input is unavailable.

## Questioning Techniques

- **Sharpen terms:** distinguish overloaded concepts using the project's vocabulary, such as Customer versus User; propose a precise term and confirm its meaning.
- **Use scenarios:** probe a concrete sequence, such as cancelling one item after another has shipped. Label hypothetical scenarios so they are not mistaken for existing behavior.
- **Surface contradictions:** cite the relevant path or symbol, explain the mismatch, and ask whether intent or the plan should change. Do not silently make the plan match the code.
- **Challenge proportionately:** prioritize consequential trade-offs and stop asking when further answers would not change the plan.

## Document Rules

- Keep the decision record in the conversation by default. Update an existing Draft incrementally only when document editing is authorized; otherwise return proposed edits with the relevant sections.
- Never silently edit an Approved document or change its status. For a document whose behavior has been implemented, permission to change the behavior is not permission to rewrite the document. Require explicit authorization to edit that document and follow the project's reapproval rules for semantic changes.
- Do not create a new document automatically. Suggest a separate decision record only for a consequential trade-off whose durable rationale would otherwise be lost; use an existing suitable document when authorized.
- Preserve unrelated user edits. If an authorized Draft is updated, reread it and fix contradictions introduced by the changes before reporting it ready for review. Interview agreement alone does not approve the whole document.

## Output and Completion

Return a concise, self-contained summary in the user's language:

- **Outcome:** resolved or partial, with the plan and examined scope identified.
- **Confirmed decisions:** the choices and their material rationale.
- **Code or document conflicts:** evidence and whether each was resolved.
- **Open questions:** blocking or deferred, with consequences and next action.
- **Document changes:** paths and sections actually updated, or proposed edits if no editing was authorized.

Complete only when the summary faithfully records the answers, no blocking question is hidden, and any authorized document changes have been reviewed. A partial interview must state what remains; do not claim design approval or begin implementation.
