// Native pixel artwork for the Cake Factory world. No learner calculations.
namespace bakeryArt {
    let small = image.doubledFont(image.font5)
    let large = image.doubledFont(image.font8)
    let bowl: Image = null
    export function installPalette() {
        image.setPalette(hex`000000 FFFFFF EC3B59 F7AAC3 D98B46 F6C85F 479AA4 E7AD82 294E5A 9BD7D0 A55EEA 683C91 A8B8B5 F4E6CE 6E4638 243139`)
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
        p.fillRect(x + 3, y + 7, 8, 2, 12); p.fillRect(x + 3, y + 2, 8, 3, 3)
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
        oval(p, 13, 11, 12, 7, 3); oval(p, 13, 8, 9, 5, 1); p.fillCircle(14, 4, 3, 2); p.setPixel(13, 3, 1)
        return p
    }
    export function chef(frame: number = 0, carrying: boolean = false): Image { return bakeryIcons.chef(frame, carrying) }
    export function numericOutput(value: number): Image { return bakeryIcons.carriedNumber(value) }
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
        p.fillRect(106, 353, 39, 5, 14); p.fillRect(109, 358, 3, 16, 8); p.fillRect(138, 358, 3, 16, 8)
        p.fillCircle(111, 375, 4, 15); p.fillCircle(139, 375, 4, 15)
        p.drawTransparentImage(looseCake(), 117, 330)
        // Dock foundation visually anchors the Boolean blocks.
        p.fillRect(0, 404, 640, 76, 15); p.fillRect(0, 404, 640, 4, 4)
        for (let x = 4; x < 640; x += 16) p.drawLine(x, 404, x + 5, 408, 5)
        conveyorTreads(p, 0)
        return p
    }
    export function conveyorTreads(p: Image, offset: number) {
        for (let y = 70; y <= 187; y++) {
            let drift = (y - 70) * 0.59
            for (let c of [96 + drift, 320, 544 - drift]) {
                let x = Math.floor(c)
                p.fillRect(x - 63, y, 126, 1, 15); p.fillRect(x - 60, y, 120, 1, 12); p.fillRect(x - 54, y, 108, 1, 8)
                p.fillRect(x - 59, y, 2, 1, 1); p.fillRect(x + 57, y, 2, 1, 6)
                if ((y - offset + 10000) % 18 < 3) p.fillRect(x - 52, y, 104, 1, 6)
                if (y % 24 < 3) { p.fillRect(x - 62, y, 5, 1, 14); p.fillRect(x + 58, y, 5, 1, 14) }
            }
        }
        for (let c of [165, 320, 475]) {
            round(p, c - 66, 186, 132, 12, 15); round(p, c - 62, 186, 124, 8, 12)
            for (let x = c - 52; x < c + 56; x += 13) p.fillRect(x, 187, 4, 6, 8)
            p.fillCircle(c - 62, 190, 4, 4); p.fillCircle(c + 62, 190, 4, 4)
        }
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
        number(p, value, 320, 284, jammed ? 2 : 15)
        p.fillCircle(368, 296, 4, jammed ? 2 : 6)
    }
    export function outputStand(p: Image, value: number, ready: boolean) {
        // A short real chute connects the bowl to a numbered-output dispenser.
        p.fillRect(397, 285, 50, 12, 14); p.fillRect(397, 285, 50, 7, 12)
        for (let x = 402; x < 445; x += 9) p.fillRect(x, 287, 3, 4, 8)
        oval(p, 454, 351, 29, 7, 12)
        round(p, 427, 299, 54, 45, 15); round(p, 430, 297, 48, 42, 6)
        p.fillRect(435, 315, 38, 19, 8); p.fillRect(435, 300, 38, 3, 9)
        p.drawTransparentImage(numericOutput(value), 437, 306)
        p.fillCircle(475, 307, 3, ready ? 5 : 12)
        p.drawLine(440, 354, 447, 360, 6); p.drawLine(447, 360, 454, 354, 6)
    }
    export function sideStation(p: Image, id: number, value: number, op: number, unlocked: boolean, pulse: number, now: number) {
        let left = id < 2, x = left ? -7 : 555, y = id % 2 == 0 ? 215 : 311
        let accent = [2, 4, 5, 6][id]
        oval(p, x + 47, y + 64, 48, 8, 12)
        round(p, x, y + 7, 92, 57, 15); round(p, x + 3, y + 9, 86, 51, 14)
        p.fillRect(x + 5, y + 12, 82, 9, accent); p.fillRect(x + 8, y + 25, 76, 32, 8)
        round(p, x - 2, y, 96, 13, 12); p.fillRect(x + 2, y, 88, 4, 1)
        p.drawTransparentImage(bakeryIcons.ingredient(id), x + 12, y + 30)
        if (unlocked) {
            number(p, value, x + 49, y + 30, 13)
            round(p, x + 65, y + 29, 17, 17, 11); operator(p, op, x + 68, y + 32, 1, 2)
            p.fillRect(x + 12, y + 52, Math.idiv((12000 - now % 12000) * 67, 12000), 2, accent)
        } else { p.print("LATER", x + 38, y + 36, 12, image.font5) }
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
    export function deliveryOrder(p: Image, index: number, value: number, target: number, relation: number, signal: number, focused: boolean, complete: boolean, stage: number = -1, variable: number = -1, base: number = 0) {
        if (complete) variable = -1 // Completed checks retain their evaluated left value.
        let x = index * 212 + 8, y = 414
        hexagon(p, x, y, 200, 62, complete ? 9 : focused ? 5 : 12)
        hexagon(p, x + 3, y + 3, 194, 56, complete ? 6 : 8)
        // Rounded numeric sockets sit inside the pointed Boolean reporter.
        let leftW = variable >= 0 ? 83 : 53
        round(p, x + 25, y + 10, leftW, 29, stage == 0 ? 5 : 13)
        if (variable < 0) number(p, target, x + 51, y + 16, 15)
        else {
            number(p, base, x + 39, y + 16, 15)
            operator(p, 0, x + 54, y + 20, 15)
            p.drawTransparentImage(bakeryIcons.ingredient(variable), x + 70, y + 15)
        }
        if (variable >= 0 && stage == 0) {
            round(p, x + 27, y - 24, 80, 23, 5)
            p.print("=", x + 34, y - 18, 15, image.font8); number(p, target, x + 70, y - 20, 15)
        }
        let symbolX = variable >= 0 ? x + 115 : x + 94
        if (stage == 1) round(p, symbolX - 4, y + 9, 28, 30, 5)
        comparison(p, relation, symbolX, y + 13, stage == 1 ? 15 : 1)
        round(p, x + 147, y + 10, 29, 29, stage == 2 ? 5 : 13)
        if (value != -999999) number(p, value, x + 161, y + 16, 15)
        else { p.fillRect(x + 155, y + 26, 13, 2, 12) }
        if (stage == 3) p.print(signal == 1 ? "TRUE" : "FALSE", x + 81, y + 45, signal == 1 ? 9 : 3, image.font8)
        else if (signal == 1) { p.drawLine(x + 95, y + 48, x + 99, y + 52, 9); p.drawLine(x + 99, y + 52, x + 107, y + 44, 9) }
        else if (signal == 0) { p.drawLine(x + 97, y + 45, x + 103, y + 51, 3); p.drawLine(x + 103, y + 45, x + 97, y + 51, 3) }
        else if (focused) p.print("B CHECK", x + 74, y + 45, 5, image.font8)
        else p.drawCircle(x + 100, y + 48, 3, 12)
    }
}
