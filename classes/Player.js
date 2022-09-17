import { SnakePart } from "./SnakePart.js";

export class Player {
  #speed;
  #dx;
  #dy;
  #size;
  #length;
  #score;
  #snakeParts;
  #fruit;

  constructor(fruit) {
    this.#snakeParts = [
      new SnakePart({ x: 0, y: 96, prevX: 0, prevY: 96, nextSnakePart: null }),
    ];
    this.#speed = 48;
    this.#dx = this.#speed;
    this.#dy = 0;
    this.#size = 48;
    this.#length = 1;
    this.#fruit = fruit;
    this.#score = 0;

    this.#setupPlayerMove();
  }

  get speed() {
    return this.#speed;
  }

  get dx() {
    return this.#dx;
  }

  get dy() {
    return this.#dy;
  }

  get size() {
    return this.#size;
  }

  get length() {
    return this.#length;
  }

  get fruit() {
    return this.#fruit;
  }

  get score() {
    return this.#score;
  }

  get snakeParts() {
    return this.#snakeParts;
  }

  updatePlayerPosition(canvasWidth, canvasHeight) {
    this.#snakeParts = this.#snakeParts.map((snakePart) => {
      if (snakePart.nextSnakePart) {
        return {
          prevX: snakePart.x,
          prevY: snakePart.y,
          x: snakePart.nextSnakePart.prevX,
          y: snakePart.nextSnakePart.prevY,
        };
      }

      return {
        prevX: snakePart.x,
        prevY: snakePart.y,
        x:
          snakePart.x + this.#dx + this.#size > canvasWidth
            ? 0
            : snakePart.x + this.#dx < 0
            ? canvasWidth - this.#size
            : snakePart.x + this.#dx,
        y:
          snakePart.y + this.#dy + this.#size > canvasHeight
            ? 96
            : snakePart.y + this.#dy < 96
            ? canvasHeight - this.#size
            : snakePart.y + this.#dy,
      };
    });

    console.log(this.#snakeParts);

    this.#eatFruit();
  }

  #eatFruit() {
    const [firstSnakePart] = this.#snakeParts;
    const lastSnakePart = this.#snakeParts[this.#snakeParts.length - 1];

    if (
      firstSnakePart.x !== this.#fruit.x ||
      firstSnakePart.y !== this.#fruit.y
    ) {
      return;
    }

    this.#score++;
    this.#fruit.eat();

    this.#snakeParts = [
      ...this.#snakeParts,
      new SnakePart({
        x: lastSnakePart.prevX,
        y: lastSnakePart.prevY,
        nextSnakePart: lastSnakePart,
      }),
    ];
  }

  #setupPlayerMove() {
    document.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowUp" || this.#dy !== 0) return;

      this.#dy = this.#dy - this.#speed;
      this.#dx = 0;
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" || this.#dx !== 0) return;
      this.#dx = this.#dx + this.#speed;
      this.#dy = 0;
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown" || this.#dy !== 0) return;

      this.#dy = this.#dy + this.#speed;
      this.#dx = 0;
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" || this.#dx !== 0) return;

      this.#dx = this.#dx - this.#speed;
      this.#dy = 0;
    });
  }
}
