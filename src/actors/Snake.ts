import _ from "lodash";
import { Actor, IActor } from "./Actor";
import { Point } from "../types/Point";
import { Size } from "../types/Size";
import { checkLimits } from "../utils/checkLimits";
import { snakeKey, KeyboardMap } from "../utils/keyboardMap";
import { BodyPart } from "./BodyPart";
import { Objets } from "../state/Objets";
const sprite = require("../assets/sprites/snake_64.png");

//Esta es la clase principal de la serpiente donde tendremos la posicion de la cabeza de la serpiente de la
//serpiente, controlaremos los puntos de parada por choques con cualquier element y pintaremos segun la direccion y posiciones de otras de la
//partes del cuerpo.

export class Snake extends Actor implements IActor {
  snakeSize: Size;
  snakeBody: BodyPart[];
  snakeLenght: number;
  xSpeed: number;
  ySpeed: number;
  blockSize: number;
  numBlocks: number;
  image: HTMLImageElement;
  keyboardMap: KeyboardMap;
  counter: number;
  velocity: number;
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
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.snakeBody = [];
    this.snakeLenght = 2;
    this.numBlocks = numBlocks;
    this.blockSize = blockSize;
    this.counter = 0;
    this.image = new Image();
    this.image.src = sprite;
    this.velocity = 8;
  }

  update(delta: number) {
    this.counter += 1;
    let newPos: Point = {
      x: this.position.x + this.xSpeed,
      y: this.position.y + this.ySpeed,
    };

    if (this.counter % this.velocity == 0) {
      if (checkLimits(newPos)) {
        this.position = newPos;
      } else {
        alert(`GAME OVER! Puntuación: ${Objets.points} \n\nPulsa "Aceptar" para volver a empezar.`);
        location.reload();
      }
      if (Objets.gameover) {
        alert(`GAME OVER! Puntuación: ${Objets.points} \n\nPulsa "Aceptar" para volver a empezar.`);
        location.reload();
      }
      //añadimos partes.
      let cabeza = new BodyPart(this.position, this.blockSize, this.xSpeed, this.ySpeed);
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
        alert(`GAME OVER! Puntuación: ${Objets.points} \n\nPulsa "Aceptar" para volver a empezar.`);
        location.reload();
      }
    }
  }
  //en el pintado de la serpiente diferenciamos la cabeza, cola y partes intermedias.

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
    this.snakeBody.map((el, index) => {
      if (index != this.snakeBody.length - 1) {
        if (index == 0) {
          //pintamos la cola.
          if (this.snakeBody[index + 1].position.x > el.position.x) {
            tx = 4;
            ty = 2;
          }
          if (this.snakeBody[index + 1].position.x < el.position.x) {
            tx = 3;
            ty = 3;
          }
          if (this.snakeBody[index + 1].position.y > el.position.y) {
            tx = 4;
            ty = 3;
          }
          if (this.snakeBody[index + 1].position.y < el.position.y) {
            tx = 3;
            ty = 2;
          }
          ctx.drawImage(
            this.image,
            tx * 64,
            ty * 64,
            64,
            64,
            (el.position.x - 1) * this.blockSize,
            (el.position.y - 1) * this.blockSize,
            this.blockSize,
            this.blockSize
          );
        } else {
          if (
            (this.snakeBody[index + 1].xSpeed == 1 && el.xSpeed == 1) ||
            (this.snakeBody[index + 1].xSpeed == -1 && el.xSpeed == -1)
          ) {
            tx = 1;
            ty = 0;
          }
          if (
            (this.snakeBody[index + 1].ySpeed == 1 && el.ySpeed == 1) ||
            (this.snakeBody[index + 1].ySpeed == -1 && el.ySpeed == -1)
          ) {
            tx = 2;
            ty = 1;
          }
          if (
            (el.xSpeed == 1 && this.snakeBody[index + 1].ySpeed == 1) ||
            (el.ySpeed == -1 && this.snakeBody[index + 1].xSpeed == -1)
          ) {
            tx = 2;
            ty = 0;
          }
          if (
            (el.xSpeed == 1 && this.snakeBody[index + 1].ySpeed == -1) ||
            (el.ySpeed == 1 && this.snakeBody[index + 1].xSpeed == -1)
          ) {
            tx = 2;
            ty = 2;
          }
          if (
            (el.xSpeed == -1 && this.snakeBody[index + 1].ySpeed == 1) ||
            (el.ySpeed == -1 && this.snakeBody[index + 1].xSpeed == 1)
          ) {
            tx = 0;
            ty = 0;
          }
          if (
            (el.xSpeed == -1 && this.snakeBody[index + 1].ySpeed == -1) ||
            (el.ySpeed == 1 && this.snakeBody[index + 1].xSpeed == 1)
          ) {
            tx = 0;
            ty = 1;
          }

          ctx.drawImage(
            this.image,
            tx * 64,
            ty * 64,
            64,
            64,
            (el.position.x - 1) * this.blockSize,
            (el.position.y - 1) * this.blockSize,
            this.blockSize,
            this.blockSize
          );
        }
      }
    });
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
