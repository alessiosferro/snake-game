import { Fruit } from "./Fruit.js";
import { Player } from "./Player.js";

export class Game {
  #canvas;
  #ctx;
  #player;
  #fruit;
  #cellSize;
  #rowLength;
  #gridSize;

  constructor(cellSize = 48, gridSize = 720) {
    this.#cellSize = cellSize;
    this.#gridSize = gridSize;
    this.#rowLength = this.#gridSize / this.#cellSize;

    this.#setup();
  }

  #setup() {
    this.#canvas = document.querySelector("#canvas");
    this.#ctx = this.#canvas.getContext("2d");

    this.#fruit = new Fruit(this.#cellSize);
    this.#player = new Player(this.#fruit);
  }

  #drawScore() {
    this.#ctx.fillStyle = "black";
    this.#ctx.font = "bold 48px Helvetica";
    this.#ctx.fillText(`Punteggio: ${this.#player.score}`, 220, 64);
  }

  #drawGrid() {
    this.#ctx.strokeStyle = "gray";
    this.#ctx.lineWidth = 1;

    for (let i = 0; i < this.#rowLength; i++) {
      for (let j = 2; j < this.#rowLength + 2; j++) {
        this.#ctx.strokeRect(
          i * this.#cellSize,
          j * this.#cellSize,
          this.#cellSize,
          this.#cellSize
        );
      }
    }
  }

  #drawFruit() {
    this.#ctx.fillStyle = "green";

    this.#ctx.fillRect(
      this.#fruit.x,
      this.#fruit.y,
      this.#cellSize,
      this.#cellSize
    );
  }

  run() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    this.#drawGrid();
    this.#drawScore();
    this.#drawFruit();

    this.#player.updatePlayerPosition(this.#canvas.width, this.#canvas.height);

    this.#ctx.fillStyle = "black";

    for (const snakePart of this.#player.snakeParts) {
      this.#ctx.fillRect(
        snakePart.x,
        snakePart.y,
        this.#player.size,
        this.#player.size
      );
    }

    setTimeout(() => this.run(), 200);
  }
}
