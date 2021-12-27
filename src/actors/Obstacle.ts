import { Objets } from "../state/Objets";
import { Point } from "../types/Point";
import { angleToRad } from "../utils/angleToRad";
import { Actor, IActor } from "./Actor";
import { Size } from "../types/Size";
const coords = (x:number,y:number, w:number,h:number, angle:number) => {
	if (angle == 0) {
		let xI = x
		let xF = x + w
		let yI = y
		let yF = y + h
	}
	if (angle == 90) {
		let xI = x
		let xF = x + h
		let yI = y
		let yF = y + w
	}
	if (angle == 180) {
		let xI = x
		let xF = x - w
		let yI = y
		let yF = y + h
	}
	if (angle == 270) {
		let xI = x
		let xF = x + h
		let yI = y
		let yF = y - w
	}
	return

}



export class Obstacle extends Actor {
  obstacleSize: Size; 
	snake: IActor;
  crashed: boolean;
	angle: number;
	//coords: {xi:number, xf:number, yi:number, yf:number}
	//barrierindex: number;
	constructor(
		initialPos: Point,
    size = {w:25, h:5},
    snake: IActor,
    angle = 0
		//barrierindex: number,
	) {
		super(initialPos);
    this.obstacleSize = size;
		this.angle = angle;
		this.snake = snake;
		this.crashed = false;
	
		//this.barrierindex = barrierindex;
	}
	update() {
		let snakeAngle = this.snake.angle;
		let snakePos = this.snake.position;
		let myPos = this.position;
		let xDistance = Math.abs(myPos.x - snakePos.x);
		let yDistnace = Math.abs(myPos.y - snakePos.y);

		if ((snakeAngle == 90) || (snakeAngle == 270)) {
			if ((xDistance < Math.abs(30)) && (yDistnace < 2)) {
				this.crashed = true;
				console.log('OBSTACULO',this.position)
				console.log('SNAKE',snakePos)
				console.log('GAMEOVEEERRRRRRR')
			}
		}
		if ((snakeAngle == 0) || (snakeAngle == 180)) {
			if ((yDistnace < Math.abs(30)) && (xDistance < 2)) {
				this.crashed = true;
				console.log('OBSTACULO',this.position)
				console.log('SNAKE',snakePos)
				console.log('GAMEOVEEERRRRRRR')
			}
		}
  }
  
	draw(delta: number, ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = "blue";
		ctx.translate(this.position.x, this.position.y);
		ctx.beginPath();
		//ctx.moveTo(this.obstacleSize.w / 2, 0);
		ctx.rotate(angleToRad(this.angle));
		//ctx.rotate(angleToRad(180));
		ctx.fillRect(
			0,
			0,
			this.obstacleSize.w,
			this.obstacleSize.h,
		);
	}
}
