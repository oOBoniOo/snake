import { Point } from "../types/Point";
import { Actor } from "./Actor";
import { Objets } from "../state/Objets";
const numeros = require("../assets/sprites/numbers.png");

export class PointCounter extends Actor {
  image: HTMLImageElement;
  constructor(initialPos: Point = { x: 0, y: 0 }) {
    super(initialPos);
    this.image = new Image();
    this.image.src = numeros;
  }
  update() {}
  keyboard_event() {}
  draw(delta: number, ctx: CanvasRenderingContext2D) {
    let tx = 0,
      ty = 0;
    const points = Objets.points;
    let strPoints = points.toString().split("");
    strPoints.map((el, index) => {
      if (el == "0") {
        tx = 1;
        ty = 2;
      }
      if (el == "1") {
        tx = 0;
        ty = 1;
      }
      if (el == "2") {
        tx = 1;
        ty = 1;
      }
      if (el == "3") {
        tx = 2;
        ty = 1;
      }
      if (el == "4") {
        tx = 3;
        ty = 1;
      }
      if (el == "5") {
        tx = 4;
        ty = 1;
      }
      if (el == "6") {
        tx = 5;
        ty = 1;
      }
      if (el == "7") {
        tx = 6;
        ty = 1;
      }
      if (el == "8") {
        tx = 7;
        ty = 1;
      }
      if (el == "9") {
        tx = 0;
        ty = 2;
      }

      console.log(el, index, tx, ty);
      ctx.drawImage(
        this.image,
        tx * 40,
        ty * 80,
        40,
        80,
        this.position.x + index * 8,
        this.position.y,
        8,
        16
      );
    });

    // ctx.font = "15px Arial";
    // ctx.fillStyle = "black";
    // ctx.fillText(`POINTS:${points}`, this.position.x, this.position.y);
  }
}
