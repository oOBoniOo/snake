import { Point } from "../types/Point";
import { Actor, IActor } from "./Actor";

export class BodyPart extends Actor {
  size: number;
  // nextPart: Point;
  touched: boolean;
  bodyColor: string;
  //barrierindex: number;
  constructor(
    initialPos: Point,
    size = 20
    // nextPart: Point
    //barrierindex: number,
  ) {
    super(initialPos);
    this.size = size;
    // this.nextPart = nextPart;
    this.touched = false;
    this.bodyColor = "orange";
  }

  update() {
    // this.position = this.nextPart;
  }

  draw(delta: number, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.bodyColor;
    // ctx.translate(this.position.x * this.size, this.position.y * this.size);
    //ctx.beginPath();
    ctx.fillRect(
      (this.position.x - 1) * this.size,
      (this.position.y - 1) * this.size,
      this.size,
      this.size
    );
    //ctx.closePath();
    //ctx.stroke();
    //ctx.fill();
  }
}
