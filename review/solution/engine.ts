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
        for (let y = 24; y <= 84; y++) {
            let d = Math.floor((y - 24) * 0.8)
            for (let c of [40 + d, 160, 280 - d]) {
                p.fillRect(c - 37, y, 74, 1, 14)
                p.fillRect(c - 33, y, 66, 1, 12)
                p.setPixel(c - 34, y, 1); p.setPixel(c + 33, y, 1)
            }
        }
        p.fillRect(0, 90, 320, 106, 8)
        p.fillRect(0, 85, 320, 5, 8)
        return p
    }

    // Call every frame over the static background, before tokens and chef.
    export function conveyorTreads(p: Image, pixelOffset: number) {
        for (let y = 24; y <= 84; y++) {
            let d = Math.floor((y - 24) * 0.8)
            for (let c of [40 + d, 160, 280 - d]) {
                p.fillRect(c - 37, y, 74, 1, 14)
                p.fillRect(c - 33, y, 66, 1, 12)
                p.setPixel(c - 34, y, 1); p.setPixel(c + 33, y, 1)
                if ((y + pixelOffset) % 12 == 0) p.fillRect(c - 32, y, 64, 1, 8)
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
        if (relation == 1 || relation == 3) for (let n = 0; n < 6; n++) { p.setPixel(x + 5 - n, y + n, color); p.setPixel(x + 5 - n, y + 10 - n, color) }
        if (relation == 2 || relation == 4) for (let n = 0; n < 6; n++) { p.setPixel(x + 5 + n, y + n, color); p.setPixel(x + 5 + n, y + 10 - n, color) }
        if (relation == 3 || relation == 4) p.fillRect(x, y + 12, 12, 1, color)
    }

    function printNumber(p: Image, value: number, centerX: number, topY: number, color: number, maxWidth: number) {
        if (value - value != 0) return
        let text = "" + value
        if (text.length > 6) text = text.substr(0, 6)
        let scale = text.length * 12 <= maxWidth ? 2 : 1
        let temp = image.create(text.length * (scale == 2 ? 6 : 5) + 2, 8)
        temp.print(text, 0, 0, 1, scale == 2 ? image.font8 : image.font5)
        let outWidth = text.length * (scale == 2 ? 12 : 5)
        let left = centerX - Math.idiv(outWidth, 2)
        for (let sy = 0; sy < 8; sy++) for (let sx = 0; sx < temp.width; sx++) if (temp.getPixel(sx, sy) != 0) {
            for (let dy = 0; dy < scale; dy++) for (let dx = 0; dx < scale; dx++) p.setPixel(left + sx * scale + dx, topY + sy * scale + dy, color)
        }
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

    export function mixer(p: Image, value: number, active: boolean, jammed: boolean) {
        p.fillCircle(160, 132, 31, active ? 5 : 12)
        p.fillCircle(160, 132, 27, 13)
        p.fillCircle(160, 132, 23, jammed ? 3 : 4)
        p.fillRect(126, 127, 8, 10, 14); p.fillRect(128, 129, 4, 6, 12)
        p.fillRect(186, 127, 8, 10, 14); p.fillRect(188, 129, 4, 6, 12)
        p.fillRect(140, 118, 5, 1, 1); p.fillRect(137, 120, 3, 1, 1)
          printNumber(p, value, 160, 122, 15, 54)
    }

    export function numericOutput(value: number): Image {
        let p = image.create(28, 30)
        rounded(p, 2, 3, 24, 25, 14)
        p.fillRect(5, 8, 18, 16, 13)
        p.fillRect(8, 5, 12, 4, 8)
        if (Math.floor(value) == value) printNumber(p, value, 14, 10, 15, 24)
        return p
    }

    export function outputStand(p: Image, value: number, active: boolean) {
        rounded(p, 235, 143, 34, 39, 14)
        p.fillRect(239, 150, 26, 25, active ? 6 : 8)
        p.fillRect(231, 158, 10, 3, 8)
        p.fillRect(226, 157, 7, 5, 9)
        p.drawTransparentImage(numericOutput(value), 238, 146)
        p.print("NUMBER", 236, 182, 1, image.font5)
    }

    export function deliveryOrder(p: Image, index: number, value: number, target: number, relation: number, signal: number, focused: boolean, complete: boolean) {
        let x = index * 106 + 2
        rounded(p, x, 204, 104, 36, focused ? 5 : 12)
        p.fillRect(x + 2, 206, 100, 32, focused ? 6 : 8)
        p.fillRect(x + 7, 210, 24, 17, 13)
        printNumber(p, target, x + 19, 211, 15, 24)
        comparisonGlyph(p, relation, x + 45, 211, 1)
        p.fillRect(x + 74, 210, 24, 17, 13)
        if (value != -999999) printNumber(p, value, x + 86, 211, 15, 24)
        let text = signal < 0 ? "CHECK" : signal == 0 ? "NO" : "YES"
        p.print(text, x + 7, 228, signal == 1 ? 9 : 1, image.font5)
        if (complete) { p.fillRect(x + 91, 229, 2, 6, 9); p.fillRect(x + 93, 232, 6, 2, 9) }
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
