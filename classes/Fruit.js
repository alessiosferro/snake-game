export class Fruit {
  #x;
  #y;

  #size;

  constructor(size) {
    this.#size = size;
    this.#changeFruitCoordinates();
  }

  #changeFruitCoordinates() {
    this.x = (Math.round(Math.random() * 100) % 15) * this.#size;
    const y = (Math.round(Math.random() * 100) % 15) * this.#size;
    this.y = y < 96 ? 96 : y;
  }

  eat() {
    this.#changeFruitCoordinates();
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
