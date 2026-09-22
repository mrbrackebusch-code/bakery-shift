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
            p.setPixel(6, 8, 3); p.setPixel(11, 11, 3)
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
            p.fillRect(5, 8, 8, 5, 6); p.fillRect(8, 6, 2, 7, 9)
            p.setPixel(4, 6, 9); p.setPixel(13, 7, 9); p.fillRect(7, 14, 4, 2, 6)
        }
        return p
    }

    export function carriedNumber(value: number): Image {
        let p = image.create(34, 28)
        rounded(p, 3, 6, 28, 20, 15)
        p.fillRect(5, 8, 24, 16, 13)
        p.fillRect(1, 11, 4, 9, 14); p.fillRect(29, 11, 4, 9, 14)
        p.fillRect(2, 13, 2, 5, 5); p.fillRect(30, 13, 2, 5, 5)
        p.fillRect(9, 3, 16, 4, 5); p.fillRect(11, 1, 12, 3, 14)
        let text = "" + value
        if (text.length <= 2) {
            let temp = image.create(text.length * 6 + 2, 8)
            temp.print(text, 0, 0, 15, image.font8)
            let left = 17 - text.length * 6
            for (let y = 0; y < 8; y++) for (let x = 0; x < temp.width; x++) if (temp.getPixel(x, y) != 0) p.fillRect(left + x * 2, 9 + y * 2, 2, 2, 15)
        } else {
            if (text.length > 6) text = text.substr(0, 4) + ".."
            let font = text.length > 4 ? image.font5 : image.font8
            p.print(text, 17 - Math.idiv(text.length * font.charWidth, 2), 12, 15, font)
        }
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
}
