# Cake Factory

### @explicitHints true

## Welcome to the cake factory!

Make a number in the mixing pot, then carry a copy to an order.

**Move:** arrow keys. Catch a modifier, face the round pot, and press **A** (Space or Z) to throw. Hold **A** to charge; the gold ring shows your aim. Release to throw. A quick tap also throws. **B** (Enter or X) discards what you carry. You can pause the simulator while you build.

First you will code the arithmetic that changes the mixer. Then you will connect the orders' true/false checks. The supplied ``||bakery(noclick):Cake Factory||`` drawer provides the events and displays; the calculations and comparisons will be yours.

## 1. Read the mixer

A ``||variables(noclick):variable||`` is a container used to store values in your code. Give the worker somewhere to remember the amount in the mixer.

### Find these blocks

In ``||variables(noclick):Variables||``, choose **Make a Variable** and name it ``||variables(noclick):batch||``.

![Native menu blocks for creating batch, selecting the mixer, reading its amount and showing a value](assets/instructions/01-menu.svg)

### Make your code look like this

![Read the mixer into batch, then show the value stored in batch](assets/instructions/01-assembled.svg)

### What you should see

With empty hands, stand below the pot and press **A**. Your display shows `2`. Reading the mixer does not change its amount. The bottom checks will be connected later.

![Selecting the mixer shows its current number in a bubble](assets/demos/01-clean-tray.gif)

## 2. Add one

Keep your first event. This new event adds one when a `+ 1` item hits the pot. The bowl icon in a modifier stands for the current mixer amount. The slow cupcake on the upper-left shelf uses this event too.

### Find these blocks

![Native event, variable, arithmetic and mixer-result blocks for adding one](assets/instructions/02-menu.svg)

### Make your code look like this

![Read batch, set batch to batch plus one, then put batch in the mixer](assets/instructions/02-assembled.svg)

### What you should see

Catch `+ 1`. Move beside the pot, face it, and press **A**. The modifier flies into the pot and `2` becomes `3` when it hits. Try another addition using the new starting amount.

![A thrown plus-one modifier hits the mixer and changes two to three](assets/demos/02-catch-one.gif)

## 3. Take one away

Sometimes a smaller number is more useful.

### Copy and change the event

Right-click the top block of your step 2 event and choose **Duplicate**. Keep the original event.

