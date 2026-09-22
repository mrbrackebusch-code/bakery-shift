# Maintaining Cake Factory

This is one independent MakeCode tutorial package. The student project is the root pxt.json plus comment-only main.ts and README.md. Both main.ts and the tutorial template contain only // Cake Factory followed by a newline: no executable learner code. README.md contains the hidden customts game resource, fourteen recoverable Blocks hints, and 17 demos. The complete game under review/solution is an informed review aid, outside the student project file list.

Canonical authoring inputs are preserved under maintainer/games/bakery, with only the narrowly required source texts under maintainer/docs. They can rebuild the tutorial and solution without another game's source or the complete curriculum corpus. Node.js supplies the dependency-free authoring tools.

From this package root:

    node maintainer/games/bakery/tools/build.mjs --model-only
    node maintainer/games/bakery/tools/build-publication.mjs --plan

The builder stages a new package under maintainer/games/bakery/generated/publication. It never updates this root in place, writes to GitHub or approves a release. Edit the named authoring inputs and rebuild; do not patch generated README.md. Keep main.ts and the template comment-only so the learner's Blocks workspace starts empty.

Carry the Microsoft MIT notice and source attributions forward. Preserve old Git commits, releases and content-addressed media revision directories when integrating a new package. This candidate remains unpromoted pending current runtime/instruction/GIF review, authenticated destination checks, exact versioned MakeCode release payload verification, and focused public startup/assets/affected-behavior review. Informed developer QA and the owner-cancelled learner audit are distinct; this package makes no human-learning claim.

The existing destination is https://github.com/mrbrackebusch-code/bakery-shift. Its intended explicit-path tutorial identity is https://arcade.makecode.com/?nocdn=1#tutorial:https://github.com/mrbrackebusch-code/bakery-shift/README. This generated V9 candidate is unpromoted until its exact payload, conflict state, public startup, assets and affected behavior are checked.
