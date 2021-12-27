import _ from "lodash";
import { IActor } from "../actors/Actor";
import { Feed } from "../actors/Feed";
import { angleToRad } from "../utils/angleToRad";
import { Obstacle } from "../actors/Obstacle";


class ObjetsManager {
	feeds: Feed[];
	obstacles: Obstacle[];
	maxFeed: number;
	feedInterval:number = 0;
	//chrono: number
	constructor(actor: IActor) {
		this.maxFeed = 1;
		this.feedInterval = 10;
		//this.chrono = 0;
		let feeds: Feed[] = [];
		let obstacles: Obstacle[] = [];
		let num = 5;
		for (let i = 0; i < num; i++) {
			feeds.push(
				new Feed(
					{
						x: _.random(1, 1024),
						y: _.random(1,1024),
					},
					_.random(3, 12),
					actor,

				),
			);
			obstacles.push(
				new Obstacle(
					{
						x: _.random(100, 924),
						y: _.random(100, 924),
					},
					{
						w: _.random(100, 500),
						h: 40,
					},
					actor,
					_.sample([0, 90, 180, 270])
				),
			);
			
		}

		
		console.log("CIRCUIT CREATED");
		this.feeds = feeds;
		this.obstacles = obstacles;
	}
	update(delta: number) {
		//this.chrono += delta
		this.feeds = this.feeds.filter((el) => !el.touched)
		this.gameOver();
	}

	
	gameOver() {
	// 	console.log("LAP");
	// 	//this.currentLap++;
	// 	this.currentBarrier = 0;
	 	let choques = this.obstacles.filter((b) => (b.crashed == true));
		console.log('obstaculos : ', choques)
	 	if (choques.length > 0) {
				alert(`YOU LOOSE! Your score `);
				
	 	}
	 }

	// getChrono() {
	// 	return `${this.chrono.toFixed(1)} segundos`

	draw() { }
	// touchingBarrier(idx: number) {
	// 	if (this.currentBarrier == idx) {
	// 		this.currentBarrier++;
	// 		// if (this.currentBarrier == this.barriers.length) {
	// 		// 	this.addLap();
	// 		// }
	// 		return true;
	// 	}
	// 	return false;
	// }
}

export let Objets: ObjetsManager;

export const createCircuit = (actor: IActor) => {
	Objets = new ObjetsManager(actor);
};
