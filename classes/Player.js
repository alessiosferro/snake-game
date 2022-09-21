import { SnakePart } from "./SnakePart.js";

export class Player {
  #speed;
  #size;
  #length;
  #score;
  #snakeParts;
  #fruit;

  constructor(fruit) {
    this.#speed = 48;
    this.#size = 48;
    this.#length = 1;
    this.#fruit = fruit;
    this.#score = 0;

    this.#snakeParts = [
      new SnakePart({
        x: 0,
        dx: this.#speed,
        dy: 0,
        y: 96,
        prevX: 0,
        prevY: 96,
        nextSnakePart: null,
      }),
    ];

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
    this.#snakeParts = this.#snakeParts.map((snakePart) => {
      if (snakePart.nextSnakePart) {
        return new SnakePart({
          ...snakePart,
          prevX: snakePart.x,
          prevY: snakePart.y,
          x: snakePart.nextSnakePart.prevX,
          y: snakePart.nextSnakePart.prevY,
        });
      }

      return new SnakePart({
        ...snakePart,
        prevX: snakePart.x,
        prevY: snakePart.y,
        x:
          snakePart.x + snakePart.dx + this.#size > canvasWidth
            ? 0
            : snakePart.x + snakePart.dx < 0
            ? canvasWidth - this.#size
            : snakePart.x + snakePart.dx,
        y:
          snakePart.y + snakePart.dy + this.#size > canvasHeight
            ? 96
            : snakePart.y + snakePart.dy < 96
            ? canvasHeight - this.#size
            : snakePart.y + snakePart.dy,
      });
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
      if (event.key !== "ArrowUp") return;

      this.snakeParts.map((snakePart) => ({
        ...snakePart,
        ...(snakePart.nextSnakePart
          ? {
              dx: snakePart.nextSnakePart.dx,
              dy: snakePart.nextSnakePart.dy,
            }
          : {
              dy: snakePart.dy - this.#speed,
              dx: 0,
            }),
      }));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight") return;

      this.snakeParts.map((snakePart) => ({
        ...snakePart,
        ...(snakePart.nextSnakePart
          ? {
              dx: snakePart.nextSnakePart.dx,
              dy: snakePart.nextSnakePart.dy,
            }
          : {
              dx: snakePart.dx + this.#speed,
              dy: 0,
            }),
      }));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown") return;

      this.snakeParts.map((snakePart) => ({
        ...snakePart,
        ...(snakePart.nextSnakePart
          ? {
              dx: snakePart.nextSnakePart.dx,
              dy: snakePart.nextSnakePart.dy,
            }
          : {
              dx: 0,
              dy: snakePart.dy + this.#speed,
            }),
      }));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft") return;

      this.snakeParts.map((snakePart) => ({
        ...snakePart,
        ...(snakePart.nextSnakePart
          ? {
              dx: snakePart.nextSnakePart.dx,
              dy: snakePart.nextSnakePart.dy,
            }
          : {
              dx: snakePart.dx - this.#speed,
              dy: 0,
            }),
      }));
    });
  }
}
