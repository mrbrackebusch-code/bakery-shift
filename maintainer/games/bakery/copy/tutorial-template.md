# Cake Factory

### @explicitHints true

## Welcome to the cake factory!

Make a number in the mixing pot. Carry a copy to an order and make its statement true!

Three conveyors bring modifiers. Each red **set** block holds a purple calculation. The bowl icon stands for the amount in the mixer: `+ 1` means **set the amount to its current value plus one**. Catch a modifier, aim at the round pot, and throw. Each hit runs your calculation once.

**Move:** arrow keys. **A:** Space or Z throws in the direction you last moved; the gold line shows your aim. **B:** Enter or X discards what you carry. With empty hands, walk onto the **NUMBER** stand to the pot's right to collect its current number. Aim down and throw that container at a bottom order. Collecting a number leaves the mixer amount available for your next calculation.

For example, `3 < □` asks for a number larger than three. The printed target stays on the **left**; your delivered number fills the **right**. A **YES** activates that order. A **NO** lets you adjust the mixer and try another number. Activate all three orders to finish a round.

Missed modifiers fall off the conveyors and new ones arrive. A loose cupcake also adds one, but arrives slowly. Empty-handed **B** beside the pot resets its amount; beside an unfinished order it clears that delivery. You can pause the simulator while you build.

First you will code the arithmetic that changes the mixer. Then you will connect the orders' true/false checks. The supplied ``||bakery(noclick):Cake Factory||`` drawer provides the events and displays; the calculations and comparisons will be yours.

## 1. Read the mixer

A ``||variables(noclick):variable||`` is a container used to store values in your code. Give the worker somewhere to remember the amount in the mixer.

### Find these blocks

In ``||variables(noclick):Variables||``, choose **Make a Variable** and name it ``||variables(noclick):batch||``. Find the event, mixer amount, and display in ``||bakery(noclick):Cake Factory||``. Change the event dropdown to **the mixer is selected**.

![Native menu blocks for creating batch, selecting the mixer, reading its amount and showing a value](assets/instructions/01-menu.svg)

### Make your code look like this

![Read the mixer into batch, then show the value stored in batch](assets/instructions/01-assembled.svg)

The small ``||variables(noclick):batch||`` block reads the value you saved. It goes in the display's value slot. In the game, the bowl icon represents this amount without spelling out the variable name on every modifier.

### What you should see

With empty hands, stand below the pot and press **A**. Your display shows `2`. Reading the mixer does not change its amount. The bottom checks will be connected later.

![Selecting the mixer shows its current number in a bubble](assets/demos/01-clean-tray.gif)

## 2. Add one

A `+ 1` modifier should increase the amount by one. A loose cupcake uses this same event.

### Find these blocks

Add a new ``||bakery(noclick):when||`` event and choose **a + 1 item hits the mixer**. Find ``||math(noclick):0 + 0||`` in ``||math(noclick):Math||``.

![Native event, variable, arithmetic and mixer-result blocks for adding one](assets/instructions/02-menu.svg)

### Make your code look like this

![Read batch, set batch to batch plus one, then put batch in the mixer](assets/instructions/02-assembled.svg)

Read the mixer first. Calculate ``||variables(noclick):batch||`` plus `1`, save the result back in ``||variables(noclick):batch||``, and send that value to the mixer. The ``||math(noclick):Math||`` block produces a number.

### What you should see

Catch `+ 1`. Move beside the pot, face it, and press **A**. The modifier flies into the pot and `2` becomes `3` when it hits. Try another addition using the new starting amount.

![A thrown plus-one modifier hits the mixer and changes two to three](assets/demos/02-catch-one.gif)

## 3. Take one away

Sometimes a smaller number is more useful.

### Build the next event

Create **a - 1 modifier hits the mixer**. Use the same read, calculate, and put sequence. Choose subtraction from the ``||math(noclick):Math||`` block's operator dropdown and subtract `1` from ``||variables(noclick):batch||``.

### What you should see

Throw `- 1` into the pot: `2` becomes `1`. With empty hands, press **B** beside the pot to reset its amount, then try a different calculation.

![A thrown minus-one modifier changes the mixer from two to one](assets/demos/03-discard-one.gif)

## 4. Double the amount

A `× 2` modifier can do in one throw what repeated additions would take longer to do.

### Find these blocks

Add **a × 2 modifier hits the mixer**. Choose multiplication from the ``||math(noclick):Math||`` block's dropdown. Use the mixer read and result blocks you already know.

![Native multiplication and factory blocks for the double event](assets/instructions/04-menu.svg)

### Make your code look like this

![Read batch, multiply batch by two, save it and put the result in the mixer](assets/instructions/04-assembled.svg)

### What you should see

Throw `× 2` into the pot. The amount doubles: `2` becomes `4`. The number on the modifier stays two; the amount it multiplies can change.

![A times-two modifier doubles the mixer amount from two to four](assets/demos/04-double-batch.gif)

## 5. Divide the amount

