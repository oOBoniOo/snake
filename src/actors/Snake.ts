import { Actor, IActor } from "./Actor";
import { Point } from "../types/Point";
import { angleToRad } from "../utils/angleToRad";
import { checkLimits } from "../utils/checkLimits";
import { snakeKey, KeyboardMap } from "../utils/keyboardMap";
const ferrariImg = require("../assets/ferrari.png");

type Size = { w: number; h: number };

export class Snake extends Actor implements IActor {
	snakeSize: Size;
	snakeColor: string;
	angle: number;
	// angleSpeed: number;
	snakeSpeed: number;
	// snakeAcceleration: number;
	image: HTMLImageElement;
	keyboardMap: KeyboardMap;
	constructor(
		initialPos: Point,
		keyboardMap: KeyboardMap,
		size: Size = { w: 50, h: 50 },
	) {
		super(initialPos);
		this.keyboardMap = keyboardMap;
		this.snakeSize = size;
		this.snakeColor = "red";
		this.angle = 0;
		// this.angleSpeed = 0;
		this.snakeSpeed = 3;
		// this.snakeAcceleration = 0;

		// snake image
		this.image = new Image();
		this.image.src = ferrariImg;
	}
	update(delta: number) {
		// (this.angle >= 360) ? 0 : this.angle;
		// this.angle += this.angleSpeed;
		// this.angleSpeed *= 0.1;
		// Establecemos una velocidad en relación a la aceleración
		//this.snakeSpeed = this.snakeSpeed * 0.9 + this.snakeAcceleration;
		// console.log(this.snakeSpeed);
		let newPos: Point = {
			x: this.position.x + Math.cos(angleToRad(this.angle)) * this.snakeSpeed,
			y: this.position.y + Math.sin(angleToRad(this.angle)) * this.snakeSpeed,
		};
		if (checkLimits(newPos)) {
			this.position = newPos;
		}
		console.log(this.angle);
	}
	draw(delta: number, ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = this.snakeColor;
		ctx.translate(this.position.x, this.position.y);
		ctx.rotate(angleToRad(this.angle));
		ctx.rotate(angleToRad(180));
		ctx.fillRect(
			-this.snakeSize.h / 2,
			-this.snakeSize.w / 2,
			this.snakeSize.h,
			this.snakeSize.w,
		);
	}
	angleUpdate(angle:number) {
		if (this.angle == 0) {
			return (angle >=0) ? 90:270
		}
	}
	keyboard_event_down(key: string) {
		let tecla = this.keyboardMap[key];
		if (tecla == snakeKey.LEFT) {
			(this.angle == 90) ? this.angle = 180 : true;
			(this.angle == 270) ? this.angle = 180 : true;
		} else if (tecla == snakeKey.RIGHT) {
			(this.angle == 90) ? this.angle = 0 : true;
			(this.angle == 270) ? this.angle = 0 : true;
		} else if (tecla == snakeKey.UP) {
			(this.angle == 180) ? this.angle = 270 : true;
			(this.angle == 0) ? this.angle = 270 : true;
		} else if (tecla == snakeKey.DOWN) {
			(this.angle == 180) ? this.angle = 90 : true;
			(this.angle == 0) ? this.angle = 90 : true;
		}
	}
	// keyboard_event_up(key: string) {
	// 	let tecla = this.keyboardMap[key];
	// 	if (tecla == snakekey.UP) {
	// 		this.snakeAcceleration = 0;
	// 	} else if (tecla == snakekey.DOWN) {
	// 		this.snakeAcceleration = 0;
	// 	}
	// }
}
