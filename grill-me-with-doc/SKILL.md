---
name: grill-me-with-doc
description: Interview the user about a plan or design against the existing code, tech decisions, and architecture until reaching shared understanding, resolving each branch of the decision tree. Use when user wants to stress-test a plan, get grilled on their design, or mentions "grill me".
---

Interview me relentlessly about every aspect of this plan/design/requirement until we reach a shared understanding, ideally 5-20 questions. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer by using question tool.

Ask the questions one at a time, waiting for feedback on each question before continuing.

If a question can be answered by exploring the codebase, explore the codebase instead.

## During the session

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account' — do you mean the Customer or the User? Those are different things."

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible — which is right?"

### Update design documentation

When a fuzzy is resolved, update design documentation. Don't batch these up — capture them as they happen.

### Offer design documentations sparingly

Only offer option to create an new design documentation when all three are true:

1. **Hard to reverse** — the cost of changing your mind later is meaningful
2. **Surprising without context in current session** — a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off** — there were alternatives and you picked one not in design documentation for specific reasons
