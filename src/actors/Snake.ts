import { Actor, IActor } from "./Actor";
import { Point } from "../types/Point";
import { Size } from "../types/Size";
import { checkLimits } from "../utils/checkLimits";
import { snakeKey, KeyboardMap } from "../utils/keyboardMap";
import { BodyPart } from "./BodyPart";

export class Snake extends Actor implements IActor {
  snakeSize: Size;
  snakeColor: string;
  snakeBody: BodyPart[];
  snakeLenght: number;
  xSpeed: number;
  ySpeed: number;
  blockSize: number;
  numBlocks: number;

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
    this.snakeLenght = 2;
    this.numBlocks = numBlocks;
    this.blockSize = blockSize;

    // this.snakeSpeed = 32;
    // this.image = new Image();
    // this.image.src = ferrariImg;
  }
  updateLenght(): void {
    this.snakeLenght += 1;
  }
  update(delta: number) {
    let newPos: Point = {
      x: this.position.x + this.xSpeed,
      y: this.position.y + this.ySpeed,
    };
    if (checkLimits(newPos)) {
      this.position = newPos;
    }
    //añadimos partes.
  }
  draw(delta: number, ctx: CanvasRenderingContext2D) {
    // for (let i = 0; i < this.snakeBody.length; i++) {
    //   let part = this.snakeBody[i];
    //   part.draw(delta, ctx);
    // }
    let cabeza = new BodyPart(this.position, this.blockSize);
    this.snakeBody.push(cabeza);
    while (this.snakeBody.length > this.snakeLenght) {
      this.snakeBody.shift();
    }

    ctx.fillStyle = this.snakeColor;

    // ctx.translate(
    //   this.position.x * this.blockSize,
    //   this.position.y * this.blockSize
    // );
    ctx.fillRect(
      (this.position.x - 1) * this.blockSize,
      (this.position.y - 1) * this.blockSize,
      this.snakeSize.h,
      this.snakeSize.w
    );
  }
  // 	draw(delta: number, ctx: CanvasRenderingContext2D) {
  // 		ctx.fillStyle = "green";
  // 		for (let i = 0; i < this.snakeBody.length; i++) {
  // 			let part = this.snakeBody[i];
  // 			ctx.translate(part.x * this.numBlocks, part.y * this.numBlocks);
  // 			ctx.fillRect(-this.blockSize/2, -this.blockSize/2, this.blockSize, this.blockSize);
  // 		}
  // 		let cabeza:Point={x:this.position.x, y:this.position.y}
  // 		this.snakeBody.push(cabeza);
  // 		while (this.snakeBody.length > this.snakeLenght) {
  // 			this.snakeBody.shift();
  // 		}

  // 		ctx.fillStyle = "orange";
  // 		ctx.translate(this.position.x * this.numBlocks, this.position.y * this.numBlocks);
  // 		ctx.fillRect(-this.blockSize/2, -this.blockSize/2, this.blockSize, this.blockSize);
  // }

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
