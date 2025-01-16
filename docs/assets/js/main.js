class Gradient {
    constructor(startHex, endHex) {
        this.start = this._hexToRgb(startHex);
        this.end = this._hexToRgb(endHex);
        this.nextRgb = [
            this._random(this.start[0], this.end[0]),
            this._random(this.start[1], this.end[1]),
            this._random(this.start[2], this.end[2]),
        ];
        this.direction = [
            Math.random() < 0.5 ? 1 : -1,
            Math.random() < 0.5 ? 1 : -1,
            Math.random() < 0.5 ? 1 : -1,
        ];
        this.selectedColumn = Math.floor(Math.random() * 3);
        this.updateCount = 0;
    }

    _random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    _hexToRgb(hex) {
        if (hex.length === 6) {
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            return [r, g, b];
        } else {
            throw new Error(`Invalid HEX: ${hex}`);
        }
    }

    _rgbToHex(r, g, b) {
        const toHex = (value) => value.toString(16).padStart(2, '0').toUpperCase();
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    next() {
        if (this.nextRgb[this.selectedColumn] + 1 > this.end[this.selectedColumn]) {
            this.direction[this.selectedColumn] = -1;
        } else if (this.nextRgb[this.selectedColumn] - 1 < this.start[this.selectedColumn]) {
            this.direction[this.selectedColumn] = 1;
        }

        this.nextRgb[this.selectedColumn] += this.direction[this.selectedColumn];
        if (this.updateCount === 50) {
            this.selectedColumn = Math.floor(Math.random() * 3);
            this.updateCount = 0;
        }
        this.updateCount++;
        return this._rgbToHex(...this.nextRgb);
    }
}

class RadialGradient {
    constructor(gradient1, gradient2, callback) {
        this.gradient1 = gradient1;
        this.gradient2 = gradient2;
        this.callback = callback;
    }

    updateBackground = () => {
        const c1 = this.gradient1.next();
        const c2 = this.gradient2.next();
        this.callback(c1, c2);
    }
}
