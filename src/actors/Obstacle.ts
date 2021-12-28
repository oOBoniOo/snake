import { Objets } from "../state/Objets";
import { Point } from "../types/Point";
import { angleToRad } from "../utils/angleToRad";
import { Actor, IActor } from "./Actor";
import { Size } from "../types/Size";
import _ from "lodash";
type coorde = {
		xinicial: number, xfinal:number, yinicial:number, yfinal:number
}
	
const coords = (x: number, y: number, w: number, h: number, angle: number = 0) => {
	console.log(x, y, w, h, angle);
	if (angle == 0) {
		return {xinicial:x , xfinal:x + w , yinicial:y, yfinal:y + h}
	}
	if (angle == 90) {
		return {xinicial:x-h , xfinal:x+h/2 , yinicial:y, yfinal:y + w}
	}
	if (angle == 180) {
		return {xinicial:x , xfinal:x - w , yinicial:y-h, yfinal:y}
	}
	if (angle == 270) {
		return {xinicial:x , xfinal:x + h , yinicial:y, yfinal:y - w}
	}

}

const between = (x:number, a:number, b:number)=>{
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return x >= min && x <= max;
};


export class Obstacle extends Actor {
  obstacleSize: Size; 
	snake: IActor;
  crashed: boolean;
	angle: number;
	coords: coorde
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
		this.coords = coords(this.position.x, this.position.y,this.obstacleSize.w, this.obstacleSize.h, this.angle);
		console.log('COORDENADS DE OBSTACULO:::: ', this.coords, '   ANGULOOOO: ',this.angle)
		//this.barrierindex = barrierindex;
	}
	update() {
		let snakeAngle = this.snake.angle;
		let snakePos:Point = this.snake.position;
		let myPos = this.position;
		let xDistance = Math.abs(myPos.x - snakePos.x);
		let yDistnace = Math.abs(myPos.y - snakePos.y);

		if ((between(snakePos.x, this.coords.xinicial, this.coords.xfinal)) &&
			(between(snakePos.y, this.coords.yinicial, this.coords.yfinal))) { 
			this.crashed = true;
				console.log('CHOQUEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
			}
			
		// if ((snakeAngle == 90) || (snakeAngle == 270)) {
		// 	if ((xDistance < Math.abs(30)) && (yDistnace < 2)) {
		// 		this.crashed = true;
		// 		console.log('OBSTACULO',this.position)
		// 		console.log('SNAKE',snakePos)
		// 		console.log('GAMEOVEEERRRRRRR')
		// 	}
		// }
		// if ((snakeAngle == 0) || (snakeAngle == 180)) {
		// 	if ((yDistnace < Math.abs(30)) && (xDistance < 2)) {
		// 		this.crashed = true;
		// 		console.log('OBSTACULO',this.position)
		// 		console.log('SNAKE',snakePos)
		// 		console.log('GAMEOVEEERRRRRRR')
		// 	}
		// }
  }
  
	draw(delta: number, ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = "#006aad";
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
