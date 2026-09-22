# Cake Factory

### @explicitHints true

## Welcome to the cake factory!

Build the factory one useful capability at a time. The supplied ``||bakery(noclick):Cake Factory||`` drawer provides events and displays; your code will remember numbers, change them, and check orders.

## 1. Show the batch

Make ``||variables(noclick):batch||``. The startup code sets it to `2` and shows that value at the batch dispenser beside the pot.

### Find these blocks

In ``||variables(noclick):Variables||``, choose **Make a Variable** and name it ``||variables(noclick):batch||``. Find the ``||loops(noclick):on start||`` block in ``||loops(noclick):Loops||``, ``||variables(noclick):set batch to||`` in ``||variables(noclick):Variables||``, and **show** in ``||bakery(noclick):Cake Factory||``.

![Native menu blocks for batch and the startup display](assets/instructions/01-menu.svg)

### Make your code look like this

![Set batch to two and show batch at startup](assets/instructions/01-assembled.svg)

### What you should see

When the game starts, the batch dispenser shows `2`. The pot is ready for the first modifier.

![The batch dispenser shows two at startup](assets/demos/01-show-batch.gif)

## 2. Start the belt

Add to the existing ``||loops(noclick):on start||`` stack the ``||bakery(noclick):set conveyor belt on [true]||`` block. The middle belt begins with a `+ 1` item and one `3 = □` order appears.

### Find these blocks

In ``||bakery(noclick):Cake Factory||``, find **set conveyor belt on [true]**. The Boolean dropdown can be `true` to run the belt or `false` to stop it.

![Native menu blocks for enabling the conveyor](assets/instructions/02-menu.svg)

### Make your code look like this

![Enable the conveyor at startup](assets/instructions/02-assembled.svg)

### What you should see

The middle belt moves and brings `+ 1`. The first order asks for a number equal to `3`.

![The middle belt starts with one plus-one modifier and a three equals blank order](assets/demos/02-start-belt.gif)

## 3. Add one

With empty hands, use the arrow keys to move near an item. Press and release **A** to pick it up; press and release **A** again while facing the pot to throw it.

### Find these blocks

Add **a + 1 item hits the mixer** from ``||bakery(noclick):Cake Factory||``. Find **amount in the mixer** and **put [batch] in the mixer** in that drawer, ``||variables(noclick):batch||`` in ``||variables(noclick):Variables||``, and Math `+` in ``||math(noclick):Math||``.

![Native menu blocks for the first arithmetic event](assets/instructions/03-menu.svg)

### Make your code look like this

![Read batch, add one, save it, and put it in the mixer](assets/instructions/03-assembled.svg)

### What you should see

Pick up `+ 1`, throw it into the pot, and watch `2` become `3`. The mixer keeps the new amount.

![Picking up and throwing plus one changes two to three](assets/demos/03-add-one.gif)

## 4. Check equality

Connect the first order check. A Boolean is ``||logic(noclick):true||`` or ``||logic(noclick):false||``. Use the order target on the left and delivered number on the right.

### Find these blocks

Use **Make a Variable** for ``||variables(noclick):orderTarget||``, ``||variables(noclick):deliveredNumber||``, and ``||variables(noclick):ready||``. Add **an equal to (=) order checks a number**.

![Native menu blocks for the first equality check](assets/instructions/04-menu.svg)

### Make your code look like this

![Read both values, save equality in ready, and show the check](assets/instructions/04-assembled.svg)

### What you should see

At the dispenser, press **A** to pick up a copy of batch; face the order and press **A** to throw it. Deliver `3` to `3 = □`. The order checks automatically when the number lands.

![Delivering three completes the first equality check](assets/demos/04-equal-check.gif)

## 5. Take one away

Duplicate your step 3 addition event and keep the original. Change the event and operator in the duplicate as shown.

