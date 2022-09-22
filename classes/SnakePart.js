export class SnakePart {
  #x;
  #y;
  #dx;
  #dy;
  #prevX;
  #prevY;
  #nextSnakePart;

  constructor({ x, y, dx, dy, prevX, prevY, nextSnakePart }) {
    this.#x = x;
    this.#y = y;
    this.#dx = dx;
    this.#dy = dy;
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

  get dx() {
    return this.#dx;
  }

  get dy() {
    return this.#dy;
  }

  get nextSnakePart() {
    return this.#nextSnakePart;
  }

  set nextSnakePart(snakePart) {
    this.#nextSnakePart = snakePart;
  }

  set x(x) {
    this.#x = x;
  }

  set y(y) {
    this.#y = y;
  }

  set dx(dx) {
    this.#dx = dx;
  }

  set dy(dy) {
    this.#dy = dy;
  }

  set prevX(x) {
    this.#prevX = x;
  }

  set prevY(y) {
    this.#prevY = y;
  }
}
