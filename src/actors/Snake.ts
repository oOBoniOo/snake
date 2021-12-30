import { Actor, IActor } from "./Actor";
import { Point } from "../types/Point";
import { Size } from "../types/Size";
import { angleToRad } from "../utils/angleToRad";
import { checkLimits } from "../utils/checkLimits";
import { snakeKey, KeyboardMap } from "../utils/keyboardMap";
const ferrariImg = require("../assets/ferrari.png");


export class Snake extends Actor implements IActor {
	snakeSize: Size;
	snakeColor: string;
	angle: number;
	snakeSpeed: number;
	image: HTMLImageElement;
	keyboardMap: KeyboardMap;
	constructor(
		initialPos: Point,
		keyboardMap: KeyboardMap,
		size: Size = { w: 35, h: 35 },
	) {
		super(initialPos);
		this.keyboardMap = keyboardMap;
		this.snakeSize = size;
		this.snakeColor = "#000000";
		this.angle = 0;
		this.snakeSpeed = 3;
		this.image = new Image();
		this.image.src = ferrariImg;
	}
	update(delta: number) {
		let newPos: Point = {
			x: this.position.x + Math.cos(angleToRad(this.angle)) * this.snakeSpeed,
			y: this.position.y + Math.sin(angleToRad(this.angle)) * this.snakeSpeed,
		};
		if (checkLimits(newPos)) {
			this.position = newPos;
		}
		console.log('Angulo snake: ',this.angle);
	}
	draw(delta: number, ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = this.snakeColor;
		ctx.translate(this.position.x, this.position.y);
		ctx.rotate(angleToRad(this.angle));
		//ctx.rotate(angleToRad(180));
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

}
