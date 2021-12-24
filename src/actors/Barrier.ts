import { Circuit } from "../state/Circuit";
import { Point } from "../types/Point";
import { angleToRad } from "../utils/angleToRad";
import { Actor, IActor } from "./Actor";

export class Barrier extends Actor {
	barrierWith: number;
	// angle: number;
	snake: IActor;
	touched: boolean;
	barrierindex: number;
	constructor(
		initialPos: Point,
		bw = 25,
		snake: IActor,
		barrierindex: number,
	) {
		super(initialPos);
		this.barrierWith = bw;
		// this.angle = angle;
		this.snake = snake;
		this.touched = false;
		this.barrierindex = barrierindex;
	}
	update() {
		let snakePos = this.snake.position;
		let myPos = this.position;
		let distance = Math.sqrt(
			Math.pow(myPos.x - snakePos.x, 2) + Math.pow(myPos.y - snakePos.y, 2),
		);
		// console.log(Circuit.currentBarrier, this.barrierindex);
		if (distance < 30) {
			if (Circuit.touchingBarrier(this.barrierindex)) {
				this.touched = true;
			}
		}
	}
	draw(delta: number, ctx: CanvasRenderingContext2D) {
		// Trasladamos y toamos el canvas según la barrera que vayamos a pintar
		ctx.translate(this.position.x, this.position.y);
		// ctx.rotate(angleToRad(this.angle));
		this.touched ? (ctx.strokeStyle = "green") : (ctx.strokeStyle = "red");
		// Pintamos una línea
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(-this.barrierWith / 2, 0);
		ctx.lineTo(this.barrierWith / 2, 0);
		ctx.arc(0, 0, 10, 0, angleToRad(360));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	}
}
