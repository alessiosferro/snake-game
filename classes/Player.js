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
    this.#snakeParts = [new SnakePart(0, 96)];
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
    for (const snakePart of this.#snakeParts) {
      snakePart.lastX = snakePart.x;
      snakePart.lastY = snakePart.y;

      if (snakePart.nextSnakePart) {
        snakePart.x = snakePart.nextSnakePart.prevX;
        snakePart.y = snakePart.nextSnakePart.prevY;
      } else if (snakePart.x + this.#dx + this.#size > canvasWidth) {
        snakePart.x = 0;
      } else if (snakePart.y + this.#dy + this.#size > canvasHeight) {
        snakePart.y = 96;
      } else if (snakePart.x + this.#dx < canvasWidth) {
        snakePart.x = canvasWidth - this.#size;
      } else if (snakePart.y + this.#dy < 96) {
        snakePart.y = canvasHeight - this.#size;
      }
    }

    const [firstSnakePart] = this.#snakeParts;
    const lastSnakePart = this.#snakeParts[this.#snakeParts.length - 1];

    if (
      firstSnakePart.x === this.#fruit.x &&
      firstSnakePart.y === this.#fruit.y
    ) {
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
