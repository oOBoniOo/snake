import { Objets } from "../state/Objets";
import { Point } from "../types/Point";
import { angleToRad } from "../utils/angleToRad";
import { Actor, IActor } from "./Actor";
import { Snake } from "./Snake";
const appleImg = require("../assets/sprites/snake_64.png");

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
    let snakePos = this.snake.position;
    let myPos = this.position;

    if (this.position.x == snakePos.x && this.position.y == snakePos.y) {
      console.log("TOCADO");
      this.touched = true;
      this.snake.updateLenght();
    }
  }
  draw(delta: number, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#d31062";
    ctx.lineWidth = 1;
    ctx.fillRect(
      (this.position.x - 1) * this.blockSize,
      (this.position.y - 1) * this.blockSize,
      this.blockSize,
      this.blockSize
    );
    ctx.drawImage(
      this.image,
      0 * 64,
      4 * 64,
      32,
      32,
      (this.position.x - 1) * this.blockSize,
      (this.position.y - 1) * this.blockSize,
      this.blockSize,
      this.blockSize
    );
  }
}