![Copy step 2's +1 event; change it to a -1 mixer event and subtraction](assets/instructions/03-adapt.svg)

### What you should see

Throw `- 1` into the pot: `2` becomes `1`. With empty hands, press **B** beside the pot to reset its amount, then try a different calculation.

![A thrown minus-one modifier changes the mixer from two to one](assets/demos/03-discard-one.gif)

## 4. Double the amount

A `× 2` modifier can do in one throw what repeated additions would take longer to do.

### Find these blocks

![Native multiplication and factory blocks for the double event](assets/instructions/04-menu.svg)

### Make your code look like this

![Read batch, multiply batch by two, save it and put the result in the mixer](assets/instructions/04-assembled.svg)

### What you should see

Throw `× 2` into the pot. The amount doubles: `2` becomes `4`. The number on the modifier stays two; the amount it multiplies can change.

![A times-two modifier doubles the mixer amount from two to four](assets/demos/04-double-batch.gif)

## 5. Divide the amount

Division makes a large amount smaller. A `/ 2` modifier divides it into two equal parts and keeps one part.

### Find these blocks

![Native division and factory blocks for dividing the mixer amount by two](assets/instructions/05-menu.svg)

### Make your code look like this

![Read batch, divide it by two, save it and put the result in the mixer](assets/instructions/05-assembled.svg)

### What you should see

Throw `/ 2` into a mixer holding `2`. The result is `1`. This factory uses whole-number results: a division that would make a fraction leaves the amount unchanged. Adjust the amount before trying that division again.

![Dividing two by two changes the mixer to one](assets/demos/05-pack-pairs.gif)

## 6. Read the modifier's number

The belts can now offer `+ 2` and `+ 3`. One event can use the number printed on either modifier.

### Find these blocks

In ``||variables(noclick):Variables||``, choose **Make a Variable** and name it ``||variables(noclick):modifierNumber||``.

![Native menu blocks for modifierNumber, its printed-number input and the addition event](assets/instructions/06-menu.svg)

### Make your code look like this

![Read batch and modifierNumber, add them, then put the saved batch in the mixer](assets/instructions/06-assembled.svg)

``||variables(noclick):batch||`` remembers the mixer amount; ``||variables(noclick):modifierNumber||`` remembers the modifier's printed number for this event.

### What you should see

Throw `+ 2` into a mixer holding `2`: the result is `4`. Try `+ 3` or another starting amount and compare the result.

![The plus-two modifier changes the mixer from two to four](assets/demos/06-delivery.gif)

## 7. Subtract the printed number

A `- 2` or `- 3` modifier subtracts its printed amount.

### Copy and change the event

Duplicate your step 6 printed-number event and keep the original.

![Copy step 6's printed-number event; change it to a -2 or -3 event and subtraction](assets/instructions/07-adapt.svg)

### What you should see

Throw `- 2` at an amount of `2`: the result is `0`. Subtracting three from two would give `-1`. Negative numbers are smaller than zero.

![Subtracting the printed two from two changes the mixer to zero](assets/demos/07-serve-order.gif)

## 8. Multiply by the printed number

A `× 3` modifier offers another way to change a small amount quickly.

### Copy and change the event

Duplicate your step 6 printed-number event and keep the original.

![Copy step 6's printed-number event; change it to a ×3 event and multiplication](assets/instructions/08-adapt.svg)

### What you should see

Throw `× 3` into a mixer holding `2`: the result is `6`. Compare that one throw with adding one four times.

![Multiplying two by the printed three produces six](assets/demos/08-bake-trays.gif)

## 9. Divide by the printed number

You now have all four arithmetic operations with two variable inputs.

### Copy and change the event

Duplicate your step 6 printed-number event and keep the original.

![Copy step 6's printed-number event; change it to a /3 event and division](assets/instructions/09-adapt.svg)

### What you should see

This step starts the mixer at `3`. Throw `/ 3` into it: the result is `1`. The next modifier will use that new amount. Remember that division needs a whole-number result here.

![Dividing three by the modifier's printed three leaves one](assets/demos/09-pack-boxes.gif)

## 10. Is the statement true?

Connect the orders' checks. A **Boolean** value is either ``||logic(noclick):true||`` or ``||logic(noclick):false||``. A comparison produces a Boolean value.

**Equal to (=)** checks whether two values represent the same quantity. `3 = 3` is true; `3 = 2` is false.

### Find these blocks

In ``||variables(noclick):Variables||``, use **Make a Variable** separately for ``||variables(noclick):orderTarget||``, ``||variables(noclick):deliveredNumber||``, and ``||variables(noclick):ready||``.

![Native comparison, Boolean and factory inputs and output, with variable creation](assets/instructions/10-menu.svg)

### Make your code look like this

![Read orderTarget and deliveredNumber; set ready to their equality comparison; show check ready](assets/instructions/10-assembled.svg)

### What you should see

With empty hands, touch the number dispenser to the pot's right to collect its current number, then throw that container down at `3 = □`. Walk to the order and press **B**: its left value, comparison, and right value highlight in order, then **FALSE** appears briefly and the original expression returns with a quiet cross. Add one in the mixer, collect its new number, and deliver `3`. Press **B** again to see **TRUE** and a blue Boolean block; delivery itself stays neutral. The target stays three throughout.

![Three equals two checks FALSE; making and delivering three checks TRUE after B](assets/demos/10-equal-check.gif)

## 11. Is the left side smaller?

**Less than (<)** checks whether the first value represents a smaller quantity than the second. Order matters: `4 < 5` is true, but `5 < 4` is false.

### Find these blocks

![Native less-than comparison and its factory check event](assets/instructions/11-menu.svg)

### Make your code look like this

![Read both inputs; set ready to orderTarget less than deliveredNumber; show check ready](assets/instructions/11-assembled.svg)

### What you should see

The rightmost order asks for `4 < □`. Deliver `4` and press **B**: **FALSE**, because the numbers are equal. Add one, deliver `5`, and check again: **TRUE**. The number on the right has changed.

![Four less than four checks FALSE; four less than five checks TRUE after B](assets/demos/11-less-check.gif)

## 12. Is the left side larger?

**Greater than (>)** checks whether the first value represents a larger quantity than the second.

### Copy and change the event

Duplicate your step 11 less-than event and keep the original.

![Copy step 11's less-than event; change it to greater-than and the greater-than comparison](assets/instructions/12-adapt.svg)

### What you should see

The middle order asks for `2 > □`. Deliver `2`, then press **B** for **FALSE**. Subtract one in the mixer, deliver `1`, and press **B** again for **TRUE**. Matching numbers make `=` true, but make both `<` and `>` false.

![Two greater than two checks FALSE; two greater than one checks TRUE after B](assets/demos/12-greater-check.gif)

## 13. Include the matching number

**Less than or equal to (≤)** accepts equality too. Both `5 ≤ 5` and `5 ≤ 6` are true.

### Copy and change the event

Duplicate your step 11 less-than event and keep the original.

![Copy step 11's less-than event; change it to less-than-or-equal and the inclusive comparison](assets/instructions/13-adapt.svg)

### What you should see

The rightmost order now asks for `5 ≤ □`. Make and deliver `5`, then press **B** for **TRUE**. A larger delivered number also works; `4` does not. The sign itself tells you which numbers qualify.

![Five less than or equal to five checks TRUE after B](assets/demos/13-less-equal-check.gif)

## 14. Include equality the other way

**Greater than or equal to (≥)** also accepts matching numbers. Both `1 ≥ 1` and `1 ≥ 0` are true.

### Copy and change the event

Duplicate your step 11 less-than event and keep the original.

![Copy step 11's less-than event; change it to greater-than-or-equal and the inclusive comparison](assets/instructions/14-adapt.svg)

### What you should see

The middle order asks for `1 ≥ □`. Deliver `1` and press **B** for **TRUE**. Zero or a negative number also works here. A larger delivered number, such as `2`, makes this statement **FALSE** after the check.

![One greater than or equal to one checks TRUE after B](assets/demos/14-greater-equal-check.gif)

## 15. Run the factory

Finish `3 = □`, `1 ≥ □`, and `5 ≤ □`; pressing **B** checks each delivery while the mixer keeps its amount for the next calculation.

### What you should see

One route makes `1`, then `3`, then `6`. Press **B** after each delivery; solved checks stay **TRUE**, while false checks return to the original expression for retry.

![Three calculated numbers are delivered and checked at the three different orders](assets/demos/15-factory-round.gif)

After the first three checks finish, press **A** once to unlock four side ingredient stations. The next round keeps your mixer amount and brings new checks.

## 16. Use an ingredient variable

Throw a copied number at an ingredient station to change its value, then solve an order that uses that station's icon.

The order can show `3 + [icon]`, meaning three plus the station value. The operator switches every 12 seconds, and the supplied station variables stay separate from learner ``||variables(noclick):batch||``.

### What you should see

The matching icon shows the station value to use. Make a number for the changed statement, deliver it, and press **B** to check it.

![A variable change at a side station is reflected in the order's left value](assets/demos/16-boundary-checks.gif)

## 17. Keep the amount, change the plan

Deliver `3` to the equality order, then use the `3` still in the mixer to make a number for another order.

### What you should see

A numbered container carries a copy. Your next modifier changes the mixer, while a completed order keeps its delivered number. Try another route through the same three checks, using a different combination of arithmetic operations.

![The mixer keeps three after delivery, then doubling makes six for a different order](assets/demos/17-reuse-number.gif)
