let batch = 0
let modifierNumber = 0
let leftCakes = 0
let rightCakes = 0
let ready = false

bakery.onAction(BakeryAction.TraySelected, function () {
    batch = bakery.trayAmount()
    bakery.showTray(batch)
})

bakery.onAction(BakeryAction.AddOne, function () {
    batch = bakery.trayAmount()
    batch = batch + 1
    bakery.applyResult(batch)
})

bakery.onAction(BakeryAction.RemoveOne, function () {
    batch = bakery.trayAmount()
    batch = batch - 1
    bakery.applyResult(batch)
})

bakery.onAction(BakeryAction.Double, function () {
    batch = bakery.trayAmount()
    batch = batch * 2
    bakery.applyResult(batch)
})

bakery.onAction(BakeryAction.Halve, function () {
    batch = bakery.trayAmount()
    batch = batch / 2
    bakery.applyResult(batch)
})

bakery.onAction(BakeryAction.AddModifier, function () {
    batch = bakery.trayAmount()
    modifierNumber = bakery.modifierNumber()
    batch = batch + modifierNumber
    bakery.applyResult(batch)
})

bakery.onAction(BakeryAction.SubtractModifier, function () {
    batch = bakery.trayAmount()
    modifierNumber = bakery.modifierNumber()
    batch = batch - modifierNumber
    bakery.applyResult(batch)
})

bakery.onAction(BakeryAction.MultiplyModifier, function () {
    batch = bakery.trayAmount()
    modifierNumber = bakery.modifierNumber()
    batch = batch * modifierNumber
    bakery.applyResult(batch)
})

bakery.onAction(BakeryAction.DivideModifier, function () {
    batch = bakery.trayAmount()
    modifierNumber = bakery.modifierNumber()
    batch = batch / modifierNumber
    bakery.applyResult(batch)
})

bakery.onAction(BakeryAction.EqualCheck, function () {
    leftCakes = bakery.leftAmount()
    rightCakes = bakery.rightAmount()
    ready = leftCakes == rightCakes
    bakery.showCheck(ready)
})

bakery.onAction(BakeryAction.LessCheck, function () {
    leftCakes = bakery.leftAmount()
    rightCakes = bakery.rightAmount()
    ready = leftCakes < rightCakes
    bakery.showCheck(ready)
})

bakery.onAction(BakeryAction.GreaterCheck, function () {
    leftCakes = bakery.leftAmount()
    rightCakes = bakery.rightAmount()
    ready = leftCakes > rightCakes
    bakery.showCheck(ready)
})
