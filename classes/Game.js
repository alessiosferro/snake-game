import { Fruit } from "./Fruit.js";
import { Player } from "./Player.js";
import {Enemy} from "./Enemy.js";

export class Game {
  #canvas;
  #ctx;
  #player;
  #fruit;
  #cellSize;
  #rowLength;
  #gridSize;
  #enemy;

  constructor(cellSize = 48, gridSize = 720) {
    this.#cellSize = cellSize;
    this.#gridSize = gridSize;
    this.#rowLength = this.#gridSize / this.#cellSize;

    this.#setup();
  }

  #setup() {
    this.#canvas = document.querySelector("#canvas");
    this.#ctx = this.#canvas.getContext("2d");

    this.#enemy = new Enemy(this.#cellSize);
    this.#fruit = new Fruit(this.#cellSize);
    this.#player = new Player(this.#fruit, this.#enemy);
  }

  #drawScore(isGameOver) {
    this.#ctx.fillStyle = "black";
    this.#ctx.font = isGameOver ? "bold 32px Helvetica" : "bold 48px Helvetica";
    const text = isGameOver ?  `Hai perso! Punteggio finale: ${this.#player.score}` : `Punteggio: ${this.#player.score}`;
    const x = isGameOver ? 140 : 220;
    this.#ctx.fillText(text, x, 64);
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
    this.#ctx.fillStyle = this.#fruit.color;

    this.#ctx.fillRect(
      this.#fruit.x,
      this.#fruit.y,
      this.#cellSize,
      this.#cellSize
    );
  }

  #drawEnemy() {
    this.#ctx.fillStyle = this.#enemy.color;

    this.#ctx.fillRect(
        this.#enemy.x,
        this.#enemy.y,
        this.#cellSize,
        this.#cellSize
    );
  }

  run() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    this.#drawGrid();
    this.#drawFruit();
    this.#drawEnemy();

    const isGameOver = this.#player.updatePlayerPosition(this.#canvas.width, this.#canvas.height);

    for (const snakePart of this.#player.snakeParts) {
      this.#ctx.fillStyle = snakePart.isHead ? 'crimson' : 'black';
      this.#ctx.fillRect(
        snakePart.x,
        snakePart.y,
        this.#player.size,
        this.#player.size
      );
    }

    this.#drawScore(isGameOver);

    if (isGameOver) {
      return;
    }

    setTimeout(() => this.run(), 150);
  }
}
