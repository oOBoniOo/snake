import _ from "lodash";
import { IActor } from "../actors/Actor";
import { Feed } from "../actors/Feed";
// import { angleToRad } from "../utils/angleToRad";
import { Obstacle } from "../actors/Obstacle";
import { Snake } from "../actors/Snake";

class ObjetsManager {
  feeds: Feed[];
  obstacles: Obstacle[];
  maxFeed: number;
  feedInterval: number;
  snake: Snake;
  numBlocks: number;
  blockSize: number;
  //chrono: number
  constructor(actor: Snake, numBlocks: number, blockSize: number) {
    this.maxFeed = 1;
    this.feedInterval = 10;
    this.numBlocks = numBlocks;
    this.blockSize = blockSize;
    this.snake = actor;
    //this.chrono = 0;
    let feeds: Feed[] = [];
    let obstacles: Obstacle[] = [];
    let num = 5;
    for (let i = 0; i < num; i++) {
      feeds.push(
        new Feed(
          {
            x: _.random(1, numBlocks),
            y: _.random(1, numBlocks),
          },
          20,
          actor
        )
      );
      obstacles.push(
        new Obstacle(
          {
            x: _.random(1, numBlocks),
            y: _.random(1, numBlocks),
          },
          {
            w: _.random(3, 9),
            h: 1,
          },
          actor,
          _.sample([0, 90, 180, 270])
        )
      );
    }

    console.log("CIRCUIT CREATED");
    this.feeds = feeds;
    this.obstacles = obstacles;
  }
  update(delta: number) {
    //this.chrono += delta
    this.feeds = this.feeds.filter((el) => !el.touched);
    if (this.feeds.length < 5) {
      this.feeds.push(
        new Feed(
          {
            x: _.random(1, this.numBlocks),
            y: _.random(1, this.numBlocks),
          },
          20,
          this.snake
        )
      );
    }

    this.gameOver();
  }

  gameOver() {
    // 	console.log("LAP");

    let choques = this.obstacles.filter((b) => b.crashed == true);

    if (choques.length > 0) {
      alert(`YOU LOOSE! Your score `);
    }
  }

  // getChrono() {
  // 	return `${this.chrono.toFixed(1)} segundos`

  draw() {}
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

export const createObjets = (
  actor: IActor,
  numBlocks: number,
  blockSize: number
) => {
  Objets = new ObjetsManager(actor, numBlocks, blockSize);
};
