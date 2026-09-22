# Cake Factory

### @explicitHints true

## Welcome to the cake factory!

Build the factory one useful capability at a time. The supplied ``||bakery(noclick):Cake Factory||`` drawer provides events and displays; your code will remember numbers, change them, and check orders.

## 1. Show the batch

Make ``||variables(noclick):batch||``. The startup code sets it to `2` and shows that value at the batch dispenser beside the pot.

### Find these blocks

In ``||variables(noclick):Variables||``, choose **Make a Variable** and name it ``||variables(noclick):batch||``. Find the ``||loops(noclick):on start||`` block in ``||loops(noclick):Loops||``, ``||variables(noclick):set batch to||`` in ``||variables(noclick):Variables||``, and **show** in ``||bakery(noclick):Cake Factory||``.

![Native menu blocks for batch and the startup display](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/01-menu.svg)

### Make your code look like this

![Set batch to two and show batch at startup](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/01-assembled.svg)

### What you should see

When the game starts, the batch dispenser shows `2`. The pot is ready for the first modifier.

![The batch dispenser shows two at startup](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/01-show-batch.gif)

#### ~ tutorialhint

```blocks
let batch = 2

bakery.showTray(batch)
```

## 2. Start the belt

Add to the existing ``||loops(noclick):on start||`` stack the ``||bakery(noclick):set conveyor belt on [true]||`` block. The middle belt begins with a `+ 1` item and one `3 = □` order appears.

### Find these blocks

In ``||bakery(noclick):Cake Factory||``, find **set conveyor belt on [true]**. The Boolean dropdown can be `true` to run the belt or `false` to stop it.

![Native menu blocks for enabling the conveyor](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/02-menu.svg)

### Make your code look like this

![Enable the conveyor at startup](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/02-assembled.svg)

### What you should see

The middle belt moves and brings `+ 1`. The first order asks for a number equal to `3`.

![The middle belt starts with one plus-one modifier and a three equals blank order](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/02-start-belt.gif)

#### ~ tutorialhint

```blocks
let batch = 2

bakery.showTray(batch)

bakery.setConveyor(true)
```

## 3. Add one

With empty hands, use the arrow keys to move near an item. Press and release **A** to pick it up; press and release **A** again while facing the pot to throw it.

### Find these blocks

Add **a + 1 item hits the mixer** from ``||bakery(noclick):Cake Factory||``. Find **amount in the mixer** and **put [batch] in the mixer** in that drawer, ``||variables(noclick):batch||`` in ``||variables(noclick):Variables||``, and Math `+` in ``||math(noclick):Math||``.

![Native menu blocks for the first arithmetic event](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/03-menu.svg)

### Make your code look like this

![Read batch, add one, save it, and put it in the mixer](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/03-assembled.svg)

### What you should see

Pick up `+ 1`, throw it into the pot, and watch `2` become `3`. The mixer keeps the new amount.

![Picking up and throwing plus one changes two to three](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/03-add-one.gif)

#### ~ tutorialhint

```blocks
let batch = 0

bakery.onAction(BakeryAction.AddOne, function () {
    batch = bakery.trayAmount()
    batch = batch + 1
    bakery.applyResult(batch)
})
```

## 4. Check equality

Connect the first order check. A Boolean is ``||logic(noclick):true||`` or ``||logic(noclick):false||``. Use the order target on the left and delivered number on the right.

### Find these blocks

Use **Make a Variable** for ``||variables(noclick):orderTarget||``, ``||variables(noclick):deliveredNumber||``, and ``||variables(noclick):ready||``. Add **an equal to (=) order checks a number**.

![Native menu blocks for the first equality check](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/04-menu.svg)

### Make your code look like this

![Read both values, save equality in ready, and show the check](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/04-assembled.svg)

### What you should see

At the dispenser, press **A** to pick up a copy of batch; face the order and press **A** to throw it. Deliver `3` to `3 = □`. The order checks automatically when the number lands.

![Delivering three completes the first equality check](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/04-equal-check.gif)

#### ~ tutorialhint

```blocks
let deliveredNumber = 0
let orderTarget = 0
let ready = false

bakery.onAction(BakeryAction.EqualCheck, function () {
    orderTarget = bakery.leftAmount()
    deliveredNumber = bakery.rightAmount()
    ready = orderTarget == deliveredNumber
    bakery.showCheck(ready)
})
```

## 5. Take one away

Duplicate your step 3 addition event and keep the original. Change the event and operator in the duplicate as shown.

