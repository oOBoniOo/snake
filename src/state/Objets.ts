import _ from "lodash";
import { IActor } from "../actors/Actor";
import { Feed } from "../actors/Feed";
import { angleToRad } from "../utils/angleToRad";


class ObjetsManager {
	feeds: Feed[];
	maxFeed: number;
	feedInterval:number = 0;
	//chrono: number
	constructor(actor: IActor) {
		this.maxFeed = 1;
		this.feedInterval = 10;
		//this.chrono = 0;
		let feeds: Feed[] = [];
		let num = 2;
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
		}
		console.log("CIRCUIT CREATED");
		this.feeds = feeds;
	}
	update(delta: number) {
		//this.chrono += delta
		this.feeds = this.feeds.filter((el) => !el.touched)

	}

	
	// addLap() {
	// 	console.log("LAP");
	// 	//this.currentLap++;
	// 	this.currentBarrier = 0;
	// 	this.barriers.forEach((b) => (b.touched = false));

	// 	if (this.currentLap >= 1) {
	// 		alert(`YOU WON! Your score ${this.getChrono()}`);
	// 	}
	// }

	// getChrono() {
	// 	return `${this.chrono.toFixed(1)} segundos`
	// }

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
