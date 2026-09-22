# Bakery Factory Revision — Source Packet (2026-09-21)

This packet records source retrieval and design grounding only. It is not copy approval, runtime evidence, learner evidence, or test evidence. The owner’s explicit scope expansion is recorded in [`games/bakery/design/FACTORY_REVISION_2026-09-21.md`](../FACTORY_REVISION_2026-09-21.md) and supersedes the earlier Bakery no-comparison boundary in `SOURCE_LINEAGE_BRIEF.md`.

The first two sources below are selected for simple Boolean and comparator terminology. The conditional examples are contextual references only; they do not authorize learner `if`, `AND`, or `OR` instruction.

## Selected terminology sources

1. **`MCA-CSINTRO2-LOGIC-INTRO` (`1A-041`)** — [official URL](https://arcade.makecode.com/courses/csintro2/logic/intro)  
   Local source: `docs/pedagogy/corpus/sources/makecode-arcade-csintro/raw/production/1A-041/repository/docs/courses/csintro2/logic/intro.md`  
   Lines 41–47 name the native comparison blocks `||logic:>||` (Greater than), `||logic:<||` (Less than), and `||logic:=||` (Equal to), defining larger, smaller, and same quantity. Lines 14–18 provide the numeric true-example context (`8` greater than `5`).

2. **`MC-CSP-U3-D11` (`1C-039`)** — [official URL](https://microsoft.github.io/makecode-csp/unit-3/day-11/boolean-variables/)  
   Local source: `docs/pedagogy/corpus/sources/makecode-ap-csp/raw/production/1C-039/boolean-variables.md`  
   Line 42 defines a Boolean as either `true` or `false`. Lines 63–71 introduce Boolean variables before separately introducing relational operators; lines 89–105 distinguish comparison statements and a single relational-operator coding task. The broader source contains Boolean composition, so this packet uses only the simple true/false and relational terminology.

## Contextual conditional references

3. **`MCA-CSINTRO2-REVIEW-BLOCKBUSTER` (`1A-054`)** — [official URL](https://arcade.makecode.com/courses/csintro2/review/blockbuster)  
   Local source: `docs/pedagogy/corpus/sources/makecode-arcade-csintro/raw/production/1A-054/repository/docs/courses/csintro2/review/blockbuster.md`  
   Lines 11–14 model `time < 3` inside an `if then ... else`; lines 20–23 add ordered `< 6` and `< 9` thresholds. This is conditional/timeline context only and does not authorize learner `if` or `else if` instruction.

4. **`MC-CSP-U3-D02` (`1C-030`)** — [official URL](https://microsoft.github.io/makecode-csp/unit-3/day-2/coding-algorithms/)  
   Local source: `docs/pedagogy/corpus/sources/makecode-ap-csp/raw/production/1C-030/coding-algorithms.md`  
   Lines 94–100 offer an optional extension: display one sprite when a number is greater than a threshold and another when it is less. It is a transfer prompt without a canonical complete block solution; it does not authorize learner conditionals.

## Existing Bakery arithmetic anchor

**`MCA-CSINTRO1-INTRO-VARMATH` (`1A-005`)** — [official URL](https://arcade.makecode.com/courses/csintro1/intro/variable-math)  
Local source: `docs/pedagogy/corpus/sources/makecode-arcade-csintro/raw/production/1A-005/variable-math.md`, also recorded in `games/bakery/design/pedagogy/SOURCE_LINEAGE_BRIEF.md` lines 35–54. The retained progression is variable bridge → modeled calculation and immediate output → changed-number trials → named operands/model → less-provided construction → reuse, repair, and explanation.

## Rights and reuse obligations

- `makecode-arcade-csintro` is MIT. Preserve source provenance and the MIT copyright/permission notice when adapting or redistributing source text, code, examples, structure, or covered repository assets.
- `makecode-ap-csp` is CC BY 4.0 for Microsoft documentation/content and MIT for code. Preserve attribution for adapted lesson text and the MIT notice/conditions for code.
- The Bakery source evidence records `SOURCE_PROVENANCE` and `MIT_NOTICE` for the `1A-005` anchor. This packet carries those obligations forward; it does not broaden rights for separately linked or third-party media.