![Copy step 3's addition event and change it to subtraction](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/05-adapt.svg)

### What you should see

Starting from `2`, throw `- 1`; the mixer becomes `1` for the equality target `1`.

![Subtracting one changes two to one](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/05-subtract-one.gif)

#### ~ tutorialhint

```blocks
let batch = 0

bakery.onAction(BakeryAction.RemoveOne, function () {
    batch = bakery.trayAmount()
    batch = batch - 1
    bakery.applyResult(batch)
})
```

## 6. Check greater than

Duplicate your step 4 equality event and keep the original. Change the event and comparison as shown.

![Copy step 4's equality event and change it to greater than](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/06-adapt.svg)

### What you should see

The target is `2`. Starting from `2`, subtract one and deliver `1` so `2 > 1` checks true.

![A greater-than order checks the delivered number](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/06-greater-check.gif)

#### ~ tutorialhint

```blocks
let deliveredNumber = 0
let orderTarget = 0
let ready = false

bakery.onAction(BakeryAction.GreaterCheck, function () {
    orderTarget = bakery.leftAmount()
    deliveredNumber = bakery.rightAmount()
    ready = orderTarget > deliveredNumber
    bakery.showCheck(ready)
})
```

## 7. Double the batch

Add a multiplication event. Read the current batch, multiply by `2`, save the result, and put it in the mixer.

![Native menu blocks for doubling the batch](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/07-menu.svg)

### Make your code look like this

![Multiply batch by two and put the result in the mixer](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/07-assembled.svg)

### What you should see

Starting from `2`, throw `× 2` to make `4` for the equality order.

![Doubling the batch makes four](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/07-double.gif)

#### ~ tutorialhint

```blocks
let batch = 0

bakery.onAction(BakeryAction.Double, function () {
    batch = bakery.trayAmount()
    batch = batch * 2
    bakery.applyResult(batch)
})
```

## 8. Check less than

Duplicate your step 6 greater-than event and keep the original. Change the event and comparison as shown.

![Copy step 6's greater-than event and change it to less than](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/08-adapt.svg)

### What you should see

The target is `3`. Starting from `2`, double to `4`, deliver it, and let `3 < 4` check.

![A less-than order checks the delivered number](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/08-less-check.gif)

#### ~ tutorialhint

```blocks
let deliveredNumber = 0
let orderTarget = 0
let ready = false

bakery.onAction(BakeryAction.LessCheck, function () {
    orderTarget = bakery.leftAmount()
    deliveredNumber = bakery.rightAmount()
    ready = orderTarget < deliveredNumber
    bakery.showCheck(ready)
})
```

## 9. Halve the batch

Add division by `2` using the current batch, then put the result in the mixer. This factory keeps whole-number results.

![Native menu blocks for halving the batch](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/09-menu.svg)

### Make your code look like this

![Divide batch by two and put the result in the mixer](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/09-assembled.svg)

### What you should see

Starting from `2`, throw `/ 2` to make `1` for the equality order.

![Halving two makes one](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/09-halve.gif)

#### ~ tutorialhint

```blocks
let batch = 0

bakery.onAction(BakeryAction.Halve, function () {
    batch = bakery.trayAmount()
    batch = batch / 2
    bakery.applyResult(batch)
})
```

## 10. Add the modifier's number

Create ``||variables(noclick):modifierNumber||``. Read the number printed on the modifier, add it to ``||variables(noclick):batch||``, save the result, and put it in the mixer.

![Native menu blocks for the printed modifier number](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/10-menu.svg)

### Make your code look like this

![Read batch and modifierNumber, add them, and put batch in the mixer](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/10-assembled.svg)

### What you should see

The left belt now offers printed-number modifiers. Starting from `2`, a `+ 2` modifier makes `4` for the equality order.

![Adding the modifier's number changes the batch](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/10-add-modifier.gif)

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

## 11. Subtract the modifier's number

Duplicate your step 10 printed-number event and keep the original. Change the event and operator as shown.

![Copy step 10's printed-number event and change it to subtraction](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/11-adapt.svg)

### What you should see

Starting from `2`, use `- 2` to make `0` for the equality target `0`.

![Subtracting a printed modifier number](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/11-subtract-modifier.gif)

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

## 12. Multiply by the modifier's number

Duplicate your step 10 printed-number event and keep the original. Change the event and operator as shown.

![Copy step 10's printed-number event and change it to multiplication](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/12-adapt.svg)

### What you should see

Starting from `2`, use `× 3` to make `6` for the equality order.

![Multiplying by a printed modifier number](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/12-multiply-modifier.gif)

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

## 13. Divide by the modifier's number

Duplicate your step 10 printed-number event and keep the original. Change the event and operator as shown.

![Copy step 10's printed-number event and change it to division](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/13-adapt.svg)

### What you should see

Starting from `2`, use `× 3` to make `6`, then `/ 3` to make `2` for the equality target `2`.

![Dividing by a printed modifier number](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/13-divide-modifier.gif)

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

## 14. Include equality below

Duplicate your step 8 less-than event and keep the original. Change the event and comparison as shown.

![Copy step 8's less-than event and change it to less-than-or-equal](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/14-adapt.svg)

### What you should see

The target is `2`; `2 ≤ 2` is true because equality counts.

![A less-than-or-equal order accepts equality](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/14-less-equal-check.gif)

#### ~ tutorialhint

```blocks
let deliveredNumber = 0
let orderTarget = 0
let ready = false

bakery.onAction(BakeryAction.LessEqualCheck, function () {
    orderTarget = bakery.leftAmount()
    deliveredNumber = bakery.rightAmount()
    ready = orderTarget <= deliveredNumber
    bakery.showCheck(ready)
})
```

## 15. Include equality above

Duplicate your step 6 greater-than event and keep the original. Change the event and comparison as shown.

![Copy step 6's greater-than event and change it to greater-than-or-equal](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/15-adapt.svg)

### What you should see

The target is `2`; `2 ≥ 2` is true because equality counts in the other direction.

![A greater-than-or-equal order accepts equality](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/15-greater-equal-check.gif)

#### ~ tutorialhint

```blocks
let deliveredNumber = 0
let orderTarget = 0
let ready = false

bakery.onAction(BakeryAction.GreaterEqualCheck, function () {
    orderTarget = bakery.leftAmount()
    deliveredNumber = bakery.rightAmount()
    ready = orderTarget >= deliveredNumber
    bakery.showCheck(ready)
})
```

## 16. Set the batch directly

Add **a set 2 cake hits the mixer**. The numbered cake `2` uses direct assignment: set ``||variables(noclick):batch||`` to literal `2`, then use **put [batch] in the mixer** with ``||variables(noclick):batch||``.

![Native menu blocks for direct batch assignment](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/16-menu.svg)

### Make your code look like this

![Set batch to the literal two and put batch in the mixer](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/instructions/16-assembled.svg)

### What you should see

The numbered cake replaces the batch with `2`. All three orders and the full learned set are now available.

![Setting the batch directly with numbered cake two](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/16-set-batch.gif)

#### ~ tutorialhint

```blocks
let batch = 0

bakery.onAction(BakeryAction.SetBatch, function () {
    batch = 2
    bakery.applyResult(batch)
})
```

## 17. Finish three orders

Fill all three orders using the arithmetic and comparisons you built. Automatic delivery checks each number as it lands.

### What you should see

The first complete three-order round unlocks the side ingredient stations.

![Three orders are completed in one round](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/17-three-orders.gif)

## 18. Use station variables

Throw a copied number at an ingredient station, then solve an order that uses that station's icon. The supplied station variables stay separate from your ``||variables(noclick):batch||``.

### What you should see

The station operator changes every 12 seconds. The order can show `3 + [icon]`; use the icon's current value and check the order. The demo shows the station value changing before the later check.

![Ingredient stations change and feed a later order](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/18-variable-stations.gif)

## 19. Reuse the batch

Fill one order, then use the amount still in the mixer to make a number for another order. The mixer keeps its amount when you deliver a copy.

### What you should see

Your next modifier starts from the amount that remains in the mixer.

![A copied batch is delivered while the mixer value is reused](https://raw.githubusercontent.com/mrbrackebusch-code/bakery-shift/main/assets/24d18ee149d5daa8/demos/19-reuse-batch.gif)

```template
// Cake Factory

```

```customts
// Native V9 supplied-world pixel sprites. No learner logic or arithmetic lives here.
namespace bakeryIcons {
    function rounded(p: Image, x: number, y: number, w: number, h: number, color: number) {
        p.fillRect(x + 2, y, w - 4, h, color)
        p.fillRect(x, y + 2, w, h - 4, color)
    }

    export function ingredient(id: number): Image {
        let p = image.create(18, 18)
        if (id == 0) {
            // Strawberry: red berry, leafy green crown, dark outline, pale highlight.
            p.fillCircle(9, 10, 7, 15); p.fillCircle(9, 10, 6, 2)
            p.fillRect(5, 3, 8, 3, 15); p.fillRect(4, 4, 10, 2, 6)
            p.fillRect(7, 2, 2, 3, 6); p.fillRect(11, 2, 2, 3, 6)
            p.setPixel(6, 8, 1); p.setPixel(11, 11, 1)
        } else if (id == 1) {
            // Cocoa: square dark-brown block with a cream split and highlight.
            p.fillRect(3, 4, 12, 11, 15); p.fillRect(4, 5, 10, 9, 14)
            p.fillRect(8, 5, 2, 9, 13); p.fillRect(5, 7, 2, 2, 13)
            p.setPixel(5, 6, 1); p.setPixel(11, 11, 13)
        } else if (id == 2) {
            // Cream: handled bottle with a pale body and gold cap/band.
            p.fillRect(7, 2, 4, 3, 15); p.fillRect(8, 1, 2, 2, 5)
            p.fillRect(4, 5, 10, 10, 15); p.fillRect(5, 6, 8, 8, 1)
            p.fillRect(5, 11, 8, 3, 5); p.setPixel(7, 8, 15); p.setPixel(8, 7, 15)
        } else {
            // Mint: teal leaf with two pointed lobes and a light central vein.
            p.fillRect(8, 5, 3, 10, 15); p.fillRect(4, 7, 10, 7, 15)
            p.fillRect(5, 8, 8, 5, 6); p.fillRect(8, 6, 2, 7, 12)
            p.setPixel(4, 6, 12); p.setPixel(13, 7, 12); p.fillRect(7, 14, 4, 2, 6)
        }
        return p
    }

    export function carriedNumber(value: number): Image {
        let p = image.create(40, 38)
        rounded(p, 3, 2, 34, 29, 15)
        p.fillRect(5, 4, 30, 23, 13)
        p.fillRect(1, 10, 4, 11, 14); p.fillRect(35, 10, 4, 11, 14)
        p.fillRect(2, 13, 2, 5, 5); p.fillRect(36, 13, 2, 5, 5)
        p.fillRect(10, 0, 20, 4, 5); p.fillRect(13, 0, 14, 2, 14)
        let text = "" + value
        if (text.length <= 2) {
            let temp = image.create(text.length * 6 + 2, 8)
            temp.print(text, 0, 0, 15, image.font8)
            let left = 20 - text.length * 6
            for (let y = 0; y < 8; y++) for (let x = 0; x < temp.width; x++) if (temp.getPixel(x, y) != 0) p.fillRect(left + x * 2, 7 + y * 2, 2, 2, 15)
        } else {
            if (text.length > 6) text = text.substr(0, 4) + ".."
            let font = text.length > 4 ? image.font5 : image.font8
            p.print(text, 20 - Math.idiv(text.length * font.charWidth, 2), 8, 15, font)
        }
        rounded(p, 7, 29, 26, 8, 2)
        p.print("batch", 10, 30, 1, image.font5)
        return p
    }

    export function chef(frame: number = 0, carrying: boolean = false): Image {
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
            . . 7 7 1 6 6 6 6 6 1 7 7 . .
            . . 7 7 1 6 6 6 6 6 1 7 7 . .
            . . . . 6 6 6 6 6 6 6 6 . . . .
            . . . . 6 6 6 6 6 6 6 6 . . . .
            . . . . 6 6 c c 6 6 6 6 . . . .
            . . . . 6 6 c c 6 6 6 6 . . . .
            . . . . f f . . f f . . . . . .
            . . . f f f . . f f f . . . . .
            . . . f f f . . . f f f . . . .
        `
        if (carrying) {
            p.fillRect(1, 4, 3, 5, 15); p.fillRect(2, 5, 2, 3, 1)
            p.fillRect(12, 4, 3, 5, 15); p.fillRect(12, 5, 2, 3, 1)
            p.fillRect(3, 8, 3, 4, 6); p.fillRect(10, 8, 3, 4, 6)
            p.setPixel(5, 10, 15); p.setPixel(10, 10, 15)
        }
        if (frame == 1) { p.setPixel(3, 21, 0); p.setPixel(6, 21, 15) }
        if (frame == 2) { p.setPixel(11, 21, 0); p.setPixel(8, 21, 15) }
        return p.doubled()
    }

    export function upperConfectionShelves(p: Image) {
        // Compact display shelves occupy the two upper side gaps around the belts.
        for (let side = 0; side < 2; side++) {
            let x = side == 0 ? 4 : 552
            p.fillRect(x + 4, 154, 80, 3, 14)
            p.fillRect(x + 7, 157, 74, 24, 8)
            p.fillRect(x + 2, 181, 82, 3, 5)
            p.fillRect(x + 8, 184, 72, 22, 12)
            p.fillRect(x + 4, 206, 80, 3, 14)
            p.fillRect(x + 12, 209, 66, 2, 8)
            p.fillRect(x + 11, 159, 3, 20, 5)
            p.fillRect(x + 48, 159, 3, 20, 5)
            p.fillRect(x + 76, 159, 3, 20, 5)
            let cake1 = bakeryArt.looseCake()
            let cake2 = bakeryArt.looseCake()
            p.drawTransparentImage(cake1, x + 15, 159)
            p.drawTransparentImage(cake2, x + 53, 159)
            let cake3 = bakeryArt.looseCake()
            p.drawTransparentImage(cake3, x + 30, 184)
            if (side == 0) {
                // The plate at the shelf edge is reserved for a manually placed cake.
                p.fillRect(71, 208, 27, 2, 14)
                p.fillRect(75, 210, 20, 2, 5)
            }
        }
    }

    export function conveyorChutes(p: Image) {
        let centers = [165, 320, 475]
        for (let i = 0; i < centers.length; i++) {
            let cx = centers[i]
            p.fillRect(cx - 65, 190, 130, 17, 14)
            p.fillRect(cx - 61, 191, 122, 14, 8)
            p.fillRect(cx - 57, 192, 114, 11, 15)
            p.fillRect(cx - 57, 203, 114, 2, 5)
            p.setPixel(cx - 52, 194, 5)
            p.setPixel(cx + 51, 194, 5)
        }
    }
}

// Native pixel artwork for the Cake Factory world. No learner calculations.
namespace bakeryArt {
    let small = image.doubledFont(image.font5)
    let large = image.doubledFont(image.font8)
    let bowl: Image = null
    export function installPalette() {
        image.setPalette(hex`000000 FFFFFF EC3B59 45AAF2 D98B46 F6C85F 479AA4 E7AD82 294E5A 3480B6 A55EEA 7C47B0 BFBFBF F4E6CE 6E4638 243139`)
    }
    function round(p: Image, x: number, y: number, w: number, h: number, c: number) {
        p.fillRect(x + 3, y, w - 6, h, c); p.fillRect(x, y + 3, w, h - 6, c)
        p.fillRect(x + 1, y + 1, w - 2, h - 2, c)
    }
    function oval(p: Image, x: number, y: number, rx: number, ry: number, color: number) {
        for (let row = -ry; row <= ry; row++) {
            let half = Math.floor(rx * Math.sqrt(Math.max(0, 1 - row * row / (ry * ry))))
            p.fillRect(x - half, y + row, half * 2 + 1, 1, color)
        }
    }
    function bolt(p: Image, x: number, y: number) { p.fillCircle(x, y, 3, 15); p.fillCircle(x, y - 1, 2, 12); p.setPixel(x - 1, y - 2, 1) }
    function hexagon(p: Image, x: number, y: number, w: number, h: number, color: number) {
        let tip = Math.idiv(h, 2)
        // Explicit scan lines preserve the true Boolean reporter silhouette.
        for (let row = 0; row < h; row++) {
            let inset = Math.abs(Math.idiv(h, 2) - row)
            p.fillRect(x + inset, y + row, w - inset * 2, 1, color)
        }
    }
    function number(p: Image, n: number, cx: number, y: number, color: number, big: boolean = true) {
        let text = "" + n
        if (text.length > 6) text = text.substr(0, 6)
        let font = big && text.length <= 2 ? large : image.font8
        p.print(text, cx - Math.idiv(text.length * font.charWidth, 2), y, color, font)
    }
    export function variableTray(p: Image, x: number, y: number) {
        p.fillRect(x, y, 14, 2, 1); p.fillRect(x + 1, y + 2, 12, 5, 1)
        p.fillRect(x + 3, y + 7, 8, 2, 12); p.fillRect(x + 3, y + 2, 8, 3, 7)
    }
    export function operator(p: Image, op: number, x: number, y: number, color: number, scale: number = 1) {
        if (op == 0) { p.fillRect(x, y + 2 * scale, 5 * scale, scale, color); p.fillRect(x + 2 * scale, y, scale, 5 * scale, color) }
        if (op == 1) p.fillRect(x, y + 2 * scale, 5 * scale, scale, color)
        if (op == 2) for (let i = 0; i < 5; i++) { p.fillRect(x + i * scale, y + i * scale, scale, scale, color); p.fillRect(x + (4 - i) * scale, y + i * scale, scale, scale, color) }
        if (op == 3) for (let i = 0; i < 5; i++) p.fillRect(x + (4 - i) * scale, y + i * scale, scale, scale, color)
    }
    export function modifier(op: number, rhs: number): Image {
        let p = image.create(112, 24)
        round(p, 0, 0, 112, 24, 15); round(p, 1, 0, 110, 22, 2)
        p.print("set", 4, 7, 1, image.font8); variableTray(p, 25, 6); p.print("to", 43, 7, 1, image.font8)
        round(p, 58, 3, 50, 17, 11); round(p, 59, 3, 48, 15, 10)
        round(p, 61, 5, 18, 12, 2); variableTray(p, 63, 6)
        operator(p, op, 82, 8, 1); round(p, 93, 5, 12, 12, 13); p.print("" + rhs, 96, 7, 15, image.font8)
        return p
    }
    export function looseCake(): Image {
        let p = image.create(26, 26)
        oval(p, 13, 22, 12, 3, 15); round(p, 6, 12, 16, 10, 14); p.fillRect(7, 14, 14, 6, 5)
        p.fillRect(9, 15, 2, 5, 4); p.fillRect(17, 15, 2, 5, 4)
        oval(p, 13, 11, 12, 7, 7); oval(p, 13, 8, 9, 5, 1); p.fillCircle(14, 4, 3, 2); p.setPixel(13, 3, 1)
        return p
    }
    export function chef(frame: number = 0, carrying: boolean = false): Image { return bakeryIcons.chef(frame, carrying) }
    export function numericOutput(value: number): Image { return bakeryIcons.carriedNumber(value) }
    export function resetCake(value: number): Image {
        let p = image.create(34, 34)
        p.drawTransparentImage(looseCake(), 4, 0)
        number(p, value, 17, 7, 15)
        round(p, 7, 27, 20, 7, 2)
        p.print("set", 11, 28, 1, image.font5)
        return p
    }
    export function shadow(): Image { let p = image.create(28, 10); oval(p, 14, 5, 13, 4, 12); return p }
    export function drawBackground(): Image {
        let p = image.create(640, 480); p.fill(13)
        // Warm tiled floor with sparse seams. Details stay behind playable objects.
        for (let y = 184; y < 408; y += 32) {
            p.drawLine(76, y, 564, y, 1)
            for (let x = 80 + (Math.idiv(y, 32) % 2) * 32; x < 560; x += 64) p.drawLine(x, y, x, y + 31, 1)
        }
        p.fillRect(0, 42, 640, 132, 8); p.fillRect(0, 174, 640, 10, 14); p.fillRect(0, 174, 640, 3, 7)
        // Wall panels, copper pipes, pressure dials, and flour storage.
        for (let x of [16, 210, 402, 610]) {
            p.fillRect(x, 54, 8, 100, 14); p.fillRect(x + 1, 54, 3, 100, 4)
            for (let y of [70, 144]) { p.fillRect(x - 3, y, 14, 4, 12); bolt(p, x + 4, y + 2) }
        }
        for (let x of [217, 409]) {
            round(p, x, 80, 28, 58, 15); round(p, x + 2, 80, 24, 54, 6)
            p.fillCircle(x + 14, 97, 9, 13); p.drawLine(x + 14, 97, x + 19, 92, 2); bolt(p, x + 7, 127)
            p.fillRect(x + 17, 119, 4, 12, 5)
        }
        for (let c of [96, 320, 544]) {
            round(p, c - 64, 45, 128, 38, 15); round(p, c - 61, 45, 122, 32, 6)
            p.fillRect(c - 50, 53, 100, 13, 8); p.fillRect(c - 45, 55, 90, 2, 15)
            for (let x of [c - 55, c + 55]) bolt(p, x, 52)
            p.fillCircle(c + 52, 68, 3, 5)
        }
        // Low side walls and recessed variable-counter bays.
        p.fillRect(0, 184, 76, 224, 14); p.fillRect(564, 184, 76, 224, 14)
        p.fillRect(71, 184, 5, 224, 7); p.fillRect(564, 184, 5, 224, 7)
        for (let y of [194, 289, 387]) {
            for (let x of [8, 574]) { round(p, x, y, 58, 12, 4); p.fillRect(x + 5, y + 3, 46, 2, 7) }
        }
        // Floor wayfinding: feeds, mixer, output and comparison dock each have an accent.
        for (let x of [165, 320, 475]) { p.fillRect(x - 11, 199, 22, 3, 12); p.fillRect(x - 7, 204, 14, 2, 12) }
        for (let x of [284, 296, 344, 356]) p.fillRect(x, 345, 5, 2, 7)
        // Small bakery landmarks: flour sack, stacked trays and a wheeled rack.
        round(p, 111, 278, 35, 46, 7); round(p, 113, 276, 31, 43, 13)
        p.fillRect(120, 280, 17, 3, 14); p.drawLine(116, 289, 139, 289, 4)
        p.fillCircle(129, 305, 8, 5); p.drawLine(129, 299, 129, 312, 14)
        for (let i = 0; i < 3; i++) { p.fillRect(493 + i * 2, 273 - i * 5, 30, 5, 8); p.fillRect(495 + i * 2, 273 - i * 5, 26, 2, 12) }
        bakeryIcons.upperConfectionShelves(p)
        // Dock foundation visually anchors the Boolean blocks.
        p.fillRect(0, 404, 640, 76, 15); p.fillRect(0, 404, 640, 4, 4)
        for (let x = 4; x < 640; x += 16) p.drawLine(x, 404, x + 5, 408, 5)
        conveyorTreads(p, 0, 0)
        return p
    }
    export function conveyorTreads(p: Image, offset: number, runningMask: number = 7) {
        let lane = 0
        for (let y = 70; y <= 187; y++) {
            let drift = (y - 70) * 0.59
            for (let c of [96 + drift, 320, 544 - drift]) {
                let x = Math.floor(c)
                let laneOffset = (runningMask & (1 << lane)) != 0 ? offset : 0
                p.fillRect(x - 63, y, 126, 1, 15); p.fillRect(x - 60, y, 120, 1, 12); p.fillRect(x - 54, y, 108, 1, 8)
                p.fillRect(x - 59, y, 2, 1, 1); p.fillRect(x + 57, y, 2, 1, 6)
                if ((y - laneOffset + 10000) % 18 < 3) p.fillRect(x - 52, y, 104, 1, 6)
                if (y % 24 < 3) { p.fillRect(x - 62, y, 5, 1, 14); p.fillRect(x + 58, y, 5, 1, 14) }
                lane++
            }
            lane = 0
        }
        for (let c of [165, 320, 475]) {
            round(p, c - 66, 186, 132, 12, 15); round(p, c - 62, 186, 124, 8, 12)
            for (let x = c - 52; x < c + 56; x += 13) p.fillRect(x, 187, 4, 6, 8)
            p.fillCircle(c - 62, 190, 4, 4); p.fillCircle(c + 62, 190, 4, 4)
        }
        bakeryIcons.conveyorChutes(p)
    }
    export function mixer(p: Image, value: number, active: boolean, jammed: boolean, tick: number = 0) {
        if (!bowl) {
            bowl = image.create(180, 148)
            oval(bowl, 90, 128, 82, 17, 12)
            // Pedestal, rounded copper body, then a broad open elliptical rim.
            round(bowl, 57, 103, 67, 30, 14); round(bowl, 61, 103, 59, 25, 6)
            bowl.fillRect(70, 126, 40, 4, 8)
            oval(bowl, 90, 94, 69, 29, 14); bowl.fillRect(20, 54, 140, 39, 14)
            oval(bowl, 90, 88, 65, 29, 4); bowl.fillRect(25, 56, 130, 32, 4)
            bowl.fillRect(31, 67, 7, 26, 7); bowl.fillRect(40, 93, 8, 8, 7)
            round(bowl, 4, 60, 24, 16, 15); round(bowl, 7, 61, 20, 10, 12)
            round(bowl, 152, 60, 24, 16, 15); round(bowl, 152, 61, 20, 10, 12)
            oval(bowl, 90, 55, 74, 34, 15); oval(bowl, 90, 52, 73, 33, 12)
            oval(bowl, 90, 50, 67, 28, 1); oval(bowl, 90, 52, 59, 23, 14)
            oval(bowl, 90, 55, 57, 21, 7); oval(bowl, 90, 55, 48, 16, 5)
            bowl.drawLine(47, 43, 69, 35, 1); bowl.drawLine(48, 44, 69, 36, 1)
            round(bowl, 67, 92, 47, 25, 8); round(bowl, 70, 94, 41, 20, 13)
            bolt(bowl, 61, 104); bolt(bowl, 121, 104)
        }
        p.drawTransparentImage(bowl, 230, 188)
        let spin = tick % 4
        p.drawLine(304 - spin * 3, 239, 326, 234 + spin, 4); p.drawLine(329, 248, 343 + spin, 244, 4)
        if (active) { p.drawCircle(251, 249, 4, 5); p.drawCircle(389, 249, 4, 5) }
        p.fillCircle(368, 296, 4, jammed ? 2 : 6)
    }
    export function outputStand(p: Image, value: number, ready: boolean, revealed: boolean = true) {
        // A short real chute connects the bowl to a numbered-output dispenser.
        p.fillRect(397, 285, 50, 12, 14); p.fillRect(397, 285, 50, 7, 12)
        for (let x = 402; x < 445; x += 9) p.fillRect(x, 287, 3, 4, 8)
        oval(p, 454, 351, 29, 7, 12)
        round(p, 427, 299, 54, 45, 15); round(p, 430, 297, 48, 42, 6)
        p.fillRect(435, 315, 38, 19, 8); p.fillRect(435, 300, 38, 3, 12)
        if (revealed) {
            p.drawTransparentImage(numericOutput(value), 434, 308)
            p.fillCircle(475, 307, 3, ready ? 5 : 12)
        }
        p.drawLine(440, 354, 447, 360, 6); p.drawLine(447, 360, 454, 354, 6)
    }
    export function sideStation(p: Image, id: number, value: number, op: number, unlocked: boolean, pulse: number, now: number) {
        let left = id < 2, x = left ? -7 : 555, y = id % 2 == 0 ? 215 : 311
        let accent = [2, 4, 5, 6][id]
        oval(p, x + 47, y + 64, 48, 8, 12)
        round(p, x, y + 7, 92, 57, 15); round(p, x + 3, y + 9, 86, 51, 14)
        p.fillRect(x + 5, y + 12, 82, 9, accent); p.fillRect(x + 8, y + 25, 76, 32, 8)
        round(p, x - 2, y, 96, 13, 12); p.fillRect(x + 2, y, 88, 4, 1)
        if (unlocked) {
            p.drawTransparentImage(bakeryIcons.ingredient(id), x + 12, y + 30)
            number(p, value, x + 49, y + 30, 13)
            round(p, x + 65, y + 29, 17, 17, 11); operator(p, op, x + 68, y + 32, 1, 2)
            p.fillRect(x + 12, y + 52, Math.idiv((12000 - now % 12000) * 67, 12000), 2, accent)
        }
        if (pulse > 0) p.drawRect(x + 5, y + 22, 82, 36, 5)
    }
    function comparison(p: Image, relation: number, x: number, y: number, color: number) {
        if (relation == 0) { p.fillRect(x, y + 4, 18, 3, color); p.fillRect(x, y + 12, 18, 3, color) }
        else {
            let direction = relation == 1 || relation == 3 ? 1 : -1
            for (let i = 0; i < 9; i++) { p.fillRect(x + 9 + direction * i, y + 8 - i, 2, 2, color); p.fillRect(x + 9 + direction * i, y + 8 + i, 2, 2, color) }
            if (relation >= 3) p.fillRect(x, y + 21, 19, 2, color)
        }
    }
    let statementCards: Image[] = []
    let resultCard: Image = null
    function drawStatement(p: Image, value: number, target: number, relation: number, stage: number, variable: number, base: number) {
        let x = 0, y = 0
        p.fill(0); hexagon(p, 0, 0, 200, 44, 9); hexagon(p, 2, 2, 196, 40, 3)
        // Fully rounded sockets sit inside the native Logic-shaped reporter.
        let leftW = variable >= 0 ? 84 : 53
        capsule(p, x + 24, y + 7, leftW + 2, 30, variable >= 0 ? 11 : 12)
        capsule(p, x + 25, y + 8, leftW, 28, variable >= 0 ? 10 : 1)
        if (stage == 0) p.drawRect(x + 24, y + 7, leftW + 2, 30, 5)
        if (variable < 0) number(p, target, x + 25 + Math.idiv(leftW, 2), y + 14, 15)
        else {
            capsule(p, x + 28, y + 12, 22, 20, 12)
            capsule(p, x + 29, y + 13, 20, 18, 1)
            number(p, base, x + 39, y + 14, 15)
            operator(p, 0, x + 52, y + 18, 1)
            capsule(p, x + 62, y + 12, 40, 20, 2)
            p.drawTransparentImage(bakeryIcons.ingredient(variable), x + 73, y + 13)
        }
        let symbolX = x + 110
        round(p, symbolX, y + 8, 34, 28, 9)
        round(p, symbolX + 2, y + 10, 30, 24, 3)
        comparison(p, relation, symbolX + 4, y + 11, 1)
        p.fillRect(symbolX + 26, y + 27, 4, 1, 1); p.fillRect(symbolX + 27, y + 28, 2, 1, 1)
        if (stage == 1) p.drawRect(symbolX, y + 8, 34, 28, 5)
        capsule(p, x + 145, y + 7, 34, 30, 12)
        capsule(p, x + 146, y + 8, 32, 28, 1)
        if (stage == 2) p.drawRect(x + 145, y + 7, 34, 30, 5)
        if (value != -999999) number(p, value, x + 162, y + 14, 15)
    }
    function fadeStatement(p: Image, amount: number) {
        if (amount > 0.22) p.replace(1, 12)
        if (amount > 0.45) {
            for (let color of [1, 2, 5, 7, 10, 11, 12, 13, 14, 15]) p.replace(color, 9)
        }
        if (amount > 0.7) {
            p.fill(0); hexagon(p, 0, 0, 200, 44, 9); hexagon(p, 2, 2, 196, 40, 3)
        }
    }
    function booleanResult(p: Image, cx: number, y: number, signal: number, age: number, solved: boolean) {
        if (!resultCard) resultCard = image.create(124, 44)
        resultCard.fill(0); hexagon(resultCard, 0, 0, 124, 44, 9); hexagon(resultCard, 2, 2, 120, 40, 3)
        round(resultCard, 24, 8, 78, 28, 9); round(resultCard, 25, 9, 76, 26, 3)
        let label = signal == 1 ? "true" : "false"
        resultCard.print(label, signal == 1 ? 34 : 28, 15, 1, large)
        resultCard.fillRect(91, 20, 6, 2, 1); resultCard.fillRect(93, 22, 2, 2, 1)
        // A single gentle unfold, with a small settle for a solved statement.
        let h = age >= 0 && age < 160 ? Math.max(6, Math.floor(44 * age / 160)) : 44
        let lift = solved && age >= 160 && age < 420 ? Math.floor(3 * Math.sin((age - 160) * Math.PI / 260)) : 0
        if (solved) hexagon(p, cx - 65, y + Math.idiv(44 - h, 2) - 3 - lift, 130, h + 6, 5)
        p.blit(cx - 62, y + Math.idiv(44 - h, 2) - lift, 124, h, resultCard, 0, 0, 124, 44, true, false)
    }
    export function deliveryOrder(p: Image, index: number, value: number, target: number, relation: number, signal: number, focused: boolean, complete: boolean, stage: number = -1, variable: number = -1, base: number = 0, checkMs: number = -1, resultMs: number = -1) {
        let x = index * 212 + 8, y = 418, cx = x + 100
        let showingResult = complete || stage == 4 && signal >= 0 && (signal == 1 || resultMs < 650)
        if (showingResult) {
            booleanResult(p, cx, y, signal, resultMs, complete)
            let sign = relation == 0 ? "=" : relation == 1 ? "<" : relation == 2 ? ">" : relation == 3 ? "<=" : ">="
            let evaluated = "" + target + " " + sign + " " + value
            p.print(evaluated, cx - Math.idiv(evaluated.length * image.font8.charWidth, 2), 468, complete ? 12 : 2, image.font8)
            return
        }
        while (statementCards.length <= index) statementCards.push(image.create(200, 44))
        let card = statementCards[index]
        drawStatement(card, value, target, relation, stage, variable, base)
        let fade = stage == 3 ? Math.min(1, Math.max(0, (checkMs - 960) / 200)) : stage == 4 && signal == 0 ? Math.max(0, (850 - resultMs) / 200) : 0
        fadeStatement(card, fade)
        let width = 200 - Math.floor(76 * fade)
        if (focused && stage != 3) hexagon(p, x - 4, y - 4, 208, 52, 5)
        p.blit(cx - Math.idiv(width, 2), y, width, 44, card, 0, 0, 200, 44, true, false)
        if (stage == 3 && fade > 0.7) for (let i = -1; i <= 1; i++) p.fillCircle(cx + i * 10, y + 22, 2, 12)
        if (variable >= 0 && stage == 0) {
            round(p, x + 27, y - 24, 80, 23, 5)
            p.print("=", x + 34, y - 18, 15, image.font8); number(p, target, x + 70, y - 20, 15)
        }
        if (stage >= 0 && stage <= 3) p.print("checking", cx - 24, 468, 12, image.font8)
        else if (signal == 0) { p.drawLine(cx - 3, 466, cx + 3, 472, 2); p.drawLine(cx + 3, 466, cx - 3, 472, 2) }
        else if (focused) p.print("B CHECK", x + 74, 466, 5, image.font8)
    }

    function capsule(p: Image, x: number, y: number, w: number, h: number, color: number) {
        let r = h / 2
        for (let row = 0; row < h; row++) {
            let dy = row - (h - 1) / 2
            let inset = Math.ceil(r - Math.sqrt(Math.max(0, r * r - dy * dy)))
            p.fillRect(x + inset, y + row, w - inset * 2, 1, color)
        }
    }
    export function deliverySocketX(index: number): number { return index * 212 + 170 }
    export function deliverySocketY(): number { return 440 }
}

namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 640
    export const ARCADE_SCREEN_HEIGHT = 480
}

enum BakeryAction {
    //% block="the mixer is selected"
    TraySelected,
    //% block="a + 1 item hits the mixer"
    AddOne,
    //% block="a - 1 modifier hits the mixer"
    RemoveOne,
    //% block="a × 2 modifier hits the mixer"
    Double,
    //% block="a / 2 modifier hits the mixer"
    Halve,
    //% block="a + 2 or + 3 modifier hits the mixer"
    AddModifier,
    //% block="a - 2 or - 3 modifier hits the mixer"
    SubtractModifier,
    //% block="a × 3 modifier hits the mixer"
    MultiplyModifier,
    //% block="a / 3 modifier hits the mixer"
    DivideModifier,
    //% block="an equal to (=) order checks a number"
    EqualCheck,
    //% block="a less than (<) order checks a number"
    LessCheck,
    //% block="a greater than (>) order checks a number"
    GreaterCheck,
    //% block="a less than or equal to (≤) order checks a number"
    LessEqualCheck,
    //% block="a greater than or equal to (≥) order checks a number"
    GreaterEqualCheck,
    //% block="a set 2 cake hits the mixer"
    SetBatch
}

//% color=#bf693d icon="\uf1fd" block="Cake Factory" weight=90
namespace bakery {
    let handlers: (() => void)[] = []
    let chef: Sprite = null
    let mixingValue = 2
    let mixingStart = 2
    let mixingJammed = false
    let targets = [3, 1, 5]
    let delivered = [0, 0, 0]
    let hasDelivery = [false, false, false]
    let relations = [0, 0, 0]
    let signals = [-1, -1, -1]
    let jammed = [false, false, false]
    let fulfilledAt = [-1, -1, -1]
    let orderBegan = [0, 0, 0]
    let activeMachine = -1
    let activeAction = -1
    let activeOp = -1
    let activeNumber = 0
    let beforeAction = 0
    let reported = false
    let held: Sprite = null
    let heldKind = -1
    let heldOp = -1
    let heldNumber = 0
    let faceX = 0
    let faceY = -1
    let oldX = 320
    let oldY = 380
    let packets: Sprite[] = []
    let packetOps: number[] = []
    let packetNumbers: number[] = []
    let packetLanes: number[] = []
    let packetBorn: number[] = []
    let packetManual: boolean[] = []
    let packetImages: Image[] = []
    let packetFallPhases: number[] = []
    let shots: Sprite[] = []
    let shotKinds: number[] = []
    let shotOps: number[] = []
    let shotNumbers: number[] = []
    let shotBorn: number[] = []
    let shotFromX: number[] = []
    let shotFromY: number[] = []
    let shotToX: number[] = []
    let shotToY: number[] = []
    let shotDuration: number[] = []
    let shotHeight: number[] = []
    let shotTargets: number[] = []
    let shotShadows: Sprite[] = []
    let sideValues = [1, 2, 1, 3]
    let sideOps = [0, 2, 1, 3]
    let sideChanged = [0, 0, 0, 0]
    let orderVariables = [-1, -1, -1]
    let orderBases = [0, 0, 0]
    let variablesActive = false
    let nextOperatorChange = 0
    let charging = false
    let chargeBegan = 0
    let checking = -1
    let checkBegan = 0
    let checkPhase = -1
    let resultUntil = [0, 0, 0]
    let popAt = -10000
    let popX = 320
    let popY = 256
    let chefFrames: Image[] = []
    let carryingFrames: Image[] = []
    let spawnAt = [0, 0, 0]
    let spawnRound = [0, 1, 2]
    let manualAt = 0
    let outputCooldown = 0
    let outputRevealed = false
    let conveyorConfigured = false
    let conveyorOn = false
    let learningStage = 0
    let visibleOrders = 0
    let runningMask = 0
    let hitAt = -10000
    let started = false
    let shiftDone = false
    let roundNumber = 0
    let stamps = 0
    let coins = 0
    let lastBonus = 0
    let lastTick = 0
    let message = ""
    let messageUntil = 0

    function trace(reason: string) {
        // @bakery-test-trace
    }
    function installed(action: number): boolean { return handlers[action] != null }
    function teachingStage(): number {
        let actions = [BakeryAction.AddOne, BakeryAction.EqualCheck, BakeryAction.RemoveOne, BakeryAction.GreaterCheck, BakeryAction.Double, BakeryAction.LessCheck, BakeryAction.Halve, BakeryAction.AddModifier, BakeryAction.SubtractModifier, BakeryAction.MultiplyModifier, BakeryAction.DivideModifier, BakeryAction.LessEqualCheck, BakeryAction.GreaterEqualCheck, BakeryAction.SetBatch]
        for (let i = actions.length - 1; i >= 0; i--) if (installed(actions[i])) return i + 3
        return conveyorConfigured ? 2 : outputRevealed ? 1 : 0
    }
    function displayOrder(m: number): number { return visibleOrders == 1 ? 1 : m }
    function isCalculation(action: number): boolean { return action > BakeryAction.TraySelected && action < BakeryAction.EqualCheck || action == BakeryAction.SetBatch }
    function laneRunning(lane: number): boolean { return conveyorOn && (lane == 1 || lane == 0 && learningStage >= 10 || lane == 2 && learningStage >= 13) }
    function tell(words: string, duration: number = 2600) { message = words; messageUntil = control.millis() + duration }
    function smallWhole(value: number): boolean { return value - value == 0 && Math.floor(value) == value }
    function numberText(value: number): string { let text = "" + value; return text.length > 9 ? text.substr(0, 9) : text }
    function actionFor(op: number, rhs: number): BakeryAction {
        if (op == 0) return rhs == 1 ? BakeryAction.AddOne : BakeryAction.AddModifier
        if (op == 1) return rhs == 1 ? BakeryAction.RemoveOne : BakeryAction.SubtractModifier
        if (op == 2) return rhs == 2 ? BakeryAction.Double : BakeryAction.MultiplyModifier
        return rhs == 2 ? BakeryAction.Halve : BakeryAction.DivideModifier
    }
    //% blockId=bakery_on_action block="when $action" weight=100
    export function onAction(action: BakeryAction, handler: () => void) { handlers[action] = handler }
    //% blockId=bakery_set_conveyor block="set conveyor belt on $on" weight=95
    //% on.defl=true
    export function setConveyor(on: boolean) {
        conveyorConfigured = true; conveyorOn = on
        trace("conveyor-set")
    }
    //% blockId=bakery_tray_amount block="amount in the mixer" weight=70
    export function trayAmount(): number { return mixingValue }
    //% blockId=bakery_modifier_number block="number on the modifier" weight=65
    export function modifierNumber(): number { return activeNumber }
    //% blockId=bakery_left_amount block="order target on the left" weight=64
    export function leftAmount(): number { return activeMachine >= 0 ? targets[activeMachine] : 0 }
    //% blockId=bakery_right_amount block="delivered number on the right" weight=63
    export function rightAmount(): number { return activeMachine >= 0 ? delivered[activeMachine] : 0 }
    //% blockId=bakery_show_check block="show check $value" weight=80
    export function showCheck(value: boolean) {
        if (activeAction < BakeryAction.EqualCheck || activeAction > BakeryAction.GreaterEqualCheck || activeMachine < 0) return
        reported = true; signals[activeMachine] = value ? 1 : 0
        trace("check-reported")
    }
    //% blockId=bakery_show_tray block="show $value at the batch dispenser" weight=90
    export function showTray(value: number) {
        mixingValue = value; outputRevealed = true
        trace("mixer-read")
    }
    //% blockId=bakery_apply_result block="put $value in the mixer" weight=85
    export function applyResult(value: number) {
        if (!isCalculation(activeAction) || reported) return
        reported = true; mixingValue = value
        let valid = smallWhole(value)
        // Nonmutating observer: display the learner result, never replace it.
        if (activeOp == 0) valid = valid && value - beforeAction == activeNumber
        if (activeOp == 1) valid = valid && beforeAction - value == activeNumber
        if (activeOp == 2) valid = valid && (beforeAction == 0 ? value == 0 : value / beforeAction == activeNumber)
        if (activeOp == 3) valid = valid && value * activeNumber == beforeAction
        if (activeAction == BakeryAction.SetBatch) valid = valid && value == 2
        mixingJammed = activeAction == BakeryAction.SetBatch ? !valid : mixingJammed || !valid
        tell(mixingJammed ? "Check your calculation, then restart." : "Batch updated. Pick up its number with A.", 3400)
        hitAt = control.millis(); trace("result-applied")
    }
    function invoke(action: BakeryAction, machine: number) {
        activeAction = action; activeMachine = machine; beforeAction = mixingValue; reported = false
        if (installed(action)) handlers[action]()
        if (!reported && isCalculation(action)) {
            mixingJammed = true; tell("No mixer result. Check your code, then restart.", 4000)
        }
        trace("action-" + action); activeAction = -1; activeMachine = -1
    }
    function checkOrder(m: number) {
        signals[m] = -1
        if (hasDelivery[m] && !jammed[m]) invoke(BakeryAction.EqualCheck + relations[m], m)
    }
    function consistent(m: number): boolean {
        let a = targets[m], b = delivered[m], r = relations[m]
        return r == 0 ? a == b : r == 1 ? a < b : r == 2 ? a > b : r == 3 ? a <= b : a >= b
    }
    function receiveNumber(m: number, value: number) {
        if (m >= visibleOrders || fulfilledAt[m] >= 0) return
        delivered[m] = value; hasDelivery[m] = true; signals[m] = -1; jammed[m] = false; resultUntil[m] = 0
        if (checking == m) { checking = -1; checkPhase = -1 }
        trace("number-delivered"); beginCheck(m)
    }
    function beginCheck(m: number) {
        jammed[m] = false; signals[m] = -1; checking = m; checkBegan = control.millis(); checkPhase = 0
        tell("Left number... comparison... right number...", 1200); trace("check-started")
    }
    function finishCheck(m: number) {
        checkOrder(m); resultUntil[m] = control.millis() + 850
        if (signals[m] < 0) { tell("Build this check's event to connect it."); return }
        if (signals[m] == 0) { tell("Not yet. Adjust batch and throw a new number.", 3000); trace("order-false"); return }
        if (!consistent(m)) { jammed[m] = true; tell("That TRUE does not match. Check your code.", 4000); trace("check-mismatch"); return }
        stamps++; fulfilledAt[m] = control.millis()
        lastBonus = Math.max(1, 5 - Math.idiv(control.millis() - orderBegan[m], 15000)); coins += lastBonus
        popAt = control.millis(); popX = 108 + displayOrder(m) * 212; popY = 426
        tell("TRUE! Statement completed."); trace("order-filled")
        if (visibleOrders == 3 && stamps == 3) { shiftDone = true; clearPackets(); tell("Three TRUE statements! A: next round.", 100000); trace("shift-complete") }
    }
    function updateChecks(now: number) {
        if (checking < 0) return
        let phase = Math.min(3, Math.idiv(now - checkBegan, 320))
        if (phase != checkPhase) { checkPhase = phase; trace("check-highlight") }
        if (now - checkBegan >= 1160) { let m = checking; checking = -1; checkPhase = -1; finishCheck(m) }
    }
    function updateVariables(now: number) {
        if (!variablesActive) return
        if (now >= nextOperatorChange) {
            for (let i = 0; i < 4; i++) if (shotTargets.indexOf(i + 4) < 0) sideOps[i] = (sideOps[i] + Math.randomRange(1, 3)) % 4
            nextOperatorChange = now + 12000; trace("station-operators-changed")
        }
        for (let m = 0; m < 3; m++) if (orderVariables[m] >= 0 && fulfilledAt[m] < 0) {
            let target = orderBases[m] + sideValues[orderVariables[m]]
            if (target != targets[m]) {
                targets[m] = target; signals[m] = -1; resultUntil[m] = 0; jammed[m] = false
                if (checking == m) { checking = -1; checkPhase = -1 }
            }
        }
    }
    function changeVariable(id: number, operand: number) {
        let previous = sideValues[id], op = sideOps[id]
        if (op == 3 && (operand == 0 || previous % operand != 0)) { tell("This station needs a whole-number division."); trace("station-rejected"); return }
        let value = op == 0 ? previous + operand : op == 1 ? previous - operand : op == 2 ? previous * operand : previous / operand
        if (!smallWhole(value)) { tell("Use a whole number at this station."); trace("station-rejected"); return }
        sideValues[id] = value; sideChanged[id] = control.millis() + 1000
        tell("Variable changed! Find its icon in the statements.", 3400); updateVariables(control.millis()); trace("station-changed")
    }

    function removePacket(i: number, reason: string) {
        packets[i].destroy(); packets.removeAt(i); packetOps.removeAt(i); packetNumbers.removeAt(i)
        packetLanes.removeAt(i); packetBorn.removeAt(i); packetManual.removeAt(i)
        packetImages.removeAt(i); packetFallPhases.removeAt(i); trace(reason)
    }
    function clearPackets() { while (packets.length) removePacket(packets.length - 1, "packet-cleared") }
    function removeShot(i: number, reason: string) {
        shots[i].destroy(); shotShadows[i].destroy()
        shots.removeAt(i); shotKinds.removeAt(i); shotOps.removeAt(i); shotNumbers.removeAt(i); shotBorn.removeAt(i)
        shotFromX.removeAt(i); shotFromY.removeAt(i); shotToX.removeAt(i); shotToY.removeAt(i)
        shotDuration.removeAt(i); shotHeight.removeAt(i); shotTargets.removeAt(i); shotShadows.removeAt(i); trace(reason)
    }

    function discardHeld() { if (held != null) held.destroy(); held = null; heldKind = -1; heldOp = -1; heldNumber = 0; charging = false }
    function startShift() {
        clearPackets(); while (shots.length) removeShot(shots.length - 1, "shot-cleared")
        discardHeld(); checking = -1; checkPhase = -1; stamps = 0; coins = 0; shiftDone = false; mixingJammed = false
        learningStage = teachingStage()
        visibleOrders = learningStage < 2 ? 0 : learningStage < 16 ? 1 : 3
        runningMask = 0
        for (let lane = 0; lane < 3; lane++) if (laneRunning(lane)) runningMask += lane == 0 ? 1 : lane == 1 ? 2 : 4
        mixingStart = mixingValue
        let center = roundNumber == 0 ? 3 : Math.max(2, Math.min(4, Math.abs(mixingValue)))
        relations = [0, installed(BakeryAction.GreaterCheck) ? 2 : 0, installed(BakeryAction.LessCheck) ? 1 : 0]
        if (installed(BakeryAction.LessEqualCheck) && (roundNumber % 2 == 0)) relations[2] = 3
        if (installed(BakeryAction.GreaterEqualCheck) && (roundNumber % 2 == 0)) relations[1] = 4
        targets = [center, relations[1] == 2 ? center - 1 : center - 2, relations[2] == 1 ? center + 1 : center + 2]
        if (visibleOrders == 1) {
            let stageTargets = [0, 0, 3, 3, 3, 1, 2, 4, 3, 1, 4, 0, 6, 2, 2, 2]
            targets[0] = stageTargets[learningStage]
            relations[0] = learningStage == 6 ? 2 : learningStage == 8 ? 1 : learningStage == 14 ? 3 : learningStage == 15 ? 4 : 0
        }
        for (let i = 0; i < 3; i++) {
            signals[i] = -1; delivered[i] = 0; hasDelivery[i] = false; jammed[i] = false; fulfilledAt[i] = -1
            orderBegan[i] = control.millis(); spawnAt[i] = control.millis() + 200 + i * 600; spawnRound[i] = i
        }
        variablesActive = roundNumber > 0 && visibleOrders == 3
        if (variablesActive) {
            for (let m = 0; m < 3; m++) {
                orderVariables[m] = roundNumber == 1 && m == 0 ? 0 : Math.randomRange(0, 3); orderBases[m] = roundNumber == 1 && m == 0 ? 3 : Math.randomRange(1, 3)
                targets[m] = orderBases[m] + sideValues[orderVariables[m]]
            }
        } else orderVariables = [-1, -1, -1]
        nextOperatorChange = control.millis() + 12000
        manualAt = control.millis() + 1800; outputCooldown = control.millis() + 500
        if (variablesActive) tell("Icons are variables. Throw numbers at side counters.", 5000)
        else if (learningStage == 0) tell("Welcome to the factory.", 5000)
        else if (learningStage == 1) tell("Your batch number is ready at the dispenser.", 5000)
        else if (!conveyorOn) tell("The conveyor is off.", 5000)
        else tell("Make a number that makes the order true.", 5000)
        trace("shift-started")
    }
    function nearMixer(): boolean {
        let dx = chef.x - 320, dy = chef.y - 256
        return dx * dx + dy * dy < 130 * 130
    }
    function nearOrder(): number {
        if (chef == null || chef.y < 366 || visibleOrders == 0) return -1
        if (visibleOrders == 1) return chef.x >= 212 && chef.x < 424 ? 0 : -1
        return Math.max(0, Math.min(2, Math.idiv(chef.x, 212)))
    }
    function applyModifier(op: number, rhs: number) {
        if (op == 4) { activeOp = 4; activeNumber = rhs; invoke(BakeryAction.SetBatch, -1); activeOp = -1; activeNumber = 0; return }
        if (mixingJammed) { tell("Check your mixer code, then restart."); return }
        if (op == 3 && (rhs == 0 || mixingValue % rhs != 0)) { tell("That division needs a whole-number result."); trace("application-rejected"); return }
        let action = actionFor(op, rhs)
        if (!installed(action)) { tell("Build this modifier's event first."); trace("missing-handler"); return }
        activeOp = op; activeNumber = rhs; invoke(action, -1); activeOp = -1; activeNumber = 0
    }
    function targetX(id: number): number { return id == 0 ? 320 : id <= 3 ? bakeryArt.deliverySocketX(displayOrder(id - 1)) : id < 6 ? 44 : 596 }
    function targetY(id: number): number { return id == 0 ? 247 : id <= 3 ? bakeryArt.deliverySocketY() : (id - 4) % 2 == 0 ? 247 : 343 }
    function chooseTarget(range: number): number {
        let chosen = -1, best = 100000
        for (let id = 0; id < 8; id++) {
            if (heldKind == 0 && id != 0 || heldKind == 1 && id == 0 || id >= 4 && !variablesActive) continue
            if (id >= 1 && id <= 3 && (id > visibleOrders || fulfilledAt[id - 1] >= 0)) continue
            // Aim toward the whole statement; the arc and reticle use its receiving socket.
            let aimX = id >= 1 && id <= 3 ? 108 + displayOrder(id - 1) * 212 : targetX(id)
            let aimY = id >= 1 && id <= 3 ? 439 : targetY(id)
            let dx = aimX - chef.x, dy = aimY - chef.y
            let distance = Math.sqrt(dx * dx + dy * dy)
            let facing = (dx * faceX + dy * faceY) / Math.max(1, distance * Math.sqrt(faceX * faceX + faceY * faceY))
            if (distance <= range && facing > 0.70 && distance < best) { best = distance; chosen = id }
        }
        return chosen
    }
    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        if (!started) return
        if (shiftDone) { roundNumber++; startShift(); return }
        if (held == null) { tryPickup(); return }
        charging = true; chargeBegan = control.millis(); trace("charge-started")
    })
    controller.A.onEvent(ControllerButtonEvent.Released, function () {
        if (!started || !charging || held == null || shiftDone) return
        let power = Math.min(1000, control.millis() - chargeBegan) / 1000
        let range = 190 + power * 110, target = chooseTarget(range)
        let length = Math.sqrt(faceX * faceX + faceY * faceY)
        let endX = target < 0 ? chef.x + faceX * range / length : targetX(target)
        let endY = target < 0 ? chef.y + faceY * range / length : targetY(target)
        let shot = sprites.create(held.image.clone(), SpriteKind.Projectile); shot.z = 30
        let shadow = sprites.create(bakeryArt.shadow(), SpriteKind.Food); shadow.z = 1
        shots.push(shot); shotKinds.push(heldKind); shotOps.push(heldOp); shotNumbers.push(heldNumber); shotBorn.push(control.millis())
        shotFromX.push(chef.x); shotFromY.push(chef.y); shotToX.push(endX); shotToY.push(endY)
        shotDuration.push(450 + power * 300); shotHeight.push(38 + power * 65); shotTargets.push(target); shotShadows.push(shadow)
        shot.setPosition(chef.x, chef.y - 28); shadow.setPosition(chef.x, chef.y + 15)
        trace("item-thrown"); discardHeld()
    })
    controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
        if (!started || shiftDone) return
        if (held != null) { discardHeld(); outputCooldown = control.millis() + 1000; tell("Hands free. A: pick up another item."); trace("item-discarded"); return }
        let m = nearOrder()
        if (m >= 0 && fulfilledAt[m] < 0) {
            if (!hasDelivery[m]) { tell("Toss a number into the empty socket first."); return }
            if (checking >= 0) return
            beginCheck(m); return
        }
        if (nearMixer() && installed(BakeryAction.SetBatch)) { applyModifier(4, 2); trace("mixer-reset") }
    })

    function spawn(lane: number, op: number, rhs: number, manual: boolean) {
        let p = sprites.create(manual ? bakeryArt.resetCake(rhs) : bakeryArt.modifier(op, rhs), SpriteKind.Food)
        p.setPosition(manual ? 86 : [96, 320, 544][lane], manual ? 197 : 70); p.z = 3
        packets.push(p); packetOps.push(op); packetNumbers.push(rhs); packetLanes.push(lane); packetBorn.push(control.millis()); packetManual.push(manual)
        packetImages.push(p.image); packetFallPhases.push(-1)
        trace(manual ? "manual-arrived" : "packet-dropped")
    }
    function conveyorChoice(lane: number) {
        // During construction, the center belt repeats the newest useful operation.
        if (lane == 1 && learningStage < 16) {
            let op = 0, rhs = 1
            if (learningStage >= 5) op = 1
            if (learningStage >= 7) { op = 2; rhs = 2 }
            if (learningStage >= 9) op = 3
            if (learningStage >= 10) { op = 0; rhs = 2 }
            if (learningStage >= 11) op = 1
            if (learningStage >= 12) { op = 2; rhs = 3 }
            if (learningStage >= 13) op = 3
            spawn(lane, op, rhs, false); return
        }
        let ops = [0], nums = [1]
        if (installed(BakeryAction.RemoveOne)) { ops.push(1); nums.push(1) }
        if (installed(BakeryAction.Double)) { ops.push(2); nums.push(2) }
        if (installed(BakeryAction.Halve)) { ops.push(3); nums.push(2) }
        if (installed(BakeryAction.AddModifier)) { ops.push(0); nums.push(2); ops.push(0); nums.push(3) }
        if (installed(BakeryAction.SubtractModifier)) { ops.push(1); nums.push(2); ops.push(1); nums.push(3) }
        if (installed(BakeryAction.MultiplyModifier)) { ops.push(2); nums.push(3) }
        if (installed(BakeryAction.DivideModifier)) { ops.push(3); nums.push(3) }
        let index = spawnRound[lane] % ops.length; spawnRound[lane] += 1; spawn(lane, ops[index], nums[index], false)
    }
    function updatePackets(dt: number) {
        let now = control.millis()
        for (let lane = 0; lane < 3; lane++) if (laneRunning(lane) && now >= spawnAt[lane]) { conveyorChoice(lane); spawnAt[lane] = now + 2300 }
        if (installed(BakeryAction.SetBatch) && now >= manualAt) {
            let exists = false; for (let flag of packetManual) if (flag) exists = true
            if (!exists) spawn(0, 4, 2, true)
            manualAt = now + 8000
        }
        for (let i = packets.length - 1; i >= 0; i--) {
            if (!packetManual[i]) {
                let age = now - packetBorn[i], lane = packetLanes[i]
                if (age >= 4600) { removePacket(i, "packet-expired"); continue }
                if (age >= 4000) {
                    let fall = Math.min(1, (age - 4000) / 600), phase = Math.idiv(age - 4000, 50)
                    packets[i].setPosition([165, 320, 475][lane], 182 + 15 * fall)
                    if (phase != packetFallPhases[i]) {
                        packetFallPhases[i] = phase
                        let width = Math.max(3, Math.floor(112 * (1 - fall))), height = Math.max(2, Math.floor(24 * (1 - fall)))
                        let frame = image.create(width, height)
                        frame.blit(0, 0, width, height, packetImages[i], 0, 0, 112, 24, true, false)
                        packets[i].setImage(frame); trace("packet-falling")
                    }
                    continue
                }
                packets[i].x += dt * [0.0171, 0, -0.0171][lane]; packets[i].y += dt * 0.028
            }
        }
    }
    function tryPickup() {
        let now = control.millis()
        for (let i = packets.length - 1; i >= 0; i--) {
            if (!packetManual[i] && now - packetBorn[i] >= 4000) continue
            if (Math.abs(chef.x - packets[i].x) < (packetManual[i] ? 25 : 55) && Math.abs(chef.y - 12 - packets[i].y) < 30) {
                heldOp = packetOps[i]; heldNumber = packetNumbers[i]; heldKind = 0
                held = sprites.create(packetManual[i] ? bakeryArt.resetCake(heldNumber) : bakeryArt.modifier(heldOp, heldNumber), SpriteKind.Food); held.z = 20
                removePacket(i, "item-picked-up"); tell("Face the bowl. Press A to throw."); return
            }
        }
        if (!mixingJammed && outputRevealed && now >= outputCooldown && Math.abs(chef.x - 454) < 24 && Math.abs(chef.y - 344) < 24) {
            heldKind = 1; heldOp = -1; heldNumber = mixingValue; held = sprites.create(bakeryArt.numericOutput(heldNumber), SpriteKind.Food); held.z = 20
            outputCooldown = now + 500; tell("A copy of batch. Face the order and press A.", 3400); trace("number-collected")
        }
    }
    function updateShots() {
        let now = control.millis()
        for (let i = shots.length - 1; i >= 0; i--) {
            let t = Math.min(1, (now - shotBorn[i]) / shotDuration[i])
            let x = shotFromX[i] + (shotToX[i] - shotFromX[i]) * t
            let y = shotFromY[i] + (shotToY[i] - shotFromY[i]) * t
            let height = (1 - t) * 28 + Math.sin(t * Math.PI) * shotHeight[i]
            shots[i].setPosition(x, y - height); shotShadows[i].setPosition(x, y + 10)
            if (t < 1) continue
            let kind = shotKinds[i], op = shotOps[i], rhs = shotNumbers[i], target = shotTargets[i]
            popX = x; popY = y; popAt = now
            removeShot(i, target < 0 ? "throw-missed" : "throw-landed")
            if (kind == 0 && target == 0) { trace("modifier-hit"); applyModifier(op, rhs) }
            else if (kind == 1 && target >= 1 && target <= 3) receiveNumber(target - 1, rhs)
            else if (kind == 1 && target >= 4) changeVariable(target - 4, rhs)
        }
    }

    function moveAroundPot() {
        chef.x = Math.max(92, Math.min(548, chef.x)); chef.y = Math.max(179, Math.min(381, chef.y))
        let dx = chef.x - 320, dy = chef.y - 256, distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 78) {
            if (distance < 1) { chef.x = oldX; chef.y = oldY }
            else { chef.x = 320 + dx * 78 / distance; chef.y = 256 + dy * 78 / distance }
        }
        if (Math.abs(chef.vx) + Math.abs(chef.vy) > 1) { faceX = chef.vx == 0 ? 0 : chef.vx > 0 ? 1 : -1; faceY = chef.vy == 0 ? 0 : chef.vy > 0 ? 1 : -1 }
        oldX = chef.x; oldY = chef.y
    }
    let hudFont = image.doubledFont(image.font8)
    let smallFont = image.doubledFont(image.font5)
    function drawHud() {
        let now = control.millis(), m = nearOrder()
        screen.fillRect(0, 0, 640, 40, 8)
        screen.print("CAKE FACTORY", 10, 3, 13, hudFont)
        if (learningStage >= 3) screen.print("ARROWS: MOVE   A: PICK UP / THROW", 329, 5, 12, image.font8)
        for (let i = 0; i < visibleOrders; i++) { screen.drawCircle(207 + i * 21, 11, 6, 5); if (i < stamps) screen.fillCircle(207 + i * 21, 11, 4, 5) }
        if (now < messageUntil) screen.print(message, 10, 26, 13, image.font8)
        bakeryArt.mixer(screen, mixingValue, heldKind == 0, mixingJammed, Math.idiv(now, 180))
        bakeryArt.outputStand(screen, mixingValue, held == null && !mixingJammed, outputRevealed)
        for (let i = 0; i < 4; i++) bakeryArt.sideStation(screen, i, sideValues[i], sideOps[i], variablesActive, sideChanged[i] - now, 12000 - Math.max(0, nextOperatorChange - now))
        for (let i = 0; i < visibleOrders; i++) {
            let stage = checking == i ? checkPhase : now < resultUntil[i] ? 4 : -1
            bakeryArt.deliveryOrder(screen, displayOrder(i), hasDelivery[i] ? delivered[i] : -999999, targets[i], relations[i], signals[i], i == m, fulfilledAt[i] >= 0, stage, orderVariables[i], orderBases[i], checking == i ? now - checkBegan : -1, now < resultUntil[i] ? 850 - (resultUntil[i] - now) : -1)
        }
        if (held != null) {
            let power = charging ? Math.min(1, (now - chargeBegan) / 1000) : 0
            let target = chooseTarget(190 + power * 110)
            if (target >= 0) {
                let tx = targetX(target), ty = targetY(target)
                screen.drawCircle(tx, ty, 11 + (Math.idiv(now, 120) % 2), 5)
                screen.drawLine(tx - 17, ty, tx - 12, ty, 5); screen.drawLine(tx + 12, ty, tx + 17, ty, 5)
            }
            if (charging) {
                screen.fillRect(chef.x - 20, chef.y + 23, 40, 5, 15)
                screen.fillRect(chef.x - 19, chef.y + 24, Math.max(3, Math.floor(power * 38)), 3, 5)
            }
        }
        if (now - popAt < 420) for (let i = 0; i < 8; i++) {
            let angle = i * Math.PI / 4, radius = 4 + (now - popAt) / 13
            screen.fillRect(popX + Math.cos(angle) * radius, popY + Math.sin(angle) * radius - (now - popAt) / 30, 3, 3, i % 2 == 0 ? 5 : 1)
        }
        if (mixingJammed) screen.print(installed(BakeryAction.SetBatch) ? "USE A SET 2 CAKE" : "CHECK CODE, THEN RESTART", 253, 337, 2, image.font8)
        if (shiftDone && now > resultUntil[0] && now > resultUntil[1] && now > resultUntil[2]) {
            screen.fillRect(111, 130, 418, 160, 15); screen.fillRect(115, 134, 410, 152, 13)
            screen.printCenter("THREE TRUE STATEMENTS!", 155, 8, hudFont)
            screen.printCenter(variablesActive ? "Keep mixing. New variable statements next." : "Next: ingredient variables join the factory.", 199, 8, image.font8)
            screen.printCenter("A: next round", 248, 6, hudFont)
        }
    }

    game.onUpdate(function () {
        if (!started) return
        let now = control.millis(), dt = Math.min(80, now - lastTick); lastTick = now
        moveAroundPot(); bakeryArt.conveyorTreads(scene.backgroundImage(), Math.idiv(now * 28, 1000), runningMask)
        let frame = Math.abs(chef.vx) + Math.abs(chef.vy) > 1 ? Math.idiv(now, 130) % 3 : 0
        chef.setImage(held != null ? carryingFrames[frame] : chefFrames[frame])
        if (!shiftDone) { updatePackets(dt); updateShots(); updateVariables(now); updateChecks(now) }
        if (held != null) held.setPosition(chef.x, chef.y - 14 - held.height / 2 - (charging ? Math.min(5, Math.idiv(now - chargeBegan, 180)) : 0))
    })
    game.onPaint(function () { if (started) drawHud() })
    control.runInParallel(function () {
        pause(100); bakeryArt.installPalette(); scene.setBackgroundImage(bakeryArt.drawBackground())
        for (let i = 0; i < 3; i++) { chefFrames.push(bakeryArt.chef(i)); carryingFrames.push(bakeryArt.chef(i, true)) }
        chef = sprites.create(chefFrames[0], SpriteKind.Player); chef.setPosition(320, 375); chef.z = 10
        controller.moveSprite(chef, 190, 190); lastTick = control.millis(); started = true; startShift(); trace("world-ready")
    })
}
```
