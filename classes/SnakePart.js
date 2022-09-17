export class SnakePart {
  #x;
  #y;
  #prevX;
  #prevY;
  #nextSnakePart;

  constructor({ x, y, prevX, prevY, nextSnakePart }) {
    this.#x = x;
    this.#y = y;
    this.#prevX = prevX;
    this.#prevY = prevY;
    this.#nextSnakePart = nextSnakePart;
  }

  updateSnakePartPosition() {
    this.#x = this.#nextSnakePart.prevX;
    this.#y = this.#nextSnakePart.prevY;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get prevX() {
    return this.#prevX;
  }

  get prevY() {
    return this.#prevY;
  }

  set x(x) {
    this.#x = x;
  }

  set y(y) {
    this.#y = y;
  }

  set prevX(x) {
    this.#prevX = x;
  }

  set prevY(y) {
    this.#prevY = y;
  }
}
