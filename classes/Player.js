export class Player {
  #x;
  #y;
  #speed;
  #dx;
  #dy;
  #size;
  #length;

  #fruit;

  constructor(fruit) {
    this.#x = 0;
    this.#y = 0;
    this.#speed = 48;
    this.#dx = this.#speed;
    this.#dy = 0;
    this.#size = 48;
    this.#length = 1;
    this.#fruit = fruit;

    this.#setupPlayerMove();
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
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

  updatePlayerPosition(canvasWidth, canvasHeight) {
    if (this.#x + this.#size + this.#dx > canvasWidth) {
      this.#x = 0;
    } else if (this.#x + this.#dx < 0) {
      this.#x = canvasWidth - this.#size;
    } else {
      this.#x += this.#dx;
    }

    if (this.#y + this.#size + this.#dy > canvasHeight) {
      this.#y = 0;
    } else if (this.#y + this.#dy < 0) {
      this.#y = canvasHeight - this.#size;
    } else {
      this.#y += this.#dy;
    }

    if (this.#x === this.#fruit.x && this.#y === this.#fruit.y) {
      this.#fruit.eat();
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
