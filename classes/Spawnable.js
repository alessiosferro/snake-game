export class Spawnable {
    #x;
    #y;
    #size;
    #color;

    constructor(size, color) {
        this.#size = size;
        this.#color = color;
    }

    changeSpawnableCoords() {
        this.x = (Math.round(Math.random() * 100) % 15) * this.#size;
        const y = (Math.round(Math.random() * 100) % 15) * this.#size;
        this.y = y < 96 ? 96 : y;
    }

    get color() {
        return this.#color;
    }

    set x(x) {
        this.#x = x;
    }

    set y(y) {
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
}
