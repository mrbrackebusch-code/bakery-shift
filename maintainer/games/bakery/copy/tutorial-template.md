# Cake Factory

### @explicitHints true

## Welcome to the cake factory!

Three factory orders are waiting. Each machine has a **LEFT** tray and a **RIGHT** tray. Your job is to change the cakes until the statement between them is true. You can change **either side**.

Walk between the conveyor belts and collect one useful modifier. A purple modifier has a variable, an operator, and a small number: for example, `batch + 1`. Here, ``||variables(noclick):batch||`` means the amount on the side where you place it. The modifier changes that side once. Collect another to keep working.

**Move:** arrow keys. **A:** Space or Z. **B:** Enter or X. At the bottom of the room, the highlighted tray shows where your modifier will go. Press **A** to place it. Press **B** to drop a held item. With empty hands, **A** checks the machine and **B** resets both sides.

Each tray holds up to six whole cakes. Missed modifiers fall off the belts and new ones arrive. A loose cupcake adds one, but loose cakes arrive slowly. You can pause the simulator while you build.

First you will code the arithmetic that changes the cakes. Then you will connect the machines' TRUE/FALSE checks. The supplied ``||bakery(noclick):Cake Factory||`` drawer provides the events and displays; the calculations and checks will be yours.

## 1. Read either tray

A ``||variables(noclick):variable||`` is a container used to store values in your code. Give the worker somewhere to remember the amount on the tray you select.

### Find these blocks

In ``||variables(noclick):Variables||``, choose **Make a Variable** and name it ``||variables(noclick):batch||``. Find the event, tray amount, and tray display in ``||bakery(noclick):Cake Factory||``. Change the event dropdown to **a tray is selected**.

![Native menu blocks for creating batch, selecting a tray, reading its amount and showing a value](assets/instructions/01-menu.svg)

### Make your code look like this

![Connected tray-selection event: read the tray into batch, then show the value stored in batch](assets/instructions/01-assembled.svg)

The small ``||variables(noclick):batch||`` block reads the value you saved. It goes in the display's value slot.

### What you should see

Run the game. With empty hands, walk down to the left side of a machine and press **A**. A bubble shows that tray's cakes. Try the right side too. Reading a tray does not change its cakes. The machine's check will be connected later.