Division makes a large amount smaller. A `/ 2` modifier divides it into two equal parts and keeps one part.

### Find these blocks

Add **a / 2 modifier hits the mixer**. Choose division from the ``||math(noclick):Math||`` block's dropdown.

![Native division and factory blocks for dividing the mixer amount by two](assets/instructions/05-menu.svg)

### Make your code look like this

![Read batch, divide it by two, save it and put the result in the mixer](assets/instructions/05-assembled.svg)

### What you should see

Throw `/ 2` into a mixer holding `2`. The result is `1`. This factory uses whole-number results: a division that would make a fraction leaves the amount unchanged. Adjust the amount before trying that division again.

![Dividing two by two changes the mixer to one](assets/demos/05-pack-pairs.gif)

## 6. Read the modifier's number

The belts can now offer `+ 2` and `+ 3`. One event can use the number printed on either modifier.

### Find these blocks

In ``||variables(noclick):Variables||``, choose **Make a Variable** and name it ``||variables(noclick):modifierNumber||``. Add **a + 2 or + 3 modifier hits the mixer** and find **number on the modifier** in ``||bakery(noclick):Cake Factory||``.

![Native menu blocks for modifierNumber, its printed-number input and the addition event](assets/instructions/06-menu.svg)

### Make your code look like this

![Read batch and modifierNumber, add them, then put the saved batch in the mixer](assets/instructions/06-assembled.svg)

The variables have different jobs: ``||variables(noclick):batch||`` remembers the mixer amount; ``||variables(noclick):modifierNumber||`` remembers the modifier's printed number.

### What you should see

Throw `+ 2` into a mixer holding `2`: the result is `4`. Try `+ 3` or another starting amount and compare the result.

![The plus-two modifier changes the mixer from two to four](assets/demos/06-delivery.gif)

## 7. Subtract the printed number

A `- 2` or `- 3` modifier subtracts its printed amount.

### Build the next event

Add **a - 2 or - 3 modifier hits the mixer**. Read the mixer into ``||variables(noclick):batch||`` and the printed number into ``||variables(noclick):modifierNumber||``. Subtract the modifier's number from the batch, save the result in ``||variables(noclick):batch||``, and put it in the mixer.

### What you should see

Throw `- 2` at an amount of `2`: the result is `0`. Subtracting three from two would give `-1`. Negative numbers are smaller than zero.

![Subtracting the printed two from two changes the mixer to zero](assets/demos/07-serve-order.gif)

## 8. Multiply by the printed number

A `× 3` modifier offers another way to change a small amount quickly.

### Build the next event

Add **a × 3 modifier hits the mixer**. Read both inputs into your variables. Multiply ``||variables(noclick):batch||`` by ``||variables(noclick):modifierNumber||``, save the result, and put it in the mixer.

### What you should see

Throw `× 3` into a mixer holding `2`: the result is `6`. Compare that one throw with adding one four times.

![Multiplying two by the printed three produces six](assets/demos/08-bake-trays.gif)

## 9. Divide by the printed number

You now have all four arithmetic operations with two variable inputs.

### Build the next event

Add **a / 3 modifier hits the mixer**. Read both inputs, divide ``||variables(noclick):batch||`` by ``||variables(noclick):modifierNumber||``, save the result, and put it in the mixer.

### What you should see

This step starts the mixer at `3`. Throw `/ 3` into it: the result is `1`. The next modifier will use that new amount. Remember that division needs a whole-number result here.

