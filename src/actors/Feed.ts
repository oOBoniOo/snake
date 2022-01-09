import { Objets } from "../state/Objets";
import { Point } from "../types/Point";
import { angleToRad } from "../utils/angleToRad";
import { Actor, IActor } from "./Actor";
import { Snake } from "./Snake";
const appleImg = require("../assets/sprites/snake_64.png");

/* La clase Feed se usara para crear cada uno de los "alimentos"
  de la serpiente que apareceran en pantalla */

export class Feed extends Actor {
  blockSize: number;
  snake: Snake;
  touched: boolean;
  image: HTMLImageElement;
  //barrierindex: number;
  constructor(initialPos: Point, bw = 20, snake: Snake) {
    super(initialPos);
    this.blockSize = bw;
    this.image = new Image();
    this.image.src = appleImg;
    this.snake = snake;
    this.touched = false;
  }
  update() {
    if (this.snake.counter % this.snake.velocity == 0) {
      //controlamos la velocidad de actualizaciónla serpiente

      //comprobamos si la serpiente invade la posicion del elemento feed.
      let snakePos = this.snake.position;
      if (this.position.x == snakePos.x && this.position.y == snakePos.y) {
        this.touched = true;
        Objets.points += 1;
        this.snake.snakeLenght += 1;
      }
    }
  }
  draw(delta: number, ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      0 * 64,
      3 * 64,
      64,
      64,
      (this.position.x - 1) * this.blockSize,
      (this.position.y - 1) * this.blockSize,
      this.blockSize,
      this.blockSize
    );
  }
}
