import _ from "lodash";
import { Map } from "./Map";
import { Point } from "../types/Point";
import { Actor, IActor } from "./Actor";
import { Size } from "../types/Size";
import { Snake } from "./Snake";
import { coorde } from "../types/Coords";

const coords = (
  x: number,
  y: number,
  w: number,
  h: number,
  angle: number = 0
): coorde => {
  let aux = 0;
  if (angle == 0) {
    if (x + w > 25) {
      aux = 25;
    } else {
      aux = x + w;
    }
    return { xinicial: x, xfinal: x + w, yinicial: y, yfinal: y };
  }
  if (angle == 90) {
    if (y + w > 25) {
      aux = 25;
    } else {
      aux = y + w;
    }
    return { xinicial: x, xfinal: x, yinicial: y, yfinal: y + w };
  }
};

const between = (x: number, a: number, b: number) => {
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return x >= min && x <= max;
};

export class Obstacle extends Actor {
  obstacleSize: Size;
  snake: Snake;
  crashed: boolean;
  angle: number;
  coords: coorde;
  blockSize: number;
  map: Map;
  //barrierindex: number;
  constructor(
    initialPos: Point,
    size: Size,
    snake: Snake,
    angle = 0,
    blockSize = 20,
    map: Map
  ) {
    super(initialPos);
    this.obstacleSize = size;
    this.angle = angle;
    this.snake = snake;
    this.crashed = false;
    this.blockSize = blockSize;
    this.coords = coords(
      this.position.x,
      this.position.y,
      this.obstacleSize.w,
      this.obstacleSize.h,
      this.angle
    );
    this.map = map;
    this.map.updateMap(this.coords, this.angle);
  }
  update() {
    let snakePos: Point = this.snake.position;

    if (
      between(snakePos.x, this.coords.xinicial, this.coords.xfinal) &&
      between(snakePos.y, this.coords.yinicial, this.coords.yfinal)
    ) {
      this.crashed = true;
      console.log("CHOQUEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    }
  }

  draw(delta: number, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#006aad";

    console.log(this.angle);
    if (this.angle == 0) {
      console.log("0");
      ctx.fillRect(
        (this.coords.xinicial - 1) * this.blockSize,
        (this.coords.yinicial - 1) * this.blockSize,
        this.obstacleSize.w * this.blockSize,
        this.obstacleSize.h * this.blockSize
      );
    }

    if (this.angle == 90) {
      console.log("90");
      ctx.fillRect(
        (this.coords.xinicial - 1) * this.blockSize,
        (this.coords.yinicial - 1) * this.blockSize,
        this.obstacleSize.h * this.blockSize,
        (this.obstacleSize.w + 1) * this.blockSize
      );
    }
  }
}
