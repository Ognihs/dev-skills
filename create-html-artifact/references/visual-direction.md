# Visual Direction

Use this before writing HTML or CSS. Good taste here means strong proportion, typography, rhythm, restraint, and coherence. The result should suit its audience and reading task without turning the subject into a literal theme.

## Derive the Direction

Privately write a compact visual direction contract:

- **Aesthetic intent:** one sentence describing the desired impression in visual terms such as calm, exact, warm, editorial, formal, or expressive.
- **Register:** editorial, technical, executive, instructional, exhibition, or another precise reading context.
- **Style distance:** decide whether the design should be visually independent of the subject, subtly adjacent to it, or explicitly referential. Prefer independence or subtle adjacency unless the brief asks for a themed treatment.
- **Specificity source:** name the reader's real viewing situation and one non-literal formal source from their cultural, editorial, or working world. Borrow its discipline in grid, rhythm, scale, or material behavior rather than its surface motifs.
- **Content structure:** identify the hierarchy, comparisons, sequence, or evidence relationships that the composition must clarify. Use these structural cues without converting domain nouns into decorative motifs.
- **Expression, density, and motion:** restrained, balanced, or expressive; airy, balanced, or compact; static, restrained, or expressive. Match each axis to the mode and audience instead of letting one adjective set the whole direction.
- **Composition:** dominant reading axis, page silhouette, primary visual region, and the planned alternation of dense and quiet sections.
- **First-view memory:** the conclusion, relationship, or mechanism the reader should retain after leaving the opening, plus the visible element that makes it memorable. Mood alone is not an answer.
- **Typography:** exact portable font stacks for display, body, and utility roles; their scale, weight, width, line height, measure, and line-breaking behavior. One family may serve multiple roles.
- **Palette:** a small set of named semantic roles and actual CSS values for canvas, text, muted information, boundaries, emphasis, and states. Choose atmosphere and contrast deliberately rather than from the content category.
- **Signature:** one memorable typographic, spatial, editorial, or graphic treatment that can be executed completely. It need not illustrate the subject.
- **Restraint:** name the tempting defaults or effects this direction deliberately excludes.

Use supplied brand rules and visual references as authority. When the direction remains materially underdetermined and browsing is available, inspect two or three high-quality references that match the desired medium, audience, or register. Extract composition, type hierarchy, density, color roles, and one useful detail; do not copy their assets or combine unrelated styles into a mood-board collage.

## Pass the Taste Gate

- **Genre-cliché test:** never infer a palette or atmosphere from the content category alone. Software, architecture, AI, data, finance, or professionalism do not imply navy, blue-black, cyan accents, glowing grids, or dark mode. Use those treatments only when the user, brand, viewing context, or a concrete reference supports them.
- **Direction-choice test:** when material visual axes remain open, privately compare at least two feasible directions that differ in at least two of composition, type character, color temperature and lightness, density, or signature. Choose by audience fit and content clarity, then feasibility, and note why the other direction lost. A palette swap alone is not a second direction.
- **Specificity test:** if replacing the content with an unrelated artifact in the same mode leaves the composition and visual language equally convincing, the direction is too generic. Revise at least one of the composition, type treatment, or signature from the actual content structure or reading context without turning the subject into a literal theme.
- **Elegance test:** the composition should feel finished through proportion, alignment, typography, whitespace, and controlled contrast before shadows, gradients, textures, or motion are added.
- **Single-risk test:** when the mode and audience allow expression, take one justified aesthetic risk in composition, typography, scale, or visual metaphor and keep the surrounding system disciplined. In a conservative register, exceptional precision or a restrained signature may replace novelty.
- **Coherence test:** every conspicuous color, shape, number, divider, texture, or motion must support the visual system, content hierarchy, or interaction. Remove devices that exist only to signal a genre.
- **Feasibility test:** match ambition to the available time, content, and primitives. A restrained direction executed precisely is better than an elaborate direction finished unevenly.

Do not expose this internal contract unless the user asks for design rationale or a material choice needs approval.

## Compose the Page

- Establish primary, secondary, and quiet regions. Do not give every section equal visual weight.
- Vary section composition when the content role changes while preserving a shared alignment and spacing system.
- Do not wrap every content group in a rounded card. Use typography, whitespace, rules, tables, figures, or background shifts when they better express the structure.
- Keep surface hierarchy shallow. Border, radius, shadow, tint, and elevation require a semantic reason rather than appearing together by default.
- Follow dense evidence with breathing room. Let a major conclusion, diagram, or number own enough space to be understood.
- Treat the opening as the artifact's thesis, not a generic hero. The first screen should orient the reader and establish the visual register without theatrical decoration.
- Carry the same level of finish through the middle, ending, narrow viewport, and print view where relevant.

## Use Local Typography Deliberately

- Build a small fluid type scale with `clamp()` where it improves responsiveness; avoid a large collection of near-duplicate sizes.
- Control line length by content role. Narrative prose, labels, tables, and data annotations should not share one arbitrary width.
- Use monospace for code, identifiers, timestamps, or aligned data, not as a blanket shorthand for technical character.
- Create display character through scale, weight, width, case, spacing, and deliberate wrapping. Do not rely on gradient text or decorative punctuation.
- For Chinese content, inspect line breaking, punctuation placement, Latin and numeral alignment, and excessive tracking at the rendered size.

## Rendered Critique

Review a full-page screenshot as well as detailed viewports:

1. **Thumbnail:** hierarchy and page silhouette remain visible when the page is reduced.
2. **Rhythm:** repeated blocks, accidental monotony, cramped stretches, and empty dead zones are visible across the whole page.
3. **Decoration-off:** hierarchy still works when shadows, gradients, textures, and motion are mentally removed.
4. **Taste:** the palette avoids category defaults, and the signature strengthens the composition without illustrating the subject literally.
5. **Memory:** the opening leaves the intended conclusion, relationship, or mechanism rather than only an atmosphere.
6. **Specificity:** the artifact would not remain equally convincing after an unrelated subject replaced its content.
7. **Completion:** opening, middle, ending, and narrow layout feel designed to the same standard.

Revise the direction or composition when these checks fail; polishing isolated CSS details will not repair a generic concept. When the result feels bland, strengthen one existing axis and quiet its surroundings. When it feels overbearing, reduce one or two of saturation, contrast, weight, scale, effects, or motion while preserving one recognizable anchor.
