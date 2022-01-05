import { Point } from "../types/Point";
import { Actor, IActor } from "./Actor";

export class BodyPart extends Actor {
  size: number;
  // nextPart: Point;
  touched: boolean;
  bodyColor: string;
  constructor(
    initialPos: Point,
    size = 20
    //barrierindex: number,
  ) {
    super(initialPos);
    this.size = size;
    this.touched = false;
    this.bodyColor = "orange";
  }

  update() {}

  draw(delta: number, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.bodyColor;
    // ctx.translate(this.position.x * this.size, this.position.y * this.size);
    //ctx.beginPath();
    ctx.lineWidth = 1;
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
