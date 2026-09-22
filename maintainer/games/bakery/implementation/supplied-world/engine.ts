namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 320
    export const ARCADE_SCREEN_HEIGHT = 240
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
    //% block="an = order checks a number"
    EqualCheck,
    //% block="a < order checks a number"
    LessCheck,
    //% block="a > order checks a number"
    GreaterCheck,
    //% block="a ≤ order checks a number"
    LessEqualCheck,
    //% block="a ≥ order checks a number"
    GreaterEqualCheck
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
    let oldX = 160
    let oldY = 190
    let packets: Sprite[] = []
    let packetOps: number[] = []
    let packetNumbers: number[] = []
    let packetLanes: number[] = []
    let packetBorn: number[] = []
    let packetManual: boolean[] = []
    let shots: Sprite[] = []
    let shotKinds: number[] = []
    let shotOps: number[] = []
    let shotNumbers: number[] = []
    let shotBorn: number[] = []
    let spawnAt = [0, 0, 0]
    let spawnRound = [0, 1, 2]
    let manualAt = 0
    let outputCooldown = 0
    let previewValue = 0
    let previewUntil = 0
    let previewReported = false
    let hitAt = -10000
    let started = false
    let shiftDone = false
    let roundNumber = 0
    let stamps = 0
    let coins = 0
    let lastBonus = 0
    let lastTick = 0
    let message = "Catch. Aim. A: throw into the mixer."
    let messageUntil = 0

    function trace(reason: string) {
        // @bakery-test-trace
    }
    function installed(action: number): boolean { return handlers[action] != null }
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
        if (activeAction < BakeryAction.EqualCheck || activeMachine < 0) return
        reported = true; signals[activeMachine] = value ? 1 : 0
        trace("check-reported")
    }
    //% blockId=bakery_show_tray block="show $value from the mixer" weight=90
    export function showTray(value: number) {
        if (activeAction != BakeryAction.TraySelected) return
        reported = true; previewValue = value; previewReported = true; previewUntil = control.millis() + 2100
        trace("mixer-read")
    }
    //% blockId=bakery_apply_result block="put $value in the mixer" weight=85
    export function applyResult(value: number) {
        if (activeAction <= BakeryAction.TraySelected || activeAction >= BakeryAction.EqualCheck || reported) return
        reported = true; mixingValue = value
        let valid = smallWhole(value)
        // Nonmutating observer: display the learner result, never replace it.
        if (activeOp == 0) valid = valid && value - beforeAction == activeNumber
        if (activeOp == 1) valid = valid && beforeAction - value == activeNumber
        if (activeOp == 2) valid = valid && (beforeAction == 0 ? value == 0 : value / beforeAction == activeNumber)
        if (activeOp == 3) valid = valid && value * activeNumber == beforeAction
        mixingJammed = mixingJammed || !valid
        tell(mixingJammed ? "Check your calculation. Empty hands B: reset." : "New amount! Collect its numbered container.", 3400)
        hitAt = control.millis(); trace("result-applied")
    }
    function invoke(action: BakeryAction, machine: number) {
        activeAction = action; activeMachine = machine; beforeAction = mixingValue; reported = false
        if (installed(action)) handlers[action]()
        if (!reported && action > BakeryAction.TraySelected && action < BakeryAction.EqualCheck) {
            mixingJammed = true; tell("No mixer result. Check your code; B resets.", 4000)
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
        if (fulfilledAt[m] >= 0 || jammed[m]) return
        delivered[m] = value; hasDelivery[m] = true; trace("number-delivered")
        checkOrder(m)
        if (signals[m] < 0) { tell("Build this order's check to connect it."); return }
        if (signals[m] == 0) { tell("NO. Adjust the mixer, then throw a new number.", 3400); trace("order-false"); return }
        if (!consistent(m)) { jammed[m] = true; tell("YES disagrees with the numbers. Check code.", 4000); trace("check-mismatch"); return }
        stamps++; fulfilledAt[m] = control.millis()
        lastBonus = Math.max(1, 5 - Math.idiv(control.millis() - orderBegan[m], 15000)); coins += lastBonus
        tell("YES! Order activated."); trace("order-filled")
        if (stamps == 3) { shiftDone = true; clearPackets(); tell("All three activated! A: next round.", 100000); trace("shift-complete") }
    }
    function removePacket(i: number, reason: string) {
        packets[i].destroy(); packets.removeAt(i); packetOps.removeAt(i); packetNumbers.removeAt(i)
        packetLanes.removeAt(i); packetBorn.removeAt(i); packetManual.removeAt(i); trace(reason)
    }
    function clearPackets() { while (packets.length) removePacket(packets.length - 1, "packet-cleared") }
    function removeShot(i: number, reason: string) {
        shots[i].destroy(); shots.removeAt(i); shotKinds.removeAt(i); shotOps.removeAt(i); shotNumbers.removeAt(i); shotBorn.removeAt(i); trace(reason)
    }
    function discardHeld() { if (held != null) held.destroy(); held = null; heldKind = -1; heldOp = -1; heldNumber = 0 }
    function startShift() {
        clearPackets(); while (shots.length) removeShot(shots.length - 1, "shot-cleared")
        discardHeld(); stamps = 0; coins = 0; shiftDone = false; previewUntil = 0; mixingJammed = false
        if (roundNumber == 0) mixingValue = installed(BakeryAction.DivideModifier) && !installed(BakeryAction.EqualCheck) ? 3 : 2
        mixingStart = mixingValue
        let center = roundNumber == 0 ? 3 : Math.max(2, Math.min(4, Math.abs(mixingValue)))
        relations = [0, installed(BakeryAction.GreaterCheck) ? 2 : 0, installed(BakeryAction.LessCheck) ? 1 : 0]
        if (installed(BakeryAction.LessEqualCheck) && (roundNumber % 2 == 0)) relations[2] = 3
        if (installed(BakeryAction.GreaterEqualCheck) && (roundNumber % 2 == 0)) relations[1] = 4
        targets = [center, relations[1] == 2 ? center - 1 : center - 2, relations[2] == 1 ? center + 1 : center + 2]
        for (let i = 0; i < 3; i++) {
            signals[i] = -1; delivered[i] = 0; hasDelivery[i] = false; jammed[i] = false; fulfilledAt[i] = -1
            orderBegan[i] = control.millis(); spawnAt[i] = control.millis() + 200 + i * 600; spawnRound[i] = i
        }
        manualAt = control.millis() + 1800; outputCooldown = control.millis() + 500
        tell("Catch a modifier. Aim at the mixer. A: throw.", 4300); trace("shift-started")
    }
    function nearMixer(): boolean {
        let dx = chef.x - 160, dy = chef.y - 132
        return dx * dx + dy * dy < 65 * 65
    }
    function nearOrder(): number {
        if (chef == null || chef.y < 190) return -1
        return Math.max(0, Math.min(2, Math.idiv(chef.x, 106)))
    }
    function applyModifier(op: number, rhs: number) {
        if (mixingJammed) { tell("Check your mixer code. Empty hands B resets."); return }
        if (op == 3 && (rhs == 0 || mixingValue % rhs != 0)) { tell("That division needs a whole-number result."); trace("application-rejected"); return }
        let action = actionFor(op, rhs)
        if (!installed(action)) { tell("Build this modifier's event first."); trace("missing-handler"); return }
        activeOp = op; activeNumber = rhs; invoke(action, -1); activeOp = -1; activeNumber = 0
    }
    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        if (!started) return
        if (shiftDone) { roundNumber++; startShift(); return }
        if (held == null) {
            if (nearMixer()) invoke(BakeryAction.TraySelected, -1)
            else tell("Catch a modifier or collect a numbered container.")
            return
        }
        let shot = sprites.create(held.image.clone(), SpriteKind.Projectile)
        shot.setPosition(chef.x + faceX * 4, chef.y + faceY * 4); shot.z = 25
        let length = Math.sqrt(faceX * faceX + faceY * faceY)
        shot.vx = faceX * 150 / length; shot.vy = faceY * 150 / length
        shots.push(shot); shotKinds.push(heldKind); shotOps.push(heldOp); shotNumbers.push(heldNumber); shotBorn.push(control.millis())
        trace("item-thrown"); discardHeld(); previewUntil = 0
    })
    controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
        if (!started || shiftDone) return
        if (held != null) { discardHeld(); outputCooldown = control.millis() + 1200; tell("Hands free. Catch another item."); trace("item-discarded"); return }
        let m = nearOrder()
        if (m >= 0 && fulfilledAt[m] < 0) { hasDelivery[m] = false; signals[m] = -1; jammed[m] = false; tell("Order cleared. Its target stays the same."); trace("order-reset"); return }
        if (nearMixer()) { mixingValue = mixingStart; mixingJammed = false; previewUntil = 0; tell("Mixer reset. Completed orders stay complete."); trace("mixer-reset") }
    })
    function spawn(lane: number, op: number, rhs: number, manual: boolean) {
        let p = sprites.create(manual ? bakeryArt.looseCake() : bakeryArt.modifier(op, rhs), SpriteKind.Food)
        p.setPosition(manual ? 22 : [49, 160, 271][lane], manual ? 116 : lane == 1 ? 26 : 35); p.z = 3
        packets.push(p); packetOps.push(op); packetNumbers.push(rhs); packetLanes.push(lane); packetBorn.push(control.millis()); packetManual.push(manual)
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
        let index = spawnRound[lane] % ops.length; spawnRound[lane] += 1; spawn(lane, ops[index], nums[index], false)
    }
    function updatePackets(dt: number) {
        let now = control.millis()
        for (let lane = 0; lane < 3; lane++) if (now >= spawnAt[lane]) { conveyorChoice(lane); spawnAt[lane] = now + 2300 }
        if (now >= manualAt) {
            let exists = false; for (let flag of packetManual) if (flag) exists = true
            if (!exists) spawn(0, 0, 1, true)
            manualAt = now + 8000
        }
        for (let i = packets.length - 1; i >= 0; i--) {
            if (!packetManual[i]) {
                packets[i].x += dt * [0.012, 0, -0.012][packetLanes[i]]; packets[i].y += dt * 0.015
                if (now - packetBorn[i] > 4300) { removePacket(i, "packet-expired"); continue }
            }
            if (held == null && Math.abs(chef.x - packets[i].x) < (packetManual[i] ? 14 : 30) && Math.abs(chef.y - 5 - packets[i].y) < 16) {
                heldOp = packetOps[i]; heldNumber = packetNumbers[i]; heldKind = 0
                held = sprites.create(packetManual[i] ? bakeryArt.looseCake() : bakeryArt.modifier(heldOp, heldNumber), SpriteKind.Food); held.z = 20
                removePacket(i, "item-picked-up"); tell("Aim at the round mixer. A: throw."); previewUntil = 0
            }
        }
        if (held == null && !mixingJammed && installed(BakeryAction.TraySelected) && now >= outputCooldown && Math.abs(chef.x - 252) < 8 && Math.abs(chef.y - 174) < 10) {
            heldKind = 1; heldOp = -1; heldNumber = mixingValue; held = sprites.create(bakeryArt.numericOutput(heldNumber), SpriteKind.Food); held.z = 20
            outputCooldown = now + 1200; tell("Number copied! Aim down at a check and throw.", 3200); trace("number-collected")
        }
    }
    function updateShots() {
        let now = control.millis()
        for (let i = shots.length - 1; i >= 0; i--) {
            let p = shots[i], dx = p.x - 160, dy = p.y - 132
            if (shotKinds[i] == 0 && dx * dx + dy * dy < 31 * 31) {
                let op = shotOps[i], rhs = shotNumbers[i]; removeShot(i, "modifier-hit"); applyModifier(op, rhs); continue
            }
            if (p.y >= 204 && p.x >= 2 && p.x < 318) {
                let m = Math.max(0, Math.min(2, Math.idiv(p.x, 106)))
                let kind = shotKinds[i], value = shotNumbers[i]; removeShot(i, "order-hit")
                if (kind == 1) receiveNumber(m, value)
                else tell("These checks take numbers. Throw tools into the mixer.")
                continue
            }
            if (p.x < -35 || p.x > 355 || p.y < -35 || p.y > 270 || now - shotBorn[i] > 3500) removeShot(i, "throw-missed")
        }
    }
    function moveAroundPot() {
        chef.x = Math.max(12, Math.min(308, chef.x)); chef.y = Math.max(82, Math.min(195, chef.y))
        let dx = chef.x - 160, dy = chef.y - 132, distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 42) {
            if (distance < 1) { chef.x = oldX; chef.y = oldY }
            else { chef.x = 160 + dx * 42 / distance; chef.y = 132 + dy * 42 / distance }
        }
        if (Math.abs(chef.vx) + Math.abs(chef.vy) > 1) { faceX = chef.vx == 0 ? 0 : chef.vx > 0 ? 1 : -1; faceY = chef.vy == 0 ? 0 : chef.vy > 0 ? 1 : -1 }
        oldX = chef.x; oldY = chef.y
    }
    function drawHud() {
        let now = control.millis(), m = nearOrder()
        screen.fillRect(0, 0, 320, 19, 14); screen.print("CAKE FACTORY", 5, 1, 1, image.font8)
        screen.print("A THROW  B DROP", 221, 2, 1, image.font5)
        for (let i = 0; i < 3; i++) { screen.drawRect(94 + i * 12, 1, 9, 8, 5); if (i < stamps) screen.fillRect(96 + i * 12, 3, 5, 4, 5) }
        screen.fillRect(140, 2, 65, 6, 8); screen.fillRect(140, 2, Math.idiv(coins * 65, 15), 6, 5)
        if (now < messageUntil) screen.print(message, 3, 12, 1, image.font5)
        bakeryArt.mixer(screen, mixingValue, heldKind == 0, mixingJammed)
        bakeryArt.outputStand(screen, mixingValue, held == null && !mixingJammed)
        for (let i = 0; i < 3; i++) bakeryArt.deliveryOrder(screen, i, hasDelivery[i] ? delivered[i] : -999999, targets[i], relations[i], signals[i], i == m, fulfilledAt[i] >= 0)
        if (held != null) {
            screen.drawLine(chef.x + faceX * 12, chef.y + faceY * 12, chef.x + faceX * 22, chef.y + faceY * 22, 5)
        }
        if (now - hitAt < 300) screen.drawCircle(160, 132, 32 + Math.idiv(now - hitAt, 70), 5)
        if (mixingJammed) screen.print("CHECK CODE  B:RESET", 102, 180, 2, image.font5)
        if (previewReported && now < previewUntil && held == null) {
            screen.fillRect(130, 91, 60, 18, 1); screen.drawRect(130, 91, 60, 18, 2); screen.print(numberText(previewValue), 149, 96, 2, image.font8)
        }
        if (shiftDone) {
            screen.fillRect(39, 60, 242, 113, 14); screen.fillRect(42, 63, 236, 107, 1)
            screen.printCenter("THREE YES ORDERS!", 77, 14)
            screen.printCenter("Keep your number. New checks next.", 111, 14, image.font5)
            screen.printCenter("A: next round", 145, 14)
        }
    }
    game.onUpdate(function () {
        if (!started) return
        let now = control.millis(), dt = Math.min(80, now - lastTick); lastTick = now
        moveAroundPot(); bakeryArt.conveyorTreads(scene.backgroundImage(), Math.idiv(now * 15, 1000))
        chef.setImage(bakeryArt.chef(Math.abs(chef.vx) + Math.abs(chef.vy) > 1 ? Math.idiv(now, 130) % 3 : 0))
        if (!shiftDone) { updatePackets(dt); updateShots() }
        if (held != null) held.setPosition(Math.max(34, Math.min(286, chef.x + (chef.x < 160 ? -34 : 34))), chef.y - 16)
    })
    game.onShade(function () { if (started) drawHud() })
    control.runInParallel(function () {
        pause(100); bakeryArt.installPalette(); scene.setBackgroundImage(bakeryArt.drawBackground())
        chef = sprites.create(bakeryArt.chef(), SpriteKind.Player); chef.setPosition(160, 190); chef.z = 10
        controller.moveSprite(chef, 95, 95); lastTick = control.millis(); started = true; startShift(); trace("world-ready")
    })
}
