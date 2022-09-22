import {Spawnable} from "./Spawnable.js";

export class Fruit extends Spawnable {
  constructor(size) {
    super(size, 'green');
    super.changeSpawnableCoords();
  }

  eat() {
    super.changeSpawnableCoords();
  }
}
