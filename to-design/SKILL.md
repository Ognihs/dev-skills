---
name: to-design
description: Use this skill to write design documents (specs) for coding/development work. ALWAYS use it in the superpowers:brainstorming workflow.
---

Create a design documents (specs) following the design template below.

## Instructions

1. Write the document in **user's language** unless the user explicitly requests another language.
2. Write clearly and concisely using consistent terminology from the spec.
3. Do **NOT** include specific file paths or code snippets — they may become outdated quickly.
4. Try to fill in every section of the template with concrete, actionable content. Avoid vague statements; prefer quantified goals (e.g., "Reduce P95 latency from 300ms to 100ms" instead of "Improve performance").
5. If a section is not relevant to the current requirement, mark it with `N/A` in the section body.
6. After completing the document, review and refine it to ensure it meets the intended objective, remains concise, coherent, easy to understand, and formal in tone, and minimizes unnecessary jargon or obscure terms. Resolve contradictions, factual inaccuracies, and ambiguity. Focus primarily on what should be done, and include prohibitive language only when strictly necessary.

## Template

<design-template>

## Context & Goals

Clearly define the problem space. Include:

- Background of the current system or business
- Specific problems or pain points, quantified when possible
- Goals of this design (functional + non-functional)

Avoid vague goals like "improve performance." Instead, be specific: "Reduce P95 latency from 300ms to 100ms."

## Non-Goals

Explicitly state:
- What problems this design does NOT intend to solve
- Which requirements are deliberately excluded

## High-Level Design

Provide a bird's-eye view of the system.
- Architecture Diagram: Show relationships between components/microservices.
- Data Flow.
- Interaction Flow: Describe how data or requests flow through the system (Sequence Diagram or Flowchart recommended).

## Detailed Design

The core section of the document. It must be detailed enough for a coder to start implementation directly.
- API Design: Detailed interface definitions (REST, GraphQL, gRPC, etc.), including request parameters, response formats, and error codes.
- Data Model / Schema: Database table structures, index design, and caching strategies.
- Core Algorithms / Logic: Break down any complex business logic or algorithms in detail.
- Dependencies: What external services does this system depend on? Can they meet our QPS and latency requirements?

## Trade-offs & Alternatives

- List other approaches considered (at least 1–2)
- Explain why they were not chosen (complexity, cost, performance, etc.)
- Acknowledge the drawbacks and risks of the chosen approach

## Testing Strategy

Describe how to verify the design's correctness:
- Unit test scope
- Integration tests
- Performance tests
- Regression testing strategy

## Cross-cutting Concerns

Evaluate the system's robustness beyond functionality.
- Security: Are there data leakage risks? Is authorization thorough?
- Performance & Scalability: What is the expected throughput? How does the system scale if traffic increases 10x?
- Observability: How do we know the system is healthy after deployment? What core metrics and alerts need to be configured?

## Further Notes

Any further notes about the feature.

## Related Files

MUST: List relative paths of DIRECTLY relevant requirement documents (if available), design documents that directly impact or are referenced by the work, and the associated code files.

</design-template>
