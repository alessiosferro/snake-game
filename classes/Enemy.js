import {Spawnable} from "./Spawnable.js";

export class Enemy extends Spawnable {
    constructor(size) {
        super(size, "blue");
        this.changeSpawnableCoords();
    }
}
