# Cake Factory V9 — Comparison Style Record

This is a design and provenance record, not rendered verification, learner evidence, or a claim that the refreshed GIFs pass.

## Native provenance

The retained native comparison is `games/bakery/generated/evidence/mixer-v7-native-captures-04/11-hint.svg`, rendered from the actual MakeCode Blocks surface. Its `logic_compare` block uses fill `#45aaf2`, darker stroke `#3480b6`, and the pointed outer path:

```text
m 24,0 h 377.515625 l 24,24 l -24,24 V 48 h -377.515625 l -24,-24 l 24,-24 z
```

The native operator dropdown is transparent with a `#3480b6` border, rounded `rx=4 ry=4`, height `13`, and width `44.796875`. The numeric reporter/shadow reference is in `games/bakery/generated/evidence/mixer-v7-native-captures-04/04-hint.svg`: white `#fff` fill, `#bfbfbf` stroke, and a 16-pixel capsule geometry. The same capture shows the purple `math_arithmetic` block (`#a55eea` fill, `#7c47b0` stroke) and red variable getter (`#ec3b59` fill, `#b12c43` stroke).

## Owner correction and V9 adaptation

V9 keeps the native visual language while adapting it to the 640×480 Cake Factory world: a 200×44 native-like pointed blue Boolean card, white capsule numeric inputs, and a transparent blue dropdown with the darker border. Purple marks the left math expression; red marks the ingredient variable getter. Legacy decorative colors are remapped to the V9 palette: index 3 blue and index 9 dark blue; index 11 uses native Math border purple and index 12 uses numeric-shadow gray. A quiet TRUE/FALSE status appears below the card, and pressing **B** highlights the left operand, comparison, and right operand in sequence.

Incoming copied numbers arc into the right-hand input socket at centers `(170,440)`, `(382,440)`, and `(594,440)`. Whole-card assisted aiming remains available so the interaction stays easy while the sockets retain the native comparison reading order.

## Verification boundary

The affected round and variable/check sequence require verification of the comparison card, incoming arcs, **B** highlight order, quiet status, and four ingredient-variable states. The refreshed GIFs are planned outputs of that verification. No pass, learner result, or public acceptance is inferred from this record.
