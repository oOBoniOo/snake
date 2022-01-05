import _ from "lodash";
import { Actor, IActor } from "./Actor";
import { Point } from "../types/Point";
import { Size } from "../types/Size";
import { checkLimits } from "../utils/checkLimits";
import { snakeKey, KeyboardMap } from "../utils/keyboardMap";
import { BodyPart } from "./BodyPart";
const sprite = require("../assets/sprites/snake_64.png");

export class Snake extends Actor implements IActor {
  snakeSize: Size;
  snakeColor: string;
  snakeBody: BodyPart[];
  snakeLenght: number;
  xSpeed: number;
  ySpeed: number;
  blockSize: number;
  numBlocks: number;
  image: HTMLImageElement;
  keyboardMap: KeyboardMap;
  constructor(
    initialPos: Point, //el atributo position sera la cabeza
    keyboardMap: KeyboardMap,
    size: Size = { w: 20, h: 20 },
    blockSize: number = 20,
    numBlocks: number = 25
  ) {
    super(initialPos);
    this.keyboardMap = keyboardMap;
    this.snakeSize = size;
    this.snakeColor = "#000000";
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.snakeBody = [];
    this.snakeLenght = 1;
    this.numBlocks = numBlocks;
    this.blockSize = blockSize;

    this.image = new Image();
    this.image.src = sprite;
  }
  updateLenght(): void {
    this.snakeLenght += 1;
  }
  update(delta: number) {
    let newPos: Point = {
      x: this.position.x + this.xSpeed,
      y: this.position.y + this.ySpeed,
    };
    console.log(newPos);
    if (checkLimits(newPos)) {
      this.position = newPos;
    } else {
      alert(`YOU LOOSE! Your score `);
    }

    //añadimos partes.
    let cabeza = new BodyPart(this.position, this.blockSize);
    this.snakeBody.push(cabeza);
    while (this.snakeBody.length > this.snakeLenght) {
      this.snakeBody.shift();
    }

    //comprobamos choque de serpiente
    let choque = this.snakeBody.map((el, index) => {
      if (
        this.position.x == el.position.x &&
        this.position.y == el.position.y &&
        this.snakeBody.length - 1 != index
      ) {
        return 1;
      } else {
        return 0;
      }
    });
    if (_.sum(choque) > 0) {
      alert(`YOU LOOSE! Your score `);
    }
  }
  draw(delta: number, ctx: CanvasRenderingContext2D) {
    let tx = 0;
    let ty = 0;
    if (this.xSpeed == 1) {
      tx = 4;
      ty = 0;
    }
    if (this.xSpeed == -1) {
      tx = 3;
      ty = 1;
    }
    if (this.ySpeed == 1) {
      tx = 4;
      ty = 1;
    }
    if (this.ySpeed == -1) {
      tx = 3;
      ty = 0;
    }

    ctx.drawImage(
      this.image,
      tx * 64,
      ty * 64,
      64,
      64,
      (this.position.x - 1) * this.blockSize,
      (this.position.y - 1) * this.blockSize,
      this.blockSize,
      this.blockSize
    );
    // ctx.fillStyle = this.snakeColor;
    // ctx.fillRect(
    //   (this.position.x - 1) * this.blockSize,
    //   (this.position.y - 1) * this.blockSize,
    //   this.snakeSize.h,
    //   this.snakeSize.w
    // );
  }

  keyboard_event_down(key: string) {
    let tecla = this.keyboardMap[key];
    if (tecla == snakeKey.LEFT) {
      if (this.xSpeed != 1) {
        this.xSpeed = -1;
        this.ySpeed = 0;
      }
    } else if (tecla == snakeKey.RIGHT) {
      if (this.xSpeed != -1) {
        this.xSpeed = 1;
        this.ySpeed = 0;
      }
    } else if (tecla == snakeKey.UP) {
      if (this.ySpeed != 1) {
        this.xSpeed = 0;
        this.ySpeed = -1;
      }
    } else if (tecla == snakeKey.DOWN) {
      if (this.ySpeed != -1) {
        this.xSpeed = 0;
        this.ySpeed = 1;
      }
    }
  }
}
