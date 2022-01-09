import _ from "lodash";
import { Map } from "./Map";
import { Point } from "../types/Point";
import { Actor, IActor } from "./Actor";
import { Size } from "../types/Size";
import { Snake } from "./Snake";
import { coorde } from "../types/Coords";

//esta clase se usara para implementar cada obstaculo.

//creamos unas coordenadas para los obstaculos con el fin de saber todo el espacio que ocupan en el area de juego.
const coords = (x: number, y: number, w: number, h: number, angle: number = 0): coorde => {
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
//funcion para comprobar si un numero esta en un rango conformado por otros dos.
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
  constructor(initialPos: Point, size: Size, snake: Snake, angle = 0, blockSize = 20, map: Map) {
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
    this.map.updateMap(this.coords);
  }
  update() {
    if (this.snake.counter % this.snake.velocity == 0) {
      let snakePos: Point = this.snake.position;
      //comprobacion de choque con obstaculo.
      if (
        between(snakePos.x, this.coords.xinicial, this.coords.xfinal) &&
        between(snakePos.y, this.coords.yinicial, this.coords.yfinal)
      ) {
        this.crashed = true;
      }
    }
  }

  draw(delta: number, ctx: CanvasRenderingContext2D) {}
}
