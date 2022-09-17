export class Fruit {
  #x;
  #y;

  #size;

  constructor(size) {
    this.#size = size;
    this.#changeFruitCoordinates();
  }

  #changeFruitCoordinates() {
    this.#x = (Math.round(Math.random() * 100) % 15) * this.#size;
    this.#y = (Math.round(Math.random() * 100) % 15) * this.#size;
  }

  eat() {
    this.#changeFruitCoordinates();
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }
}
