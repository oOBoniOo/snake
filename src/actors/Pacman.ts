import { Actor, IActor } from "./Actor";
import { Point } from "./types/Point";
import { angleToRad } from "./utils/angleToRad";

export class Pacman extends Actor implements IActor {
	pacmanSize: number;
	mouthOpen: number;
	origin: Point;
	color: string;
	maxSpeed: number;
	speed: Point;
	constructor(initialPos: Point, color = "yellow", initialMaxSpeed = 10) {
		super(initialPos);
		this.pacmanSize = 30;
		this.mouthOpen = 20;
		this.origin = { x: initialPos.x, y: initialPos.y };
		this.color = color;
		this.maxSpeed = initialMaxSpeed * 10;
		this.speed = { x: this.maxSpeed, y: 0 };
	}
	update(delta: number) {
		this.mouthOpen += 0.8;

		// Set X position
		let newPosX = this.origin.x + this.speed.x * delta;
		if (newPosX < 1024 && newPosX >= 0) {
			this.origin.x = newPosX;
		}

		// Set Y position
		let newPosY = this.origin.y + this.speed.y * delta;
		this.origin.y = newPosY;
	}
	keyboard_event(key: string) {
		switch (key) {
			case `ArrowRight`:
				console.log("right");
				this.speed.x = this.maxSpeed;
				this.speed.y = 0;
				break;
			case `ArrowLeft`:
				console.log("left");
				this.speed.x = -this.maxSpeed;
				this.speed.y = 0;
				break;
			case `ArrowUp`:
				console.log("up");
				this.speed.y = -this.maxSpeed;
				this.speed.x = 0;
				break;
			case `ArrowDown`:
				console.log("down");
				this.speed.y = this.maxSpeed;
				this.speed.x = 0;
				break;
		}
	}

	draw(delta: number, ctx: CanvasRenderingContext2D) {
		let origin = this.origin;
		let pacmanSize = this.pacmanSize;
		let mouthOpen = this.mouthOpen;

		let open = 20 * Math.sin(10 * this.mouthOpen * delta) + 40;

		// Controlamos la dirección del PACMAN
		let direction = 0;
		if (this.speed.x != 0 && this.speed.x < 0) {
			direction = 180;
		}
		if (this.speed.y != 0 && this.speed.y < 0) {
			direction = -90;
		}
		if (this.speed.y != 0 && this.speed.y > 0) {
			direction = 90;
		}

		ctx.strokeStyle = "black";
		ctx.lineWidth = 4;
		ctx.save();
		ctx.translate(origin.x, origin.y);

		ctx.beginPath();

		ctx.font = "18px Arial";
		ctx.fillText(`SX:${this.speed.x} SY:${this.speed.y}`, 40, 0);

		ctx.rotate(angleToRad(direction));
		ctx.fillStyle = this.color;
		ctx.arc(0, 0, pacmanSize, angleToRad(-open), angleToRad(open), true);
		ctx.lineTo(0, 0);
		// ctx.lineTo(origin.x + pacmanSize, origin.y + mouthOpen);
		// ctx.moveTo(origin.x, origin.y);
		// ctx.lineTo(origin.x + pacmanSize, origin.y - mouthOpen);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		ctx.restore();
	}
}
