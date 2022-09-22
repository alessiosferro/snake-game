import { SnakePart } from "./SnakePart.js";

export class Player {
  #speed = 48;
  #size = 48;
  #length = 1;
  #score = 0;
  #fruit;
  #snakeParts = [
    new SnakePart({ x: 0, y: 96, dx: this.#speed, dy: 0, prevX: 0, prevY: 96, nextSnakePart: null }),
  ];


  constructor(fruit) {
    this.#fruit = fruit;
    this.#setupPlayerMove();
  }

  get speed() {
    return this.#speed;
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
      prevX: lastSnakePart.prevX,
      prevY: lastSnakePart.prevY,
      dx: lastSnakePart.dx,
      dy: lastSnakePart.dy,
      nextSnakePart: lastSnakePart,
    }));
  }

  #setupPlayerMove() {
    document.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowUp") return;

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
      if (event.key !== "ArrowRight") return;

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
      if (event.key !== "ArrowDown") return;

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
      if (event.key !== "ArrowLeft") return;

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