![Copy step 3's addition event and change it to subtraction](assets/instructions/05-adapt.svg)

### What you should see

Starting from `2`, throw `- 1`; the mixer becomes `1` for the equality target `1`.

![Subtracting one changes two to one](assets/demos/05-subtract-one.gif)

## 6. Check greater than

Duplicate your step 4 equality event and keep the original. Change the event and comparison as shown.

![Copy step 4's equality event and change it to greater than](assets/instructions/06-adapt.svg)

### What you should see

The target is `2`. Starting from `2`, subtract one and deliver `1` so `2 > 1` checks true.

![A greater-than order checks the delivered number](assets/demos/06-greater-check.gif)

## 7. Double the batch

Add a multiplication event. Read the current batch, multiply by `2`, save the result, and put it in the mixer.

![Native menu blocks for doubling the batch](assets/instructions/07-menu.svg)

### Make your code look like this

![Multiply batch by two and put the result in the mixer](assets/instructions/07-assembled.svg)

### What you should see

Starting from `2`, throw `× 2` to make `4` for the equality order.

![Doubling the batch makes four](assets/demos/07-double.gif)

## 8. Check less than

Duplicate your step 6 greater-than event and keep the original. Change the event and comparison as shown.

![Copy step 6's greater-than event and change it to less than](assets/instructions/08-adapt.svg)

### What you should see

The target is `3`. Starting from `2`, double to `4`, deliver it, and let `3 < 4` check.

![A less-than order checks the delivered number](assets/demos/08-less-check.gif)

## 9. Halve the batch

Add division by `2` using the current batch, then put the result in the mixer. This factory keeps whole-number results.

![Native menu blocks for halving the batch](assets/instructions/09-menu.svg)

### Make your code look like this

![Divide batch by two and put the result in the mixer](assets/instructions/09-assembled.svg)

### What you should see

Starting from `2`, throw `/ 2` to make `1` for the equality order.

![Halving two makes one](assets/demos/09-halve.gif)

## 10. Add the modifier's number

Create ``||variables(noclick):modifierNumber||``. Read the number printed on the modifier, add it to ``||variables(noclick):batch||``, save the result, and put it in the mixer.

![Native menu blocks for the printed modifier number](assets/instructions/10-menu.svg)

### Make your code look like this

![Read batch and modifierNumber, add them, and put batch in the mixer](assets/instructions/10-assembled.svg)

### What you should see

The left belt now offers printed-number modifiers. Starting from `2`, a `+ 2` modifier makes `4` for the equality order.

![Adding the modifier's number changes the batch](assets/demos/10-add-modifier.gif)

## 11. Subtract the modifier's number

Duplicate your step 10 printed-number event and keep the original. Change the event and operator as shown.

![Copy step 10's printed-number event and change it to subtraction](assets/instructions/11-adapt.svg)

### What you should see

Starting from `2`, use `- 2` to make `0` for the equality target `0`.

![Subtracting a printed modifier number](assets/demos/11-subtract-modifier.gif)

## 12. Multiply by the modifier's number

Duplicate your step 10 printed-number event and keep the original. Change the event and operator as shown.

![Copy step 10's printed-number event and change it to multiplication](assets/instructions/12-adapt.svg)

### What you should see

Starting from `2`, use `× 3` to make `6` for the equality order.

![Multiplying by a printed modifier number](assets/demos/12-multiply-modifier.gif)

## 13. Divide by the modifier's number

Duplicate your step 10 printed-number event and keep the original. Change the event and operator as shown.

![Copy step 10's printed-number event and change it to division](assets/instructions/13-adapt.svg)

### What you should see

Starting from `2`, use `× 3` to make `6`, then `/ 3` to make `2` for the equality target `2`.

![Dividing by a printed modifier number](assets/demos/13-divide-modifier.gif)

## 14. Include equality below

Duplicate your step 8 less-than event and keep the original. Change the event and comparison as shown.

![Copy step 8's less-than event and change it to less-than-or-equal](assets/instructions/14-adapt.svg)

### What you should see

The target is `2`; `2 ≤ 2` is true because equality counts.

![A less-than-or-equal order accepts equality](assets/demos/14-less-equal-check.gif)

## 15. Include equality above

Duplicate your step 6 greater-than event and keep the original. Change the event and comparison as shown.

![Copy step 6's greater-than event and change it to greater-than-or-equal](assets/instructions/15-adapt.svg)

### What you should see

The target is `2`; `2 ≥ 2` is true because equality counts in the other direction.

![A greater-than-or-equal order accepts equality](assets/demos/15-greater-equal-check.gif)

## 16. Set the batch directly

Add **a set 2 cake hits the mixer**. The numbered cake `2` uses direct assignment: set ``||variables(noclick):batch||`` to literal `2`, then use **put [batch] in the mixer** with ``||variables(noclick):batch||``.

![Native menu blocks for direct batch assignment](assets/instructions/16-menu.svg)

### Make your code look like this

![Set batch to the literal two and put batch in the mixer](assets/instructions/16-assembled.svg)

### What you should see

The numbered cake replaces the batch with `2`. All three orders and the full learned set are now available.

![Setting the batch directly with numbered cake two](assets/demos/16-set-batch.gif)

## 17. Finish three orders

Fill all three orders using the arithmetic and comparisons you built. Automatic delivery checks each number as it lands.

### What you should see

The first complete three-order round unlocks the side ingredient stations.

![Three orders are completed in one round](assets/demos/17-three-orders.gif)

## 18. Use station variables

Throw a copied number at an ingredient station, then solve an order that uses that station's icon. The supplied station variables stay separate from your ``||variables(noclick):batch||``.

### What you should see

The station operator changes every 12 seconds. The order can show `3 + [icon]`; use the icon's current value and check the order. The demo shows the station value changing before the later check.

![Ingredient stations change and feed a later order](assets/demos/18-variable-stations.gif)

## 19. Reuse the batch

Fill one order, then use the amount still in the mixer to make a number for another order. The mixer keeps its amount when you deliver a copy.

### What you should see

Your next modifier starts from the amount that remains in the mixer.

![A copied batch is delivered while the mixer value is reused](assets/demos/19-reuse-batch.gif)
