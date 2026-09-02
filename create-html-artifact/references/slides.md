# Browser-Based Slide Decks

Use this mode when someone will narrate the material one screen at a time. Dense material intended for independent study belongs in report mode.

## Narrative and Slide Shape

- Build a sequence of clear beats: context, tension or question, core idea, evidence, consequence, and close. Adapt the sequence to the subject rather than forcing every slot.
- Put one idea on each slide. Split a slide when the speaker would need to explain two unrelated points.
- Keep body text readable from the back of a room. Prefer a diagram, chart, quote, comparison, or concise statement over paragraphs and long bullet lists.
- Keep the token system consistent while varying composition across slides. Repeating the same card layout makes the deck feel generated and weakens emphasis.
- Use one deliberate visual climax or signature moment; avoid decorative transitions between every slide.

## Runtime Contract

- Render one active slide in a full-viewport 16:9 stage with letterboxing where needed; do not use a long scrolling page as the primary presentation view.
- Support `ArrowLeft`, `ArrowRight`, and optionally `Space`, while ignoring navigation keys when an input or editable element owns focus.
- Show a small current/total slide counter and provide visible previous/next controls for pointer users.
- Provide a clear fullscreen control or hint when the browser supports it.
- Keep slide content in the HTML source so a script failure does not erase the deck.
- Add print styles that place one slide on each page when practical.
- Presenter notes and a thumbnail overview are optional; add them only when the user needs rehearsal or non-linear navigation.

## Visual Rules

- Preserve large type, generous margins, strong contrast, and simple reading order.
- Derive the deck's visual language from the audience, narrative register, and desired tone rather than applying a generic keynote theme or literal subject styling.
- Left-align body text unless a short title or quote genuinely benefits from centering.
- Use images only when they are supplied, licensed, generated for the task, or safely embedded with known provenance.
- Use inline SVG for architecture, charts, timelines, and technical figures. Label data directly where possible.
- Do not use tiny dashboard panels, repeated pills, decorative side stripes, or title-underlining accent bars as default styling.
- Keep animations short, interruptible, and disabled under `prefers-reduced-motion`.
- Vary composition across narrative beats, not arbitrarily. Reserve the strongest scale shift, image treatment, or spatial break for the deck's intended climax.
- Keep quiet slides genuinely quiet; do not add secondary panels merely to fill the frame.

## Validation

Test rapid forward and backward navigation, first/last boundaries, pointer controls, fullscreen behavior when used, print layout when promised, and at least one representative 16:9 viewport. Check every slide for clipped text and inconsistent margins; a valid HTML file does not prove a usable deck.

## Common Failures

- Treating each slide as rendered Markdown inside a card.
- Shrinking text to preserve an overloaded slide instead of splitting it.
- Depending on animation to reveal required content.
- Forgetting the slide counter or keyboard navigation.
- Building a beautiful title slide followed by visually unfinished content slides.
