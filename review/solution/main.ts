let batch = 2
let modifierNumber = 0
let deliveredNumber = 0
let orderTarget = 0
let ready = false

bakery.showTray(batch)

bakery.setConveyor(true)

bakery.onAction(BakeryAction.AddOne, function () {
    batch = bakery.trayAmount()
    batch = batch + 1
    bakery.applyResult(batch)
})

bakery.onAction(BakeryAction.EqualCheck, function () {
    orderTarget = bakery.leftAmount()
    deliveredNumber = bakery.rightAmount()
    ready = orderTarget == deliveredNumber
    bakery.showCheck(ready)
})

bakery.onAction(BakeryAction.RemoveOne, function () {
    batch = bakery.trayAmount()
    batch = batch - 1
    bakery.applyResult(batch)
})

bakery.onAction(BakeryAction.GreaterCheck, function () {
    orderTarget = bakery.leftAmount()
    deliveredNumber = bakery.rightAmount()
    ready = orderTarget > deliveredNumber
    bakery.showCheck(ready)
})

bakery.onAction(BakeryAction.Double, function () {
    batch = bakery.trayAmount()
    batch = batch * 2
    bakery.applyResult(batch)
})

bakery.onAction(BakeryAction.LessCheck, function () {
    orderTarget = bakery.leftAmount()
    deliveredNumber = bakery.rightAmount()
    ready = orderTarget < deliveredNumber
    bakery.showCheck(ready)
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

bakery.onAction(BakeryAction.LessEqualCheck, function () {
    orderTarget = bakery.leftAmount()
    deliveredNumber = bakery.rightAmount()
    ready = orderTarget <= deliveredNumber
    bakery.showCheck(ready)
})

bakery.onAction(BakeryAction.GreaterEqualCheck, function () {
    orderTarget = bakery.leftAmount()
    deliveredNumber = bakery.rightAmount()
    ready = orderTarget >= deliveredNumber
    bakery.showCheck(ready)
})

bakery.onAction(BakeryAction.SetBatch, function () {
    batch = 2
    bakery.applyResult(batch)
})
