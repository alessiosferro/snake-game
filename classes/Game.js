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

  #drawGrid() {
    this.#ctx.strokeStyle = "gray";
    this.#ctx.lineWidth = 1;

    for (let i = 0; i < this.#rowLength; i++) {
      for (let j = 0; j < this.#rowLength; j++) {
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
    this.#drawFruit();

    this.#player.updatePlayerPosition(this.#canvas.width, this.#canvas.height);

    this.#ctx.fillStyle = "black";
    this.#ctx.fillRect(
      this.#player.x,
      this.#player.y,
      this.#player.size,
      this.#player.size
    );

    setTimeout(() => this.run(), 500);
  }
}