![Dividing three by the modifier's printed three leaves one](assets/demos/09-pack-boxes.gif)

## 10. Is the statement true?

Connect the orders' checks. A **Boolean** value is either ``||logic(noclick):true||`` or ``||logic(noclick):false||``. A comparison produces a Boolean value.

The ``||logic(noclick):=||`` comparison checks whether two values represent the same quantity. `3 = 3` is true; `3 = 2` is false. The factory shows true as **YES** and false as **NO**.

### Find these blocks

In ``||variables(noclick):Variables||``, use **Make a Variable** separately for ``||variables(noclick):orderTarget||``, ``||variables(noclick):deliveredNumber||``, and ``||variables(noclick):ready||``. The first two hold numbers. ``||variables(noclick):ready||`` holds the comparison's true/false result.

Add **an = order checks a number**. Find the pointed comparison block in ``||logic(noclick):Logic||`` and choose `=` from its dropdown.

![Native comparison, Boolean and factory inputs and output, with variable creation](assets/instructions/10-menu.svg)

### Make your code look like this

![Read orderTarget and deliveredNumber; set ready to their equality comparison; show check ready](assets/instructions/10-assembled.svg)

Put ``||variables(noclick):orderTarget||`` first and ``||variables(noclick):deliveredNumber||`` second, just like the bottom order. The pointed ``||logic(noclick):Logic||`` block produces true or false. **set ready** stores that result; **show check** displays it.

### What you should see

Collect a numbered container from the stand and throw it down at `3 = □`. Delivering `2` shows **NO**. Add one in the mixer, collect its new number, and deliver `3`: **YES** activates the order automatically. The target stays three throughout.

![Three equals two shows NO; making and delivering three shows YES and activates the order](assets/demos/10-equal-check.gif)

## 11. Is the left side smaller?

**Less than** checks whether the first value represents a smaller quantity than the second. Order matters: `4 < 5` is true, but `5 < 4` is false.

### Find these blocks

Add **a < order checks a number**. Use the same input blocks and variables. Choose `<` from the ``||logic(noclick):Logic||`` comparison dropdown.

![Native less-than comparison and its factory check event](assets/instructions/11-menu.svg)

### Make your code look like this

![Read both inputs; set ready to orderTarget less than deliveredNumber; show check ready](assets/instructions/11-assembled.svg)

### What you should see

The rightmost order asks for `4 < □`. Deliver `4`: **NO**, because the numbers are equal. Add one to the mixer and deliver `5`: **YES**. You changed the delivered number on the right.

![Four less than four shows NO; four less than five shows YES](assets/demos/11-less-check.gif)

## 12. Is the left side larger?

**Greater than** checks whether the first value represents a larger quantity than the second.

### Build the next event

Add **a > order checks a number**. Read both inputs. Set ``||variables(noclick):ready||`` to the greater-than comparison, with ``||variables(noclick):orderTarget||`` first and ``||variables(noclick):deliveredNumber||`` second. Show that Boolean result.

### What you should see

The middle order asks for `2 > □`. Delivering `2` gives **NO**. Subtract one in the mixer and deliver `1`: **YES**. Matching numbers make `=` true, but make both `<` and `>` false.

![Two greater than two shows NO; two greater than one shows YES](assets/demos/12-greater-check.gif)

## 13. Include the matching number

**Less than or equal to**, ``||logic(noclick):≤||``, accepts equality too. Both `5 ≤ 5` and `5 ≤ 6` are true.

### Build the next event

Add **a ≤ order checks a number**. Keep the same input order and variables. Choose `≤` from the comparison dropdown, save the Boolean in ``||variables(noclick):ready||``, and show it.

### What you should see

The rightmost order now asks for `5 ≤ □`. Make and deliver `5`: **YES**. A larger delivered number also works; `4` does not. The sign itself tells you which numbers qualify.

![Five less than or equal to five shows YES and activates the order](assets/demos/13-less-equal-check.gif)

## 14. Include equality the other way

**Greater than or equal to**, ``||logic(noclick):≥||``, also accepts matching numbers. Both `1 ≥ 1` and `1 ≥ 0` are true.

### Build the next event

Add **a ≥ order checks a number**. Read the fixed target and delivered number. Compare them with `≥`, keeping the target first. Save and show the result.

### What you should see

The middle order asks for `1 ≥ □`. Deliver `1`: **YES**. Zero or a negative number also works here. A larger delivered number, such as `2`, makes this statement false.

![One greater than or equal to one shows YES and activates the order](assets/demos/14-greater-equal-check.gif)

## 15. Run the factory

Keep your code. Activate all three orders: `3 = □`, `1 ≥ □`, and `5 ≤ □`.

### Choose your route

Read the target and sign before catching a modifier. Make a useful number in the pot, collect a copy from the stand, and throw it at its order. You can use several small calculations or take a shorter route with multiplication or division. Faster orders earn more coins.

### What you should see

One route makes `1`, then `3`, then `6`. Each delivered number turns its chosen check to **YES**. Collecting and delivering never empties the mixer: the next calculation starts with the amount you just made.

![Three calculated numbers activate the three different orders and complete a round](assets/demos/15-factory-round.gif)

Press **A** after all three activate. The next round keeps your mixer amount and brings new checks.

## 16. Watch the boundary

The next round uses strict `<` and `>` checks. A matching number is no longer enough for those orders.

### Choose a path

After finishing with `6` in the pot, the new orders include `5 < □`. Subtract one, collect `5`, and deliver it there. Predict the result before you throw. Then make a number that will turn that same order to **YES**.

### What you should see

`5 < 5` gives **NO**. Add one, collect `6`, and deliver it: `5 < 6` gives **YES**. Compare this with `5 ≤ 5` from the earlier round.

![A strict check rejects its matching boundary, then accepts the larger delivered number](assets/demos/16-boundary-checks.gif)

## 17. Keep the amount, change the plan

Your code can use each new mixer amount without being rewritten.

### Choose a path

Make and deliver `3` for the equality order. Look back at the pot: it still holds `3`. Find a useful next calculation for another order. Doubling gives `6`; subtracting two gives `1`. Both use the amount already there.

### What you should see

A numbered container carries a copy. Your next modifier changes the mixer, while a completed order keeps its delivered number. Try another route through the same three checks, using a different combination of arithmetic operations.

![The mixer keeps three after delivery, then doubling makes six for a different order](assets/demos/17-reuse-number.gif)
