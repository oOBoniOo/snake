import { Objets } from "../state/Objets";
import { Point } from "../types/Point";
import { angleToRad } from "../utils/angleToRad";
import { Actor, IActor } from "./Actor";

export class Feed extends Actor {
	feedWith: number;
	snake: IActor;
	touched: boolean;
	//barrierindex: number;
	constructor(
		initialPos: Point,
		bw = 25,
		snake: IActor,
		//barrierindex: number,
	) {
		super(initialPos);
		this.feedWith = bw;
		// this.angle = angle;
		this.snake = snake;
		this.touched = false;
		//this.barrierindex = barrierindex;
	}
	update() {
		let snakeAngle = this.snake.angle;
		let snakePos = this.snake.position;
		let myPos = this.position;
		let xDistance = Math.abs(myPos.x - snakePos.x);
		let yDistnace = Math.abs(myPos.y - snakePos.y);

		// console.log(Circuit.currentBarrier, this.barrierindex);
		if ((snakeAngle == 90) || (snakeAngle == 270)) {
			if ((xDistance < Math.abs(30)) && (yDistnace < 2)) {
				this.touched = true;
				console.log('OBJETO',this.position)
				console.log('SNAKE',snakePos)
				console.log('TOCADAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
			}
		}
		if ((snakeAngle == 0) || (snakeAngle == 180)) {
			if ((yDistnace < Math.abs(30)) && (xDistance < 2)) {
				this.touched = true;
				console.log('OBJETO',this.position)
				console.log('SNAKE',snakePos)
				console.log('TOCADAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
			}
		}
			
	}
	draw(delta: number, ctx: CanvasRenderingContext2D) {
		// Trasladamos y toamos el canvas según la barrera que vayamos a pintar

		ctx.translate(this.position.x, this.position.y);
		// ctx.rotate(angleToRad(this.angle));
		// this.touched ? (ctx.strokeStyle = "green") : (ctx.strokeStyle = "red");
		// Pintamos una línea
		// ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(this.feedWith / 2, 0);
		//ctx.lineTo(this.feedWith / 2, 0);
		ctx.arc(0, 0, this.feedWith, 0, angleToRad(360));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	}
}
