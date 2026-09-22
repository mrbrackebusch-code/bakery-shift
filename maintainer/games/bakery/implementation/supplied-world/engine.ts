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
        if (fulfilledAt[m] >= 0) return
        delivered[m] = value; hasDelivery[m] = true; signals[m] = -1; jammed[m] = false; resultUntil[m] = 0
        if (checking == m) { checking = -1; checkPhase = -1 }
        tell("Number docked. Walk over and press B to check.", 3400); trace("number-delivered")
    }
    function finishCheck(m: number) {
        checkOrder(m); resultUntil[m] = control.millis() + 850
        if (signals[m] < 0) { tell("Build this check's event to connect it."); return }
        if (signals[m] == 0) { tell("Not yet. Change a number, then B to check.", 3000); trace("order-false"); return }
        if (!consistent(m)) { jammed[m] = true; tell("That TRUE does not match. Check your code.", 4000); trace("check-mismatch"); return }
        stamps++; fulfilledAt[m] = control.millis()
        lastBonus = Math.max(1, 5 - Math.idiv(control.millis() - orderBegan[m], 15000)); coins += lastBonus
        popAt = control.millis(); popX = 108 + m * 212; popY = 426
        tell("TRUE! Statement completed."); trace("order-filled")
        if (stamps == 3) { shiftDone = true; clearPackets(); tell("Three TRUE statements! A: next round.", 100000); trace("shift-complete") }
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
        discardHeld(); checking = -1; checkPhase = -1; stamps = 0; coins = 0; shiftDone = false; previewUntil = 0; mixingJammed = false
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
        variablesActive = roundNumber > 0 && installed(BakeryAction.GreaterEqualCheck)
        if (variablesActive) {
            for (let m = 0; m < 3; m++) {
                orderVariables[m] = roundNumber == 1 && m == 0 ? 0 : Math.randomRange(0, 3); orderBases[m] = roundNumber == 1 && m == 0 ? 3 : Math.randomRange(1, 3)
                targets[m] = orderBases[m] + sideValues[orderVariables[m]]
            }
        } else orderVariables = [-1, -1, -1]
        nextOperatorChange = control.millis() + 12000
        manualAt = control.millis() + 1800; outputCooldown = control.millis() + 500
        tell(variablesActive ? "Icons are variables. Throw numbers at side counters." : "Catch a block. Hold A, aim, release to toss.", 5000); trace("shift-started")
    }
    function nearMixer(): boolean {
        let dx = chef.x - 320, dy = chef.y - 256
        return dx * dx + dy * dy < 130 * 130
    }
    function nearOrder(): number {
        if (chef == null || chef.y < 366) return -1
        return Math.max(0, Math.min(2, Math.idiv(chef.x, 212)))
    }
    function applyModifier(op: number, rhs: number) {
        if (mixingJammed) { tell("Check your mixer code. Empty hands B resets."); return }
        if (op == 3 && (rhs == 0 || mixingValue % rhs != 0)) { tell("That division needs a whole-number result."); trace("application-rejected"); return }
        let action = actionFor(op, rhs)
        if (!installed(action)) { tell("Build this modifier's event first."); trace("missing-handler"); return }
        activeOp = op; activeNumber = rhs; invoke(action, -1); activeOp = -1; activeNumber = 0
    }
    function targetX(id: number): number { return id == 0 ? 320 : id <= 3 ? bakeryArt.deliverySocketX(id - 1) : id < 6 ? 44 : 596 }
    function targetY(id: number): number { return id == 0 ? 247 : id <= 3 ? bakeryArt.deliverySocketY() : (id - 4) % 2 == 0 ? 247 : 343 }
    function chooseTarget(range: number): number {
        let chosen = -1, best = 100000
        for (let id = 0; id < 8; id++) {
            if (heldKind == 0 && id != 0 || heldKind == 1 && id == 0 || id >= 4 && !variablesActive) continue
            if (id >= 1 && id <= 3 && fulfilledAt[id - 1] >= 0) continue
            // Aim toward the whole statement; the arc and reticle use its receiving socket.
            let aimX = id >= 1 && id <= 3 ? 108 + (id - 1) * 212 : targetX(id)
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
        if (held == null) { if (nearMixer()) invoke(BakeryAction.TraySelected, -1); return }
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
        trace("item-thrown"); discardHeld(); previewUntil = 0
    })
    controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
        if (!started || shiftDone) return
        let m = nearOrder()
        if (m >= 0 && fulfilledAt[m] < 0) {
            if (!hasDelivery[m]) { tell("Toss a number into the empty socket first."); return }
            if (checking >= 0) return
            jammed[m] = false; signals[m] = -1; checking = m; checkBegan = control.millis(); checkPhase = 0
            tell("Read the left, the check, then the right.", 1200); trace("check-started"); return
        }
        if (held != null) { discardHeld(); outputCooldown = control.millis() + 1000; tell("Hands free. Catch another item."); trace("item-discarded"); return }
        if (nearMixer()) { mixingValue = mixingStart; mixingJammed = false; previewUntil = 0; tell("Mixer reset. Completed checks stay complete."); trace("mixer-reset") }
    })

    function spawn(lane: number, op: number, rhs: number, manual: boolean) {
        let p = sprites.create(manual ? bakeryArt.looseCake() : bakeryArt.modifier(op, rhs), SpriteKind.Food)
        p.setPosition(manual ? 86 : [96, 320, 544][lane], manual ? 197 : 70); p.z = 3
        packets.push(p); packetOps.push(op); packetNumbers.push(rhs); packetLanes.push(lane); packetBorn.push(control.millis()); packetManual.push(manual)
        packetImages.push(p.image); packetFallPhases.push(-1)
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
            if (held == null && Math.abs(chef.x - packets[i].x) < (packetManual[i] ? 25 : 55) && Math.abs(chef.y - 12 - packets[i].y) < 30) {
                heldOp = packetOps[i]; heldNumber = packetNumbers[i]; heldKind = 0
                held = sprites.create(packetManual[i] ? bakeryArt.looseCake() : bakeryArt.modifier(heldOp, heldNumber), SpriteKind.Food); held.z = 20
                removePacket(i, "item-picked-up"); tell("Hold A to charge. Aim at the bowl, then release."); previewUntil = 0
            }
        }
        if (held == null && !mixingJammed && installed(BakeryAction.TraySelected) && now >= outputCooldown && Math.abs(chef.x - 454) < 20 && Math.abs(chef.y - 344) < 19) {
            heldKind = 1; heldOp = -1; heldNumber = mixingValue; held = sprites.create(bakeryArt.numericOutput(heldNumber), SpriteKind.Food); held.z = 20
            outputCooldown = now + 1200; tell("Number ready! Toss to a check or an open counter.", 3400); trace("number-collected")
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
        screen.print("HOLD A: TOSS   B: CHECK / DROP", 329, 5, 12, image.font8)
        for (let i = 0; i < 3; i++) { screen.drawCircle(207 + i * 21, 11, 6, 5); if (i < stamps) screen.fillCircle(207 + i * 21, 11, 4, 5) }
        if (now < messageUntil) screen.print(message, 10, 26, 13, image.font8)
        bakeryArt.mixer(screen, mixingValue, heldKind == 0, mixingJammed, Math.idiv(now, 180))
        bakeryArt.outputStand(screen, mixingValue, held == null && !mixingJammed)
        for (let i = 0; i < 4; i++) bakeryArt.sideStation(screen, i, sideValues[i], sideOps[i], variablesActive, sideChanged[i] - now, 12000 - Math.max(0, nextOperatorChange - now))
        for (let i = 0; i < 3; i++) {
            let stage = checking == i ? checkPhase : now < resultUntil[i] ? 4 : -1
            bakeryArt.deliveryOrder(screen, i, hasDelivery[i] ? delivered[i] : -999999, targets[i], relations[i], signals[i], i == m, fulfilledAt[i] >= 0, stage, orderVariables[i], orderBases[i], checking == i ? now - checkBegan : -1, now < resultUntil[i] ? 850 - (resultUntil[i] - now) : -1)
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
        if (mixingJammed) screen.print("B: RESET MIXER", 278, 337, 2, image.font8)
        if (previewReported && now < previewUntil && held == null) {
            screen.fillRect(295, 183, 50, 25, 1); screen.drawRect(295, 183, 50, 25, 6); screen.print(numberText(previewValue), 309, 188, 8, hudFont)
        }
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
        moveAroundPot(); bakeryArt.conveyorTreads(scene.backgroundImage(), Math.idiv(now * 28, 1000))
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
