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

![Native menu blocks for creating batch, selecting a tray, reading its amount and showing a value](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/instructions/01-menu.svg)

### Make your code look like this

![Connected tray-selection event: read the tray into batch, then show the value stored in batch](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/instructions/01-assembled.svg)

The small ``||variables(noclick):batch||`` block reads the value you saved. It goes in the display's value slot.

### What you should see

Run the game. With empty hands, walk down to the left side of a machine and press **A**. A bubble shows that tray's cakes. Try the right side too. Reading a tray does not change its cakes. The machine's check will be connected later.

![Selecting the left and right trays shows their different cake amounts in the worker's bubble](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/demos/01-clean-tray.gif)

#### ~ tutorialhint

```blocks
let batch = 0

bakery.onAction(BakeryAction.TraySelected, function () {
    batch = bakery.trayAmount()
    bakery.showTray(batch)
})
```

## 2. Add one cake

A `+ 1` modifier should add one cake to the side you choose. A loose cupcake uses this same event.

### Find these blocks

Add a new ``||bakery(noclick):when||`` event from ``||bakery(noclick):Cake Factory||`` and choose **a + 1 item is placed**. Find the ``||math(noclick):0 + 0||`` block in ``||math(noclick):Math||``.

![Native event, variable, arithmetic and tray-result blocks for adding one cake](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/instructions/02-menu.svg)

### Make your code look like this

![Read the selected tray into batch, set batch to batch plus one, and put batch on that tray](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/instructions/02-assembled.svg)

Read the tray first. Calculate ``||variables(noclick):batch||`` plus `1`, save the result back in ``||variables(noclick):batch||``, and send that value to the tray. The ``||math(noclick):Math||`` block produces a number.

### What you should see

Collect `+ 1`, walk to either tray, and press **A**. That side gains one pictured cake. The other side stays the same. Try another addition on the other side.

![One modifier adds one cake to the selected side and leaves the opposite side unchanged](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/demos/02-catch-one.gif)

#### ~ tutorialhint

```blocks
let batch = 0

bakery.onAction(BakeryAction.AddOne, function () {
    batch = bakery.trayAmount()
    batch = batch + 1
    bakery.applyResult(batch)
})
```

## 3. Take one cake away

Sometimes the easier way to match two sides is to make one smaller.

### Build the next event

Create **a - 1 modifier is placed** in ``||bakery(noclick):Cake Factory||``. Use the same read, calculate, and put sequence. This time, choose subtraction from the ``||math(noclick):Math||`` block's operator dropdown and subtract `1` from ``||variables(noclick):batch||``.

### What you should see

Collect `- 1` and place it on a side that has cakes. One cake disappears from that side. You can reset both sides with empty hands and **B**, then try a different route.

![A minus-one modifier removes one pictured cake from the chosen side](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/demos/03-discard-one.gif)

#### ~ tutorialhint

```blocks
let batch = 0

bakery.onAction(BakeryAction.RemoveOne, function () {
    batch = bakery.trayAmount()
    batch = batch - 1
    bakery.applyResult(batch)
})
```

## 4. Double a side

A `× 2` modifier can do in one visit what repeated additions would take longer to do.

### Find these blocks

Add **a × 2 modifier is placed**. In the ``||math(noclick):Math||`` block's dropdown, choose multiplication. Use the tray read and result blocks you already know.

![Native multiplication and factory blocks for the double event](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/instructions/04-menu.svg)

### Make your code look like this

![Read batch, multiply batch by two, store the new batch and put it on the selected tray](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/instructions/04-assembled.svg)

### What you should see

Collect `× 2` and place it on a tray with one, two, or three cakes. The cakes double. For example, one becomes two. Choose which side makes the modifier useful.

![A times-two modifier doubles the cake group on one side](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/demos/04-double-batch.gif)

#### ~ tutorialhint

```blocks
let batch = 0

bakery.onAction(BakeryAction.Double, function () {
    batch = bakery.trayAmount()
    batch = batch * 2
    bakery.applyResult(batch)
})
```

## 5. Divide a side

Division makes a large group smaller. A `/ 2` modifier divides the selected amount into two equal groups and keeps one group.

### Find these blocks

Add **a / 2 modifier is placed**. Choose division from the ``||math(noclick):Math||`` block's dropdown.

![Native division and factory blocks for dividing a tray by two](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/instructions/05-menu.svg)

### Make your code look like this

![Read the selected batch, divide it by two, save it and put that result on the tray](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/instructions/05-assembled.svg)

### What you should see

Place `/ 2` on a side with two cakes. One remains. The factory uses whole cakes, so a division that would split a cake asks you to choose another side.

![Dividing two pictured cakes by two leaves one on the selected tray](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/demos/05-pack-pairs.gif)

#### ~ tutorialhint

```blocks
let batch = 0

bakery.onAction(BakeryAction.Halve, function () {
    batch = bakery.trayAmount()
    batch = batch / 2
    bakery.applyResult(batch)
})
```

## 6. Read the modifier's number

The belts can now offer `+ 2` and `+ 3`. One event can use the number printed on either modifier.

### Find these blocks

In ``||variables(noclick):Variables||``, choose **Make a Variable** and name it ``||variables(noclick):modifierNumber||``. Add **a + 2 or + 3 modifier is placed** and find **number on the modifier** in ``||bakery(noclick):Cake Factory||``.

![Native menu blocks for modifierNumber, its printed-number input and the addition event](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/instructions/06-menu.svg)

### Make your code look like this

![Read batch and modifierNumber, add those two variables, then put the saved batch on the tray](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/instructions/06-assembled.svg)

The two variables have different jobs: ``||variables(noclick):batch||`` remembers the selected side; ``||variables(noclick):modifierNumber||`` remembers the carried modifier's number.

### What you should see

Place `+ 2` on one cake. Three cakes appear. Use another printed number or another starting amount and compare the result.

![The plus-two modifier changes one pictured cake into three](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/demos/06-delivery.gif)

#### ~ tutorialhint

```blocks
let batch = 0
let modifierNumber = 0

bakery.onAction(BakeryAction.AddModifier, function () {
    batch = bakery.trayAmount()
    modifierNumber = bakery.modifierNumber()
    batch = batch + modifierNumber
    bakery.applyResult(batch)
})
```

## 7. Subtract the printed number

A `- 2` or `- 3` modifier removes its printed amount from the side you choose.

### Build the next event

Add **a - 2 or - 3 modifier is placed**. Read the tray into ``||variables(noclick):batch||`` and the modifier's number into ``||variables(noclick):modifierNumber||``. Calculate the difference, save it in ``||variables(noclick):batch||``, and put that result on the tray.

### What you should see

Place `- 2` on three cakes. One remains. Compare changing the larger side with changing the smaller side: which gets you closer to making the statement true?

![Subtracting the modifier's printed two from three cakes leaves one](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/demos/07-serve-order.gif)

#### ~ tutorialhint

```blocks
let batch = 0
let modifierNumber = 0

bakery.onAction(BakeryAction.SubtractModifier, function () {
    batch = bakery.trayAmount()
    modifierNumber = bakery.modifierNumber()
    batch = batch - modifierNumber
    bakery.applyResult(batch)
})
```

## 8. Multiply by the printed number

A `× 3` modifier offers another way to change a small group quickly.

### Build the next event

Add **a × 3 modifier is placed**. Read both inputs into your variables. This time, multiply ``||variables(noclick):batch||`` by ``||variables(noclick):modifierNumber||``, save the result, and put it on the selected tray.

### What you should see

Place `× 3` on one cake. Three appear. The tray still has room for at most six cakes, so choose a useful starting group.

![Multiplying one cake by the printed three produces three cakes](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/demos/08-bake-trays.gif)

#### ~ tutorialhint

```blocks
let batch = 0
let modifierNumber = 0

bakery.onAction(BakeryAction.MultiplyModifier, function () {
    batch = bakery.trayAmount()
    modifierNumber = bakery.modifierNumber()
    batch = batch * modifierNumber
    bakery.applyResult(batch)
})
```

## 9. Divide by the printed number

You now have all four arithmetic operations with two variable inputs.

### Build the next event

Add **a / 3 modifier is placed**. Read both inputs, divide ``||variables(noclick):batch||`` by ``||variables(noclick):modifierNumber||``, save the result, and put it on the tray.

### What you should see

Place `/ 3` on three cakes. One remains. Try solving a pictured match by changing the left side, then reset and try changing the right side.

![Dividing three cakes by the modifier's printed three leaves one](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/demos/09-pack-boxes.gif)

#### ~ tutorialhint

```blocks
let batch = 0
let modifierNumber = 0

bakery.onAction(BakeryAction.DivideModifier, function () {
    batch = bakery.trayAmount()
    modifierNumber = bakery.modifierNumber()
    batch = batch / modifierNumber
    bakery.applyResult(batch)
})
```

## 10. Is the statement true?

Connect the machines' checks. A **Boolean** value is either ``||logic(noclick):true||`` or ``||logic(noclick):false||``. A comparison produces a Boolean value.

The ``||logic(noclick):=||`` comparison checks whether two values represent the same quantity. Two cakes on the left and two on the right make an equal statement true. Two on the left and three on the right make it false.

### Find these blocks

In ``||variables(noclick):Variables||``, use **Make a Variable** separately for ``||variables(noclick):leftCakes||``, ``||variables(noclick):rightCakes||``, and ``||variables(noclick):ready||``. The first two will hold numbers. ``||variables(noclick):ready||`` will hold the comparison's true/false result.

Add **an = machine checks its trays** from ``||bakery(noclick):Cake Factory||``. Find the pointed comparison block in ``||logic(noclick):Logic||`` and choose `=` from its dropdown.

![Native comparison, Boolean and factory input/output blocks, with variable creation](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/instructions/10-menu.svg)

### Make your code look like this

![Read leftCakes and rightCakes; set ready to the equals comparison; show check ready](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/instructions/10-assembled.svg)

The pointed ``||logic(noclick):Logic||`` block produces true or false. The ``||variables(noclick):set||`` block stores that result in ``||variables(noclick):ready||``. **show check** displays your result on the machine.

### What you should see

The machines show **FALSE** when their sides differ. Change either side until the pictures match: the check becomes **TRUE**. With empty hands, press **A** at that machine to complete its order.

![Unequal cakes show FALSE; a modifier makes the groups equal, the learner's check turns TRUE, and A completes the order](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/demos/10-equal-check.gif)

#### ~ tutorialhint

```blocks
let leftCakes = 0
let rightCakes = 0
let ready = false

bakery.onAction(BakeryAction.EqualCheck, function () {
    leftCakes = bakery.leftAmount()
    rightCakes = bakery.rightAmount()
    ready = leftCakes == rightCakes
    bakery.showCheck(ready)
})
```

## 11. Make the left side smaller

The second machine now asks for ``||logic(noclick):<||``. **Less than** checks whether the first value represents a smaller quantity than the second. Order matters: read the left side first.

### Find these blocks

Add **a < machine checks its trays**. Use the same two cake inputs, variables, and check output. Choose `<` from the ``||logic(noclick):Logic||`` comparison dropdown.

![Native less-than comparison and the corresponding factory check event](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/instructions/11-menu.svg)

### Make your code look like this

![Read both sides; set ready to leftCakes less than rightCakes; show check ready](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/instructions/11-assembled.svg)

### What you should see

Make the left side smaller than the right. You could remove cakes from the left or add cakes to the right. The lamp shows **TRUE** when your comparison is true; empty-handed **A** completes the order.

![Changing one side makes the left cake group smaller and changes the less-than check from FALSE to TRUE](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/demos/11-less-check.gif)

#### ~ tutorialhint

```blocks
let leftCakes = 0
let rightCakes = 0
let ready = false

bakery.onAction(BakeryAction.LessCheck, function () {
    leftCakes = bakery.leftAmount()
    rightCakes = bakery.rightAmount()
    ready = leftCakes < rightCakes
    bakery.showCheck(ready)
})
```

## 12. Make the left side larger

The third machine asks for ``||logic(noclick):>||``. **Greater than** checks whether the first value represents a larger quantity than the second.

### Build the next event

Add **a > machine checks its trays**. Read both cake amounts into their variables. Set ``||variables(noclick):ready||`` to the greater-than comparison, with ``||variables(noclick):leftCakes||`` first and ``||variables(noclick):rightCakes||`` second. Show that Boolean result with **show check**.

### What you should see

Make the left side larger. You can increase the left or decrease the right. Matching groups make `=` true, but they make both `<` and `>` false.

![Increasing the left cake group beyond the right changes the greater-than check to TRUE](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/demos/12-greater-check.gif)

#### ~ tutorialhint

```blocks
let leftCakes = 0
let rightCakes = 0
let ready = false

bakery.onAction(BakeryAction.GreaterCheck, function () {
    leftCakes = bakery.leftAmount()
    rightCakes = bakery.rightAmount()
    ready = leftCakes > rightCakes
    bakery.showCheck(ready)
})
```

## 13. Run the factory

All three kinds of order are ready. Complete the `=`, `<`, and `>` orders using your arithmetic modifiers and checks.

### Choose your route

Read the pictured amounts and sign before choosing a modifier. Work on either side. Several small changes can work; a useful multiplication or division may get there faster. Drop an unhelpful modifier with **B**. Empty-handed **B** resets an unfinished machine so you can try another plan.

### What you should see

When a machine shows **TRUE**, return with empty hands and press **A** to send its batch. Complete all three orders to finish the round. Faster orders earn more coins.

![The worker changes both sides across three comparisons, ships true batches and completes the factory round](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/598388360692ff16/demos/13-factory-round.gif)

Press **A** for another round with different small starting groups. Can you find a different way to make each statement true?

```template
// Cake Factory

```

```customts
// Canonical code-native Bakery Shift artwork. Included by build.mjs.
// No learner arithmetic, state mutation, collection or completion logic here.
namespace bakeryArt {
    // Index 10 exactly matches pinned Math; index 2 matches Variables.
    // Install only once at game start if this complete palette is adopted.
    export function installPalette() {
        image.setPalette(hex`000000 FFFFFF EC3B59 F7AAC3 D98B46 F6C85F 479AA4 E7AD82 294E5A 9BD7D0 A55EEA 683C91 A8B8B5 D9E2DC 6E4638 243139`)
    }

    function rounded(p: Image, x: number, y: number, w: number, h: number, c: number) {
        p.fillRect(x + 3, y, w - 6, h, c)
        p.fillRect(x + 1, y + 1, w - 2, h - 2, c)
        p.fillRect(x, y + 3, w, h - 6, c)
    }

    export function bun(): Image {
        return img`
            . . . e e e e . . .
            . . e 5 5 5 5 e . .
            . e 5 5 1 5 5 5 e .
            e 5 5 1 5 1 5 5 5 e
            e 5 5 5 5 5 1 5 5 e
            e 4 5 5 5 5 5 5 4 e
            . e 4 4 4 4 4 4 e .
            . . e e e e e e . .
            . . . e e e e . . .
        `
    }

    export function cupcake(): Image {
        return img`
            . . . . 2 . . . . .
            . . . 1 1 1 1 . . .
            . . 1 3 3 3 3 1 . .
            . 1 3 3 3 3 3 3 1 .
            1 3 3 3 3 3 3 3 3 1
            . e e e e e e e e .
            . e 4 5 5 5 5 4 e .
            . . e 4 5 5 4 e . .
            . . e 4 5 5 4 e . .
            . . . e e e e . . .
        `
    }

    export function chef(frame: number = 0): Image {
        let p = img`
            . . . . . 1 1 1 1 1 1 . . . . .
            . . . 1 1 1 1 1 1 1 1 1 1 . . .
            . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
            . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
            . . . 1 1 1 1 1 1 1 1 1 1 . . .
            . . . . e e e e e e e e . . . .
            . . . . e 7 7 7 7 7 7 e . . . .
            . . . . 7 f 7 7 7 f 7 7 . . . .
            . . . . 7 7 7 7 7 7 7 7 . . . .
            . . . . . 7 7 2 2 7 7 . . . . .
            . . . . . . 7 7 7 7 . . . . . .
            . . . 1 1 6 1 1 6 1 1 1 1 . . .
            . . 1 1 1 6 6 6 6 6 6 1 1 1 . .
            . . 7 7 1 6 6 6 6 6 1 7 7 . . .
            . . 7 7 1 6 6 6 6 6 1 7 7 . . .
            . . . . 6 6 6 6 6 6 6 6 . . . .
            . . . . 6 6 6 6 6 6 6 6 . . . .
            . . . . 6 6 c c 6 6 6 6 . . . .
            . . . . 6 6 c c 6 6 6 6 . . . .
            . . . . f f . . f f . . . . . .
            . . . f f f . . f f f . . . . .
            . . . f f f . . . f f f . . . .
        `
        if (frame == 1) { p.setPixel(3, 21, 0); p.setPixel(6, 21, 15) }
        if (frame == 2) { p.setPixel(11, 21, 0); p.setPixel(8, 21, 15) }
        return p
    }

    // The HUD and three bottom stations are drawn separately by the caller.
    export function drawBackground(): Image {
        let p = image.create(320, 240)
        p.fill(13)
        p.fillRect(0, 0, 320, 19, 14)
        // A compact cake-factory ceiling: warm lamps, vents, and looping pipes.
        p.fillRect(0, 20, 320, 3, 8)
        for (let x of [18, 124, 230]) {
            p.fillRect(x, 24, 30, 3, 8)
            p.fillRect(x + 4, 27, 22, 2, 9)
            p.fillRect(x + 8, 29, 14, 2, 6)
        }
        p.fillRect(20, 25, 3, 17, 8); p.fillRect(17, 39, 6, 3, 8)
        p.fillRect(145, 23, 3, 18, 8); p.fillRect(142, 38, 6, 3, 8)
        p.fillRect(291, 24, 3, 18, 8); p.fillRect(288, 39, 6, 3, 8)
        for (let y = 27; y < 170; y += 20) for (let x = 4; x < 320; x += 24) {
            p.setPixel(x, y, 12); p.setPixel(x + 1, y, 12)
        }
        for (let x of [54, 160, 266]) {
            rounded(p, x - 38, 31, 76, 82, 14)
            p.fillRect(x - 34, 34, 68, 75, 12)
            p.fillRect(x - 36, 107, 72, 6, 8)
            p.fillRect(x - 31, 109, 62, 1, 9)
        }
        // The clear walking floor runs from y=90 through y=157 around the belts.
        p.fillRect(0, 114, 320, 44, 8)
        p.fillRect(0, 115, 320, 2, 9)
        for (let x = 12; x < 320; x += 24) {
            p.fillRect(x, 151, 11, 2, 12); p.fillRect(x + 5, 153, 1, 4, 12)
        }
        p.fillRect(0, 158, 320, 3, 14)
        for (let x = 8; x < 320; x += 32) {
            p.fillRect(x, 161, 18, 3, 8)
            p.fillRect(x + 3, 164, 12, 2, 12)
        }
        return p
    }

    // Call every frame over the static background, before tokens and chef.
    export function conveyorTreads(p: Image, pixelOffset: number) {
        for (let x of [54, 160, 266]) p.fillRect(x - 34, 34, 68, 73, 12)
        for (let x of [54, 160, 266]) for (let row = 0; row < 5; row++) {
            let y = 35 + ((row * 15 + pixelOffset) % 71)
            p.fillRect(x - 32, y, 64, 1, 8)
            if (y < 102) for (let dx = -24; dx < 30; dx += 16) {
                p.setPixel(x + dx, y + 2, 8); p.setPixel(x + dx + 1, y + 3, 8)
                p.setPixel(x + dx + 2, y + 4, 8); p.setPixel(x + dx + 3, y + 3, 8)
                p.setPixel(x + dx + 4, y + 2, 8)
            }
        }
    }

    // 0 +, 1 -, 2 multiplication cross, 3 forward slash.
    // PXT overrides vanilla Blockly's division sign to slash; match that UI.
    function operator(p: Image, op: number, x: number, y: number, color: number) {
        if (op == 0) { p.fillRect(x, y + 2, 5, 1, color); p.fillRect(x + 2, y, 1, 5, color) }
        if (op == 1) p.fillRect(x, y + 2, 5, 1, color)
        if (op == 2) for (let n = 0; n < 5; n++) { p.setPixel(x + n, y + n, color); p.setPixel(x + 4 - n, y + n, color) }
        if (op == 3) for (let n = 0; n < 5; n++) p.setPixel(x + 4 - n, y + n, color)
    }

    // Exactly 64x20, including its bottom edge. Native font8 has six-pixel pitch.
    export function modifier(op: number, rhs: number): Image {
        let p = image.create(64, 20)
        rounded(p, 0, 0, 64, 20, 11)
        rounded(p, 0, 0, 64, 19, 10)
        rounded(p, 3, 3, 34, 13, 2)
        p.print("batch", 5, 5, 1, image.font8)
        p.fillRect(39, 4, 11, 11, 11)
        operator(p, op, 40, 7, 1)
        p.fillRect(46, 10, 3, 1, 1); p.setPixel(47, 11, 1)
        rounded(p, 52, 3, 10, 13, 1)
        p.print("" + rhs, 54, 5, 15, image.font8)
        return p
    }

    // Do not use overlapping food or one aggregate number to represent 0..6.
    // Caller handles unrepresentable learner results explicitly; no clamping.
    export function goods(p: Image, value: number, x: number, y: number, kind: number) {
        if (value < 0 || value > 6 || Math.floor(value) != value) return
        let food = kind == 0 ? bun() : cupcake()
        for (let i = 0; i < value; i++) {
            p.drawTransparentImage(food, x + (i % 3) * 12, y + Math.idiv(i, 3) * 12)
        }
    }

    export function socket(p: Image, x: number, y: number, active: boolean) {
        rounded(p, x - 2, y - 2, 68, 24, active ? 5 : 14)
        rounded(p, x, y, 64, 20, active ? 11 : 12)
        p.fillRect(x + 4, y + 3, 5, 1, 1); p.fillRect(x + 3, y + 4, 1, 4, 1)
        p.fillRect(x + 55, y + 3, 5, 1, 1); p.fillRect(x + 60, y + 4, 1, 4, 1)
        p.fillRect(x + 4, y + 16, 5, 1, 1); p.fillRect(x + 3, y + 12, 1, 4, 1)
        p.fillRect(x + 55, y + 16, 5, 1, 1); p.fillRect(x + 60, y + 12, 1, 4, 1)
        let c = active ? 5 : 1
        p.fillRect(x + 31, y + 5, 2, 7, c)
        p.fillRect(x + 28, y + 10, 8, 1, c); p.fillRect(x + 29, y + 11, 6, 1, c); p.fillRect(x + 30, y + 12, 4, 1, c)
    }

    // x=6,110,214. Draw later than floor, earlier than held-card overlay.
    export function station(p: Image, x: number, target: number, current: number, kind: number, active: boolean) {
        rounded(p, x, 170, 100, 69, 14)
        p.fillRect(x + 2, 172, 96, 65, 1)
        p.print("ORDER", x + 6, 177, 14, image.font5)
        p.print("TRAY", x + 57, 177, 14, image.font5)
        p.fillRect(x + 5, 186, 40, 26, 13); p.drawRect(x + 5, 186, 40, 26, 12)
        rounded(p, x + 53, 186, 42, 26, 12); p.fillRect(x + 56, 188, 36, 22, 13)
        goods(p, target, x + 8, 188, kind); goods(p, current, x + 59, 188, kind)
        p.fillRect(x + 47, 190, 1, 20, 4)
        socket(p, x + 18, 216, active)
        p.print("A", x + 88, 224, 14, image.font5)
    }

    // A paired cake machine. Both trays remain equally editable; state is supplied
    // by the caller so this artwork never performs learner arithmetic.
    export function machine(p: Image, x: number, left: number, right: number, relation: number, activeSide: number, signal: number, readyToShip: boolean) {
        rounded(p, x, 170, 100, 69, 14)
        p.fillRect(x + 2, 172, 96, 65, 1)
        p.print("LEFT", x + 6, 177, 14, image.font5)
        p.print("RIGHT", x + 62, 177, 14, image.font5)

        // Both trays use the same frame and socket treatment.
        let leftFrame = activeSide == 0 ? 5 : 12
        let rightFrame = activeSide == 1 ? 5 : 12
        p.fillRect(x + 3, 189, 38, 27, 13)
        p.drawRect(x + 3, 189, 38, 27, leftFrame)
        p.fillRect(x + 59, 189, 38, 27, 13)
        p.drawRect(x + 59, 189, 38, 27, rightFrame)
        goods(p, left, x + 5, 191, 1)
        goods(p, right, x + 61, 191, 1)

        // Small pointed placement markers make both modifier sockets discoverable.
        let leftMarker = activeSide == 0 ? 5 : 6
        let rightMarker = activeSide == 1 ? 5 : 6
        p.fillRect(x + 19, 182, 6, 2, leftMarker)
        p.fillRect(x + 21, 184, 2, 3, leftMarker)
        p.setPixel(x + 18, 181, leftMarker); p.setPixel(x + 25, 181, leftMarker)
        p.fillRect(x + 75, 182, 6, 2, rightMarker)
        p.fillRect(x + 77, 184, 2, 3, rightMarker)
        p.setPixel(x + 74, 181, rightMarker); p.setPixel(x + 81, 181, rightMarker)

        // Blue/teal comparison badge with a pointed Boolean shape.
        let bx = x + 43
        p.fillRect(bx, 196, 14, 11, 8)
        p.fillRect(bx + 2, 195, 10, 13, 6)
        p.fillRect(bx + 4, 194, 6, 15, 6)
        p.setPixel(bx + 3, 196, 9); p.setPixel(bx + 10, 196, 9)
        p.setPixel(bx + 3, 207, 9); p.setPixel(bx + 10, 207, 9)
        let relationMark = relation == 0 ? "=" : relation == 1 ? "<" : ">"
        p.print(relationMark, bx + 5, 197, 1, image.font5)

        let status = signal < 0 ? "CHECK?" : signal == 0 ? "FALSE" : "TRUE"
        let statusX = signal < 0 ? x + 35 : signal == 0 ? x + 38 : x + 40
        p.print(status, statusX, 220, signal == 1 ? 8 : 11, image.font5)
        if (readyToShip) {
            // A small outgoing package sits below the badge and leaves values clear.
            p.fillRect(x + 86, 220, 8, 7, 5)
            p.drawRect(x + 86, 220, 8, 7, 1)
            p.fillRect(x + 89, 219, 2, 9, 9)
            p.setPixel(x + 96, 223, 9); p.setPixel(x + 97, 223, 9)
        }
    }
}

namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 320
    export const ARCADE_SCREEN_HEIGHT = 240
}

enum BakeryAction {
    //% block="a tray is selected"
    TraySelected,
    //% block="a + 1 item is placed"
    AddOne,
    //% block="a - 1 modifier is placed"
    RemoveOne,
    //% block="a × 2 modifier is placed"
    Double,
    //% block="a / 2 modifier is placed"
    Halve,
    //% block="a + 2 or + 3 modifier is placed"
    AddModifier,
    //% block="a - 2 or - 3 modifier is placed"
    SubtractModifier,
    //% block="a × 3 modifier is placed"
    MultiplyModifier,
    //% block="a / 3 modifier is placed"
    DivideModifier,
    //% block="an = machine checks its trays"
    EqualCheck,
    //% block="a < machine checks its trays"
    LessCheck,
    //% block="a > machine checks its trays"
    GreaterCheck
}

//% color=#bf693d icon="\uf1fd" block="Cake Factory" weight=90
namespace bakery {
    let handlers: (() => void)[] = []
    let chef: Sprite = null
    let packets: Sprite[] = []
    let packetOps: number[] = []
    let packetNumbers: number[] = []
    let packetManual: boolean[] = []
    let packetLanes: number[] = []
    const lanes = [54, 160, 266]
    const stations = [6, 110, 214]
    // Left/right pairs; only learner reports and explicit reset alter these.
    let quantities = [1, 2, 2, 3, 3, 4]
    let starts = [1, 2, 2, 3, 3, 4]
    let relations = [0, 0, 0]
    let signals = [-1, -1, -1]
    let jammed = [false, false, false]
    let fulfilledAt = [-1, -1, -1]
    let orderBegan = [0, 0, 0]
    let appliedAt = [-10000, -10000, -10000, -10000, -10000, -10000]
    let appliedOps = [0, 0, 0, 0, 0, 0]
    let appliedNumbers = [1, 1, 1, 1, 1, 1]
    let selectedTray = -1
    let activeTray = -1
    let activeAction = -1
    let activeOp = -1
    let activeNumber = 0
    let beforeAction = 0
    let reported = false
    let held: Sprite = null
    let heldOp = -1
    let heldNumber = 0
    let heldManual = false
    let previewValue = 0
    let previewUntil = 0
    let previewReported = false
    let started = false
    let shiftDone = false
    let stamps = 0
    let coins = 0
    let lastBonus = 0
    let bonusAt = -10000
    let roundNumber = 0
    let spawnAt = [0, 0, 0]
    let spawnRound = [0, 1, 2]
    let manualAt = 0
    let manualSide = 0
    let lastTick = 0
    let message = "Carry a modifier to either side. A: place."
    let messageUntil = 0

    // Student builds contain no instrumentation.
    function trace(reason: string) {
        // @bakery-test-trace
    }
    function tell(words: string, duration: number = 2300) {
        message = words; messageUntil = control.millis() + duration
    }
    function installed(action: number): boolean { return handlers[action] != null }
    function smallWhole(value: number): boolean {
        return value == value && Math.abs(value) < 10000 && Math.floor(value) == value
    }
    function numberText(value: number): string {
        let text = "" + value
        return text.length > 9 ? text.substr(0, 9) : text
    }
    function machineOf(tray: number): number { return Math.idiv(tray, 2) }
    function currentMachine(): number {
        return machineOf(activeTray >= 0 ? activeTray : selectedTray >= 0 ? selectedTray : 0)
    }
    function actionFor(op: number, rhs: number): BakeryAction {
        if (op == 0) return rhs == 1 ? BakeryAction.AddOne : BakeryAction.AddModifier
        if (op == 1) return rhs == 1 ? BakeryAction.RemoveOne : BakeryAction.SubtractModifier
        if (op == 2) return rhs == 2 ? BakeryAction.Double : BakeryAction.MultiplyModifier
        return rhs == 2 ? BakeryAction.Halve : BakeryAction.DivideModifier
    }
    //% blockId=bakery_on_action block="when $action" weight=100
    export function onAction(action: BakeryAction, handler: () => void) { handlers[action] = handler }
    //% blockId=bakery_tray_amount block="amount on this tray" weight=70
    export function trayAmount(): number {
        return activeTray >= 0 ? quantities[activeTray] : selectedTray >= 0 ? quantities[selectedTray] : 0
    }
    //% blockId=bakery_modifier_number block="number on the modifier" weight=65
    export function modifierNumber(): number { return activeNumber }
    //% blockId=bakery_left_amount block="cakes on the left" weight=64
    export function leftAmount(): number { return quantities[currentMachine() * 2] }
    //% blockId=bakery_right_amount block="cakes on the right" weight=63
    export function rightAmount(): number { return quantities[currentMachine() * 2 + 1] }
    //% blockId=bakery_show_check block="show check $value" weight=80
    export function showCheck(value: boolean) {
        if (activeAction < BakeryAction.EqualCheck || activeTray < 0) return
        reported = true
        // Display the learner's submitted Boolean; never substitute an answer.
        signals[currentMachine()] = value ? 1 : 0
        trace("check-reported")
    }
    //% blockId=bakery_show_tray block="show $value from this tray" weight=90
    export function showTray(value: number) {
        if (activeAction != BakeryAction.TraySelected) return
        reported = true; previewValue = value; previewReported = true
        previewUntil = control.millis() + 2100
        trace("tray-read")
    }
    //% blockId=bakery_apply_result block="put $value on this tray" weight=85
    export function applyResult(value: number) {
        if (activeTray < 0 || activeAction <= BakeryAction.TraySelected || activeAction >= BakeryAction.EqualCheck || reported) return
        reported = true
        quantities[activeTray] = value
        let valid = smallWhole(value) && value >= 0 && value <= 6
        // Nonmutating conservation observer. Never substitutes the answer.
        if (activeOp == 0) valid = valid && value - beforeAction == activeNumber
        if (activeOp == 1) valid = valid && beforeAction - value == activeNumber
        if (activeOp == 2) valid = valid && (beforeAction == 0 ? value == 0 : value / beforeAction == activeNumber)
        if (activeOp == 3) valid = valid && value * activeNumber == beforeAction
        let m = currentMachine()
        jammed[m] = jammed[m] || !valid
        if (jammed[m]) tell("Result does not match the modifier. B: reset.", 4400)
        else tell("Both sides can change. Make the statement true.")
        trace("result-applied")
    }
    function invoke(action: BakeryAction, tray: number) {
        activeAction = action; activeTray = tray; beforeAction = quantities[tray]; reported = false
        if (installed(action)) handlers[action]()
        if (!reported && action > BakeryAction.TraySelected && action < BakeryAction.EqualCheck) {
            jammed[machineOf(tray)] = true; tell("No new tray result. Reset to retry.", 4000)
        }
        trace("action-" + action)
        activeAction = -1; activeTray = -1
    }
    function checkMachine(m: number) {
        signals[m] = -1
        if (!jammed[m]) invoke(BakeryAction.EqualCheck + relations[m], m * 2)
    }
    function finishOrder(m: number) {
        checkMachine(m)
        if (signals[m] < 0) { tell("Build this machine's check to connect its gate.", 3600); return }
        if (signals[m] == 0) { tell("FALSE: change either side, then check again.", 3200); return }
        // Shipping quality control only rejects; it cannot create the learner's signal.
        let difference = quantities[m * 2] - quantities[m * 2 + 1]
        let consistent = relations[m] == 0 ? difference == 0 : relations[m] == 1 ? difference < 0 : difference > 0
        if (!consistent) { jammed[m] = true; tell("TRUE does not match these cakes. Check your code.", 4400); trace("check-mismatch"); return }
        stamps++
        lastBonus = Math.max(1, 5 - Math.idiv(control.millis() - orderBegan[m], 15000))
        coins += lastBonus; bonusAt = control.millis(); fulfilledAt[m] = bonusAt
        tell("TRUE! This factory order is complete.", 2600)
        trace("order-filled")
        if (stamps == 3) {
            shiftDone = true; clearPackets(); tell("Three orders complete! A: another round.", 100000)
            trace("shift-complete")
        }
    }
    function configureMachine(m: number) {
        let l = m + 1, r = m + 2
        if (installed(BakeryAction.Double)) { l = m + 1; r = l * 2 }
        if (installed(BakeryAction.Halve) && m == 0) { l = 2; r = 1 }
        if (installed(BakeryAction.AddModifier)) { l = m + 1; r = l == 3 ? 6 : l + 2 }
        if (installed(BakeryAction.SubtractModifier) && m == 2) { l = 3; r = 1 }
        if (installed(BakeryAction.MultiplyModifier) && m == 0) { l = 1; r = 3 }
        if (installed(BakeryAction.DivideModifier) && m == 2) { l = 3; r = 2 }
        relations[m] = m == 1 && installed(BakeryAction.LessCheck) ? 1 : m == 2 && installed(BakeryAction.GreaterCheck) ? 2 : 0
        if (relations[m] == 1) { l = 3; r = 2 }
        if (relations[m] == 2) { l = 2; r = 3 }
        if (roundNumber > 0) {
            // All starts are false and solvable with unlocked +1/-1 modifiers.
            let seed = Math.randomRange(1, 3)
            l = seed; r = seed + 1
            if (relations[m] == 1) { l = seed + 1; r = seed }
        }
        quantities[m * 2] = l; quantities[m * 2 + 1] = r
        starts[m * 2] = l; starts[m * 2 + 1] = r
        signals[m] = -1; jammed[m] = false; fulfilledAt[m] = -1; orderBegan[m] = control.millis()
        appliedAt[m * 2] = -10000; appliedAt[m * 2 + 1] = -10000
        checkMachine(m); trace("order-ready")
    }
    function removePacket(index: number, reason: string) {
        packets[index].destroy()
        packets.removeAt(index); packetOps.removeAt(index); packetNumbers.removeAt(index)
        packetManual.removeAt(index); packetLanes.removeAt(index)
        trace(reason)
    }
    function clearPackets() { while (packets.length) removePacket(packets.length - 1, "packet-cleared") }
    function discardHeld() {
        if (held != null) held.destroy()
        held = null; heldOp = -1; heldNumber = 0; heldManual = false
    }
    function startShift() {
        clearPackets(); discardHeld()
        stamps = 0; coins = 0; lastBonus = 0; shiftDone = false
        selectedTray = -1; previewUntil = 0; previewReported = false
        for (let i = 0; i < 3; i++) {
            configureMachine(i); spawnAt[i] = control.millis() + 200 + i * 600; spawnRound[i] = i
        }
        manualAt = control.millis() + 1800; manualSide = 0
        tell("Carry a modifier to either side. A: place.", 4500)
        trace("shift-started")
    }
    function nearTray(): number {
        if (chef == null || chef.y < 143) return -1
        for (let i = 0; i < 3; i++) if (Math.abs(chef.x - lanes[i]) < 50) return i * 2 + (chef.x < stations[i] + 50 ? 0 : 1)
        return -1
    }
    function eligible(tray: number): boolean {
        let v = quantities[tray], m = machineOf(tray)
        if (jammed[m] || fulfilledAt[m] >= 0) return false
        if (heldOp == 0) return v + heldNumber <= 6
        if (heldOp == 1) return v >= heldNumber
        if (heldOp == 2) return v * heldNumber <= 6
        return heldNumber > 0 && v % heldNumber == 0
    }
    function select(tray: number) {
        selectedTray = tray
        if (installed(BakeryAction.TraySelected)) invoke(BakeryAction.TraySelected, tray)
        else tell("Read this tray with its selection event.")
    }
    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        if (!started) return
        if (shiftDone) { roundNumber++; startShift(); return }
        let tray = nearTray()
        if (tray < 0) { tell("Walk down to either side of a machine."); return }
        let m = machineOf(tray)
        select(tray)
        if (fulfilledAt[m] >= 0) { tell("This factory order is already complete."); return }
        if (jammed[m]) { tell("B: drop item. Empty hands B: reset machine."); return }
        if (held == null) { finishOrder(m); return }
        if (!eligible(tray)) {
            tell(heldOp == 3 ? "Use a side that divides into whole cakes." : heldOp == 1 ? "Not enough cakes. Try the other side." : "Six cakes fit on each side. Try the other.", 3300)
            trace("application-rejected"); return
        }
        let action = actionFor(heldOp, heldNumber)
        if (!installed(action)) { tell("Build this modifier's event first.", 3500); trace("missing-handler"); return }
        // Capture destination and RHS; consume before dispatch to prevent reuse.
        activeOp = heldOp; activeNumber = heldNumber
        appliedOps[tray] = heldOp; appliedNumbers[tray] = heldNumber; appliedAt[tray] = control.millis()
        discardHeld()
        previewUntil = 0
        invoke(action, tray)
        activeOp = -1; activeNumber = 0
        checkMachine(m)
    })
    controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
        if (!started || shiftDone) return
        if (held != null) { discardHeld(); tell("Hands free. Choose another item."); trace("item-discarded"); return }
        let tray = nearTray()
        if (tray < 0) { tell("Empty hands B at a machine resets both sides."); return }
        let m = machineOf(tray)
        if (fulfilledAt[m] >= 0) { tell("This factory order is already complete."); return }
        quantities[m * 2] = starts[m * 2]; quantities[m * 2 + 1] = starts[m * 2 + 1]
        jammed[m] = false; appliedAt[m * 2] = -10000; appliedAt[m * 2 + 1] = -10000
        select(tray); checkMachine(m); tell("Both sides reset. Try another way.")
        trace("tray-reset")
    })
    function nudge(dx: number, dy: number) {
        if (!started || chef == null) return
        chef.x = Math.max(12, Math.min(308, chef.x + dx))
        chef.y = Math.max(90, Math.min(157, chef.y + dy))
    }
    controller.left.onEvent(ControllerButtonEvent.Pressed, function () { nudge(-5, 0) })
    controller.right.onEvent(ControllerButtonEvent.Pressed, function () { nudge(5, 0) })
    controller.up.onEvent(ControllerButtonEvent.Pressed, function () { nudge(0, -5) })
    controller.down.onEvent(ControllerButtonEvent.Pressed, function () { nudge(0, 5) })
    function spawn(lane: number, op: number, rhs: number, manual: boolean) {
        let p = sprites.create(manual ? bakeryArt.cupcake() : bakeryArt.modifier(op, rhs), SpriteKind.Food)
        p.setPosition(manual ? (manualSide % 2 == 0 ? 18 : 302) : lanes[lane], manual ? 137 : 37)
        p.z = 3
        packets.push(p); packetOps.push(op); packetNumbers.push(rhs); packetManual.push(manual); packetLanes.push(lane)
        if (manual) manualSide++
        trace(manual ? "manual-arrived" : "packet-dropped")
    }
    function conveyorChoice(lane: number) {
        let ops = [0], nums = [1]
        if (installed(BakeryAction.RemoveOne)) { ops.push(1); nums.push(1) }
        if (installed(BakeryAction.Double)) { ops.push(2); nums.push(2) }
        if (installed(BakeryAction.Halve)) { ops.push(3); nums.push(2) }
        if (installed(BakeryAction.AddModifier)) { ops.push(0); nums.push(2); ops.push(0); nums.push(3) }
        if (installed(BakeryAction.SubtractModifier)) { ops.push(1); nums.push(2); ops.push(1); nums.push(3) }
        if (installed(BakeryAction.MultiplyModifier)) { ops.push(2); nums.push(3) }
        if (installed(BakeryAction.DivideModifier)) { ops.push(3); nums.push(3) }
        let index = spawnRound[lane] % ops.length
        spawnRound[lane] += 3
        spawn(lane, ops[index], nums[index], false)
    }
    function updatePackets(dt: number) {
        let now = control.millis()
        for (let lane = 0; lane < 3; lane++) if (now >= spawnAt[lane]) {
            conveyorChoice(lane); spawnAt[lane] = now + 2300
        }
        if (now >= manualAt) {
            let present = false
            for (let flag of packetManual) if (flag) present = true
            if (!present) spawn(0, 0, 1, true)
            manualAt = now + 8000
        }
        for (let i = packets.length - 1; i >= 0; i--) {
            if (!packetManual[i]) packets[i].y += dt * 0.017
            if (!packetManual[i] && packets[i].y > 128) { removePacket(i, "packet-expired"); continue }
            let dx = packetManual[i] ? 14 : 31
            if (held == null && (!packetManual[i] || chef.y < 147) && Math.abs(chef.x - packets[i].x) < dx && Math.abs(chef.y - 5 - packets[i].y) < 16) {
                heldOp = packetOps[i]; heldNumber = packetNumbers[i]; heldManual = packetManual[i]
                held = sprites.create(heldManual ? bakeryArt.cupcake() : bakeryArt.modifier(heldOp, heldNumber), SpriteKind.Food)
                held.z = 20
                removePacket(i, "item-picked-up")
                previewUntil = 0
                tell("Choose LEFT or RIGHT. A: place. B: drop.")
            }
        }
    }
    function coin(p: Image, x: number, y: number, full: boolean) {
        p.fillCircle(x, y, 4, full ? 5 : 12)
        if (full) p.fillRect(x - 1, y - 2, 2, 5, 1)
    }
    function drawHud() {
        let now = control.millis(), near = nearTray()
        screen.fillRect(0, 0, 320, 19, 14)
        screen.print("CAKE FACTORY", 5, 5, 1, image.font8)
        for (let i = 0; i < 3; i++) {
            screen.drawRect(88 + i * 12, 4, 9, 10, 5)
            if (i < stamps) screen.fillRect(90 + i * 12, 6, 5, 6, 5)
        }
        coin(screen, 134, 9, true)
        screen.fillRect(142, 5, 51, 8, 8); screen.fillRect(142, 5, Math.idiv(coins * 51, 15), 8, 5)
        screen.print("A PLACE/CHECK B DROP", 202, 6, 1, image.font5)
        for (let i = 0; i < 3; i++) {
            let active = near >= 0 && machineOf(near) == i ? near % 2 : -1
            bakeryArt.machine(screen, stations[i], quantities[i * 2], quantities[i * 2 + 1], relations[i], active, signals[i], fulfilledAt[i] >= 0)
            if (jammed[i]) {
                screen.fillRect(stations[i] + 3, 218, 94, 18, 11)
                screen.print("CHECK CODE  B RESET", stations[i] + 7, 222, 1, image.font5)
                for (let side = 0; side < 2; side++) {
                    let amount = quantities[i * 2 + side]
                    if (!smallWhole(amount) || amount < 0 || amount > 6) screen.print(numberText(amount), stations[i] + 5 + side * 56, 198, 2)
                }
            }
        }
        if (now < messageUntil) {
            screen.fillRect(0, 19, 320, 11, 13)
            screen.print(message, 3, 21, 14, image.font5)
        }
        if (previewReported && now < previewUntil && held == null) {
            let x = Math.max(2, Math.min(260, chef.x - 30)), y = chef.y - 49
            screen.fillRect(x, y, 60, 30, 1); screen.drawRect(x, y, 60, 30, 2)
            if (smallWhole(previewValue) && previewValue >= 0 && previewValue <= 6) bakeryArt.goods(screen, previewValue, x + 12, y + 4, 1)
            else screen.print(numberText(previewValue), x + 3, y + 11, 2)
        }
        if (now - bonusAt < 1600 && !shiftDone) for (let i = 0; i < 5; i++) coin(screen, 145 + i * 10, 9, i < lastBonus)
        if (shiftDone) {
            screen.fillRect(34, 42, 252, 122, 14); screen.fillRect(37, 45, 246, 116, 1)
            screen.printCenter("THREE TRUE ORDERS!", 56, 14)
            for (let i = 0; i < 3; i++) { screen.fillRect(108 + i * 34, 74, 27, 23, 7); screen.drawTransparentImage(bakeryArt.cupcake(), 116 + i * 34, 80) }
            for (let i = 0; i < 15; i++) coin(screen, 96 + (i % 10) * 14, 108 + Math.idiv(i, 10) * 12, i < coins)
            screen.printCenter("A: another factory round", 145, 14)
        }
    }
    game.onUpdate(function () {
        if (!started) return
        let now = control.millis(), dt = Math.min(80, now - lastTick)
        lastTick = now
        bakeryArt.conveyorTreads(scene.backgroundImage(), Math.idiv(now * 17, 1000))
        chef.x = Math.max(12, Math.min(308, chef.x)); chef.y = Math.max(90, Math.min(157, chef.y))
        chef.setImage(bakeryArt.chef(Math.abs(chef.vx) + Math.abs(chef.vy) > 1 ? Math.idiv(now, 130) % 3 : 0))
        if (!shiftDone) updatePackets(dt)
        if (held != null) held.setPosition(Math.max(33, Math.min(287, chef.x)), chef.y - 25)
    })
    game.onShade(function () { if (started) drawHud() })
    control.runInParallel(function () {
        pause(100)
        bakeryArt.installPalette()
        scene.setBackgroundImage(bakeryArt.drawBackground())
        chef = sprites.create(bakeryArt.chef(), SpriteKind.Player)
        chef.setPosition(160, 146); chef.z = 10
        controller.moveSprite(chef, 100, 100)
        lastTick = control.millis(); started = true; startShift()
        trace("world-ready")
    })
}
```
