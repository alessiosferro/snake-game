import { SnakePart } from "./SnakePart.js";

export class Player {
  #speed = 48;
  #size = 48;
  #length = 1;
  #score = 0;
  #enemy;
  #fruit;
  #snakeParts = [
    new SnakePart({ isHead: true, x: 0, y: 96, dx: this.#speed, dy: 0, prevX: 0, prevY: 96, nextSnakePart: null }),
  ];

  constructor(fruit, enemy) {
    this.#fruit = fruit;
    this.#enemy = enemy;
    this.#setupPlayerMove();
  }

  get speed() {
    return this.#speed;
  }

  get head() {
    return this.snakeParts[0];
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
    this.#snakeParts.forEach(part => {
      if (part.nextSnakePart) {
        part.prevX = part.x;
        part.prevY = part.y;
        part.x = part.nextSnakePart.prevX;
        part.y = part.nextSnakePart.prevY;
        return;
      }

      part.prevX = part.x;
      part.prevY = part.y;
      part.x = part.x + part.dx + this.#size > canvasWidth
          ? 0 : part.x + part.dx < 0 ? canvasWidth - this.#size : part.x + part.dx;
      part.y = part.y + part.dy + this.#size > canvasHeight
          ? 96 : part.y + part.dy < 96 ? canvasHeight - this.#size : part.y + part.dy;
    })

    this.#eatFruit();

    // detect collision with enemy
    if (this.head.x === this.#enemy.x && this.head.y === this.#enemy.y) {
      return true;
    }

    // detect collision with snake part
    for (let i = 0; i < this.#snakeParts.length; i++) {
      for (let j = i + 1; j < this.#snakeParts.length - 1; j++) {
        if (this.#snakeParts[i].x === this.#snakeParts[j].x && this.#snakeParts[i].y === this.#snakeParts[j].y) {
          return true;
        }
      }
    }

    return false;
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

    this.snakeParts.push(new SnakePart({
      x: lastSnakePart.prevX,
      y: lastSnakePart.prevY,
      isHead: false,
      prevX: lastSnakePart.prevX,
      prevY: lastSnakePart.prevY,
      dx: lastSnakePart.dx,
      dy: lastSnakePart.dy,
      nextSnakePart: lastSnakePart,
    }));
  }

  #setupPlayerMove() {
    document.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowUp" || this.head.dy !== 0) return;

      for (const part of this.snakeParts) {
        if (part.nextSnakePart) {
          part.dx = part.nextSnakePart.dx;
          part.dy = part.nextSnakePart.dy;
          return;
        }

        part.dy = part.dy - this.#speed;
        part.dx = 0;
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" || this.head.dx !== 0) return;

      for (const part of this.snakeParts) {
        if (part.nextSnakePart) {
          part.dx = part.nextSnakePart.dx;
          part.dy = part.nextSnakePart.dy;
          return;
        }

        part.dx = part.dx + this.#speed;
        part.dy = 0;
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown" || this.head.dy !== 0) return;

      for (const part of this.snakeParts) {
        if (part.nextSnakePart) {
          part.dx = part.nextSnakePart.dx;
          part.dy = part.nextSnakePart.dy;
          return;
        }

        part.dy = part.dy + this.#speed;
        part.dx = 0;
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" || this.head.dx !== 0) return;

      for (const part of this.snakeParts) {
        if (part.nextSnakePart) {
          part.dx = part.nextSnakePart.dx;
          part.dy = part.nextSnakePart.dy;
          return;
        }

        part.dx = part.dx - this.#speed;
        part.dy = 0;
      }
    });
  }
}
