import { Point } from "../types/Point";
import { Actor, IActor } from "./Actor";

/* con esta clase crearemos cada una de las partes del cuerpo de la serpiente*/

export class BodyPart extends Actor {
  size: number;
  // nextPart: Point;
  touched: boolean;
  bodyColor: string;
  xSpeed: number;
  ySpeed: number;
  constructor(initialPos: Point, size = 20, xSpeed: number, ySpeed: number) {
    super(initialPos);
    this.size = size;
    this.touched = false;
    this.bodyColor = "orange";
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }

  update() {}

  draw(delta: number, ctx: CanvasRenderingContext2D) {}
}
