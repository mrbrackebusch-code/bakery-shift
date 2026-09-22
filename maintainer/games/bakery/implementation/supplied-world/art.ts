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

    export function largeCake(): Image {
        let p = image.create(24, 24)
        rounded(p, 4, 13, 16, 10, 14)
        p.fillRect(5, 14, 14, 7, 5)
        for (let x of [7, 11, 15, 19]) p.fillRect(x, 15, 1, 6, 4)
        rounded(p, 1, 5, 22, 12, 14)
        rounded(p, 2, 6, 20, 10, 3)
        p.fillRect(4, 7, 5, 2, 1); p.fillRect(3, 9, 2, 3, 1)
        p.fillCircle(7, 6, 3, 3); p.fillCircle(16, 6, 3, 3)
        p.fillRect(5, 14, 3, 3, 3); p.fillRect(14, 14, 3, 2, 3)
        p.fillCircle(12, 3, 3, 14); p.fillCircle(12, 3, 2, 2)
        p.setPixel(11, 2, 1); p.drawLine(13, 1, 15, 0, 6)
        p.fillRect(6, 22, 12, 1, 14)
        return p
    }

    function largeCakeLegacy(): Image {
        return img`
            . . . . . . 1 1 . . . . . . . . . . . . . . . .
            . . . . . 1 3 3 3 1 . . . . . . . . . . . . . . .
            . . . . 1 3 3 3 3 3 1 . . . . . . . . . . . . . .
            . . . 1 3 3 3 3 3 3 3 1 . . . . . . . . . . . . .
            . . 1 3 3 3 3 3 3 3 3 3 1 . . . . . . . . . . . .
            . 1 3 3 3 3 3 3 3 3 3 3 3 1 . . . . . . . . . . .
            1 3 3 3 3 3 3 3 3 3 3 3 3 3 1 . . . . . . . . . .
            1 3 3 3 3 3 3 3 3 3 3 3 3 3 1 . . . . . . . . . .
            1 3 3 3 3 3 3 3 3 3 3 3 3 3 1 . . . . . . . . . .
            1 3 3 3 3 3 3 3 3 3 3 3 3 3 1 . . . . . . . . . .
            . 1 3 3 3 3 3 3 3 3 3 3 3 3 1 . . . . . . . . . .
            . . 1 4 4 4 4 4 4 4 4 4 4 1 . . . . . . . . . .
            . . 1 4 5 5 5 5 5 5 5 5 5 4 1 . . . . . . . . . .
            . . 1 4 5 5 5 5 5 5 5 5 5 4 1 . . . . . . . . . .
            . . . 1 4 4 4 4 4 4 4 4 4 1 . . . . . . . . . . .
            . . . . 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . .
        `
    }

    export function looseCake(): Image {
        let p = image.create(16, 16)
        rounded(p, 3, 9, 10, 7, 14)
        p.fillRect(4, 10, 8, 4, 5)
        for (let x of [6, 9]) p.fillRect(x, 11, 1, 3, 4)
        rounded(p, 1, 4, 14, 8, 14)
        rounded(p, 2, 5, 12, 6, 3)
        p.fillRect(3, 6, 4, 1, 1)
        p.fillCircle(8, 2, 2, 2)
        return p
    }

    function looseCakeLegacy(): Image {
        return img`
            . . . 1 1 . . . . . . . . . .
            . . 1 3 3 3 1 . . . . . . . .
            . 1 3 3 3 3 3 1 . . . . . . .
            1 3 3 3 3 3 3 3 1 . . . . . .
            1 3 3 3 3 3 3 3 1 . . . . . .
            . 1 4 4 4 4 4 4 1 . . . . . .
            . 1 4 5 5 5 5 4 1 . . . . . .
            . . 1 4 4 4 4 1 . . . . . . .
            . . 1 1 1 1 1 1 . . . . . . .
            . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . .
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

    // The HUD, order tabs, and focused workbench are drawn separately by the caller.
    export function drawBackground(): Image {
        let p = image.create(320, 240)
        p.fill(13)
        p.fillRect(0, 0, 320, 19, 14)
        p.fillRect(0, 20, 320, 3, 8)
        for (let x of [32, 138, 244]) { p.fillRect(x, 24, 42, 2, 8); p.fillRect(x + 4, 27, 34, 2, 9) }
        for (let x of [54, 160, 266]) {
            rounded(p, x - 46, 22, 92, 79, 14)
            p.fillRect(x - 43, 24, 86, 75, 8)
            p.fillRect(x - 40, 27, 80, 66, 12)
            p.fillRect(x - 42, 94, 84, 5, 8)
            p.fillRect(x - 36, 96, 72, 1, 9)
        }
        p.fillRect(0, 101, 320, 36, 8)
        p.fillRect(0, 135, 320, 2, 9)
        p.fillRect(0, 153, 320, 3, 14)
        p.fillRect(0, 156, 320, 3, 8)
        return p
    }

    // Call every frame over the static background, before tokens and chef.
    export function conveyorTreads(p: Image, pixelOffset: number) {
        for (let x of [54, 160, 266]) p.fillRect(x - 40, 27, 80, 66, 12)
        for (let x of [54, 160, 266]) for (let row = 0; row < 5; row++) {
            let y = 29 + ((row * 13 + pixelOffset) % 63)
            p.fillRect(x - 37, y, 74, 1, 8)
            if (y < 89) {
                let dx = -2
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

    function comparisonGlyph(p: Image, relation: number, x: number, y: number, color: number) {
        if (relation == 0) { p.fillRect(x, y + 2, 11, 2, color); p.fillRect(x, y + 7, 11, 2, color) }
        if (relation == 1) for (let n = 0; n < 6; n++) { p.setPixel(x + 5 - n, y + n, color); p.setPixel(x + 5 - n, y + 10 - n, color) }
        if (relation == 2) for (let n = 0; n < 6; n++) { p.setPixel(x + 5 + n, y + n, color); p.setPixel(x + 5 + n, y + 10 - n, color) }
    }

    export function variableTray(p: Image, x: number, y: number) {
        p.fillRect(x, y, 14, 1, 1)
        p.fillRect(x, y + 1, 2, 7, 1)
        p.fillRect(x + 12, y + 1, 2, 7, 1)
        p.fillRect(x + 2, y + 7, 10, 2, 1)
        p.fillRect(x + 5, y + 3, 4, 3, 3)
        p.setPixel(x + 4, y + 4, 3); p.setPixel(x + 9, y + 4, 3)
    }

    // Blockly-style SET card, exactly 64x32.
    export function modifier(op: number, rhs: number): Image {
        let p = image.create(64, 32)
        p.fillRect(3, 0, 58, 32, 2)
        p.fillRect(1, 2, 62, 28, 2)
        p.fillRect(0, 5, 64, 22, 2)
        p.print("set", 4, 3, 1, image.font8)
        variableTray(p, 25, 3)
        p.print("to", 44, 3, 1, image.font8)
        // Nested arithmetic expression: purple socket, red tray reporter, white operator/RHS.
        rounded(p, 4, 15, 56, 15, 11)
        rounded(p, 5, 16, 54, 13, 10)
        rounded(p, 6, 17, 19, 11, 2)
        variableTray(p, 8, 18)
        operator(p, op, 29, 20, 1)
        p.fillRect(45, 17, 12, 11, 12)
        p.print("" + rhs, 48, 19, 15, image.font8)
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

    export function orderTab(p: Image, index: number, relation: number, signal: number, focused: boolean, complete: boolean, allowedOps: number = 15) {
        let x = index * 106 + 2
        rounded(p, x, 137, 104, 16, focused ? 5 : 12)
        p.fillRect(x + 2, 139, 100, 12, focused ? 6 : 8)
        if (allowedOps == 15) p.print("ORDER " + (index + 1), x + 5, 141, 1, image.font5)
        else for (let i = 0; i < 4; i++) if ((allowedOps & (1 << i)) != 0) operator(p, i, x + 8 + i * 8, 141, 1)
        comparisonGlyph(p, relation, x + 49, 140, 1)
        let state = signal < 0 ? "CHECK" : signal == 0 ? "FALSE" : "TRUE"
        p.print(state, x + 62, 141, signal == 1 ? 9 : 1, image.font5)
        if (complete) {
            p.fillRect(x + 94, 141, 2, 5, 9); p.fillRect(x + 96, 144, 5, 2, 9)
        }
    }

    export function workbench(p: Image, left: number, right: number, relation: number, activeSide: number, signal: number, complete: boolean, allowedOps: number = 15) {
        p.fillRect(0, 153, 320, 87, 14)
        p.fillRect(2, 155, 316, 72, 1)
        p.print("LEFT", 8, 158, 14, image.font8)
        p.print("RIGHT", 184, 158, 14, image.font8)
        if (activeSide == 0) { rounded(p, 50, 158, 22, 12, 2); variableTray(p, 54, 159) }
        if (activeSide == 1) { rounded(p, 238, 158, 22, 12, 2); variableTray(p, 242, 159) }

        let lf = activeSide == 0 ? 5 : 12
        let rf = activeSide == 1 ? 5 : 12
        p.fillRect(8, 170, 128, 56, 13); p.drawRect(8, 170, 128, 56, lf)
        p.fillRect(184, 170, 128, 56, 13); p.drawRect(184, 170, 128, 56, rf)
        if (activeSide == 0) p.drawRect(9, 171, 126, 54, 5)
        if (activeSide == 1) p.drawRect(185, 171, 126, 54, 5)
        if (left > 0 && left <= 6 && Math.floor(left) == left) {
            let columns = left <= 3 ? left : 3
            let rows = left <= 3 ? 1 : 2
            let groupW = columns * 26 - 2
            let groupH = rows * 26 - 2
            let originX = 8 + Math.idiv(128 - groupW, 2)
            let originY = 170 + Math.idiv(56 - groupH, 2)
            for (let i = 0; i < left; i++) p.drawTransparentImage(largeCake(), originX + (i % 3) * 26, originY + Math.idiv(i, 3) * 26)
        }
        if (right > 0 && right <= 6 && Math.floor(right) == right) {
            let columns = right <= 3 ? right : 3
            let rows = right <= 3 ? 1 : 2
            let groupW = columns * 26 - 2
            let groupH = rows * 26 - 2
            let originX = 184 + Math.idiv(128 - groupW, 2)
            let originY = 170 + Math.idiv(56 - groupH, 2)
            for (let i = 0; i < right; i++) p.drawTransparentImage(largeCake(), originX + (i % 3) * 26, originY + Math.idiv(i, 3) * 26)
        }

        let bx = 145
        p.fillRect(bx, 191, 30, 9, 8)
        p.fillRect(bx + 4, 188, 22, 15, 6)
        p.fillRect(bx + 9, 185, 12, 21, 6)
        p.setPixel(bx + 7, 189, 9); p.setPixel(bx + 22, 189, 9)
        p.setPixel(bx + 7, 201, 9); p.setPixel(bx + 22, 201, 9)
        comparisonGlyph(p, relation, 155, 190, 1)

        let text = signal < 0 ? "CHECK" : signal == 0 ? "FALSE" : "TRUE"
        p.print(text, signal < 0 ? 135 : signal == 0 ? 140 : 148, 229, signal == 1 ? 9 : 1, image.font8)
        if (complete) { p.fillRect(206, 231, 3, 7, 9); p.fillRect(209, 235, 8, 3, 9) }
        p.print("TOOLS", 210, 231, 1, image.font5)
        for (let i = 0; i < 4; i++) operator(p, i, 242 + i * 14, 230, (allowedOps & (1 << i)) != 0 ? 1 : 12)
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
