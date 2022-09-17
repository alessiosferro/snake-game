import { Player } from "./Player.js";

export class Game {
  #canvas;
  #ctx;
  #player;

  constructor() {
    this.#setup();
  }

  #setup() {
    this.#canvas = document.querySelector("#canvas");
    this.#ctx = this.#canvas.getContext("2d");

    this.#player = new Player();
  }

  #drawGrid() {
    this.#ctx.strokeStyle = "gray";
    this.#ctx.lineWidth = 1;

    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        this.#ctx.strokeRect(i * 48, j * 48, 48, 48);
      }
    }
  }

  run() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#drawGrid();

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