![Selecting the left and right trays shows their different cake amounts in the worker's bubble](assets/demos/01-clean-tray.gif)

## 2. Add one cake

A `+ 1` modifier should add one cake to the side you choose. A loose cupcake uses this same event.

### Find these blocks

Add a new ``||bakery(noclick):when||`` event from ``||bakery(noclick):Cake Factory||`` and choose **a + 1 item is placed**. Find the ``||math(noclick):0 + 0||`` block in ``||math(noclick):Math||``.

![Native event, variable, arithmetic and tray-result blocks for adding one cake](assets/instructions/02-menu.svg)

### Make your code look like this

![Read the selected tray into batch, set batch to batch plus one, and put batch on that tray](assets/instructions/02-assembled.svg)

Read the tray first. Calculate ``||variables(noclick):batch||`` plus `1`, save the result back in ``||variables(noclick):batch||``, and send that value to the tray. The ``||math(noclick):Math||`` block produces a number.

### What you should see

Collect `+ 1`, walk to either tray, and press **A**. That side gains one pictured cake. The other side stays the same. Try another addition on the other side.

![One modifier adds one cake to the selected side and leaves the opposite side unchanged](assets/demos/02-catch-one.gif)

## 3. Take one cake away

Sometimes the easier way to match two sides is to make one smaller.

### Build the next event

Create **a - 1 modifier is placed** in ``||bakery(noclick):Cake Factory||``. Use the same read, calculate, and put sequence. This time, choose subtraction from the ``||math(noclick):Math||`` block's operator dropdown and subtract `1` from ``||variables(noclick):batch||``.

### What you should see

Collect `- 1` and place it on a side that has cakes. One cake disappears from that side. You can reset both sides with empty hands and **B**, then try a different route.

![A minus-one modifier removes one pictured cake from the chosen side](assets/demos/03-discard-one.gif)

## 4. Double a side

A `× 2` modifier can do in one visit what repeated additions would take longer to do.

### Find these blocks

Add **a × 2 modifier is placed**. In the ``||math(noclick):Math||`` block's dropdown, choose multiplication. Use the tray read and result blocks you already know.

![Native multiplication and factory blocks for the double event](assets/instructions/04-menu.svg)

### Make your code look like this

![Read batch, multiply batch by two, store the new batch and put it on the selected tray](assets/instructions/04-assembled.svg)

### What you should see

Collect `× 2` and place it on a tray with one, two, or three cakes. The cakes double. For example, one becomes two. Choose which side makes the modifier useful.

![A times-two modifier doubles the cake group on one side](assets/demos/04-double-batch.gif)

## 5. Divide a side

Division makes a large group smaller. A `/ 2` modifier divides the selected amount into two equal groups and keeps one group.

### Find these blocks

Add **a / 2 modifier is placed**. Choose division from the ``||math(noclick):Math||`` block's dropdown.

![Native division and factory blocks for dividing a tray by two](assets/instructions/05-menu.svg)

### Make your code look like this

![Read the selected batch, divide it by two, save it and put that result on the tray](assets/instructions/05-assembled.svg)

### What you should see

Place `/ 2` on a side with two cakes. One remains. The factory uses whole cakes, so a division that would split a cake asks you to choose another side.

![Dividing two pictured cakes by two leaves one on the selected tray](assets/demos/05-pack-pairs.gif)

## 6. Read the modifier's number

The belts can now offer `+ 2` and `+ 3`. One event can use the number printed on either modifier.

### Find these blocks

In ``||variables(noclick):Variables||``, choose **Make a Variable** and name it ``||variables(noclick):modifierNumber||``. Add **a + 2 or + 3 modifier is placed** and find **number on the modifier** in ``||bakery(noclick):Cake Factory||``.

![Native menu blocks for modifierNumber, its printed-number input and the addition event](assets/instructions/06-menu.svg)

### Make your code look like this

![Read batch and modifierNumber, add those two variables, then put the saved batch on the tray](assets/instructions/06-assembled.svg)

The two variables have different jobs: ``||variables(noclick):batch||`` remembers the selected side; ``||variables(noclick):modifierNumber||`` remembers the carried modifier's number.

### What you should see

Place `+ 2` on one cake. Three cakes appear. Use another printed number or another starting amount and compare the result.

![The plus-two modifier changes one pictured cake into three](assets/demos/06-delivery.gif)

## 7. Subtract the printed number

A `- 2` or `- 3` modifier removes its printed amount from the side you choose.

### Build the next event

Add **a - 2 or - 3 modifier is placed**. Read the tray into ``||variables(noclick):batch||`` and the modifier's number into ``||variables(noclick):modifierNumber||``. Calculate the difference, save it in ``||variables(noclick):batch||``, and put that result on the tray.

### What you should see

Place `- 2` on three cakes. One remains. Compare changing the larger side with changing the smaller side: which gets you closer to making the statement true?

![Subtracting the modifier's printed two from three cakes leaves one](assets/demos/07-serve-order.gif)

## 8. Multiply by the printed number

A `× 3` modifier offers another way to change a small group quickly.

### Build the next event

Add **a × 3 modifier is placed**. Read both inputs into your variables. This time, multiply ``||variables(noclick):batch||`` by ``||variables(noclick):modifierNumber||``, save the result, and put it on the selected tray.

### What you should see

Place `× 3` on one cake. Three appear. The tray still has room for at most six cakes, so choose a useful starting group.

![Multiplying one cake by the printed three produces three cakes](assets/demos/08-bake-trays.gif)

## 9. Divide by the printed number

You now have all four arithmetic operations with two variable inputs.

### Build the next event

Add **a / 3 modifier is placed**. Read both inputs, divide ``||variables(noclick):batch||`` by ``||variables(noclick):modifierNumber||``, save the result, and put it on the tray.

### What you should see

Place `/ 3` on three cakes. One remains. Try solving a pictured match by changing the left side, then reset and try changing the right side.

![Dividing three cakes by the modifier's printed three leaves one](assets/demos/09-pack-boxes.gif)

## 10. Is the statement true?

Connect the machines' checks. A **Boolean** value is either ``||logic(noclick):true||`` or ``||logic(noclick):false||``. A comparison produces a Boolean value.

The ``||logic(noclick):=||`` comparison checks whether two values represent the same quantity. Two cakes on the left and two on the right make an equal statement true. Two on the left and three on the right make it false.

### Find these blocks

In ``||variables(noclick):Variables||``, use **Make a Variable** separately for ``||variables(noclick):leftCakes||``, ``||variables(noclick):rightCakes||``, and ``||variables(noclick):ready||``. The first two will hold numbers. ``||variables(noclick):ready||`` will hold the comparison's true/false result.

Add **an = machine checks its trays** from ``||bakery(noclick):Cake Factory||``. Find the pointed comparison block in ``||logic(noclick):Logic||`` and choose `=` from its dropdown.

![Native comparison, Boolean and factory input/output blocks, with variable creation](assets/instructions/10-menu.svg)

### Make your code look like this

![Read leftCakes and rightCakes; set ready to the equals comparison; show check ready](assets/instructions/10-assembled.svg)

The pointed ``||logic(noclick):Logic||`` block produces true or false. The ``||variables(noclick):set||`` block stores that result in ``||variables(noclick):ready||``. **show check** displays your result on the machine.

### What you should see

The machines show **FALSE** when their sides differ. Change either side until the pictures match: the check becomes **TRUE**. With empty hands, press **A** at that machine to complete its order.

![Unequal cakes show FALSE; a modifier makes the groups equal, the learner's check turns TRUE, and A completes the order](assets/demos/10-equal-check.gif)

## 11. Make the left side smaller

The second machine now asks for ``||logic(noclick):<||``. **Less than** checks whether the first value represents a smaller quantity than the second. Order matters: read the left side first.

### Find these blocks

Add **a < machine checks its trays**. Use the same two cake inputs, variables, and check output. Choose `<` from the ``||logic(noclick):Logic||`` comparison dropdown.

![Native less-than comparison and the corresponding factory check event](assets/instructions/11-menu.svg)

### Make your code look like this

![Read both sides; set ready to leftCakes less than rightCakes; show check ready](assets/instructions/11-assembled.svg)

### What you should see

Make the left side smaller than the right. You could remove cakes from the left or add cakes to the right. The lamp shows **TRUE** when your comparison is true; empty-handed **A** completes the order.

![Changing one side makes the left cake group smaller and changes the less-than check from FALSE to TRUE](assets/demos/11-less-check.gif)

## 12. Make the left side larger

The third machine asks for ``||logic(noclick):>||``. **Greater than** checks whether the first value represents a larger quantity than the second.

### Build the next event

Add **a > machine checks its trays**. Read both cake amounts into their variables. Set ``||variables(noclick):ready||`` to the greater-than comparison, with ``||variables(noclick):leftCakes||`` first and ``||variables(noclick):rightCakes||`` second. Show that Boolean result with **show check**.

### What you should see

Make the left side larger. You can increase the left or decrease the right. Matching groups make `=` true, but they make both `<` and `>` false.

![Increasing the left cake group beyond the right changes the greater-than check to TRUE](assets/demos/12-greater-check.gif)

## 13. Run the factory

All three kinds of order are ready. Complete the `=`, `<`, and `>` orders using your arithmetic modifiers and checks.

### Choose your route

Read the pictured amounts and sign before choosing a modifier. Work on either side. Several small changes can work; a useful multiplication or division may get there faster. Drop an unhelpful modifier with **B**. Empty-handed **B** resets an unfinished machine so you can try another plan.

### What you should see

When a machine shows **TRUE**, return with empty hands and press **A** to send its batch. Complete all three orders to finish the round. Faster orders earn more coins.

![The worker changes both sides across three comparisons, ships true batches and completes the factory round](assets/demos/13-factory-round.gif)

Press **A** for another round with different small starting groups. Can you find a different way to make each statement true?
