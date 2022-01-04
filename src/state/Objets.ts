import _ from "lodash";
import { Point } from "../types/Point";
import { Feed } from "../actors/Feed";
// import { angleToRad } from "../utils/angleToRad";
import { Obstacle } from "../actors/Obstacle";
import { Snake } from "../actors/Snake";
import { Map } from "../actors/Map";

class ObjetsManager {
  feeds: Feed[];
  obstacles: Obstacle[];
  maxFeed: number;
  feedInterval: number;
  snake: Snake;
  numBlocks: number;
  blockSize: number;
  mapa: Map;
  posicionesLibres: Point[];
  //chrono: number
  constructor(snake: Snake, numBlocks: number, blockSize: number, mapa: Map) {
    this.maxFeed = 1;
    this.feedInterval = 10;
    this.numBlocks = numBlocks;
    this.blockSize = blockSize;
    this.snake = snake;
    this.mapa = mapa;
    this.posicionesLibres = mapa.posLibres();
    //this.chrono = 0;
    let feeds: Feed[] = [];
    let obstacles: Obstacle[] = [];
    let numObstacles = 5;
    for (let i = 0; i < numObstacles; i++) {
      obstacles.push(
        new Obstacle(
          {
            x: _.random(2, numBlocks - 1),
            y: _.random(2, numBlocks - 1),
          },
          {
            w: _.random(3, 9),
            h: 1,
          },
          snake,
          _.sample([0, 90]),
          20,
          mapa
        )
      );
    }
    feeds.push(new Feed(_.sample(this.posicionesLibres), 20, snake));

    console.log("CIRCUIT CREATED");
    this.feeds = feeds;
    this.obstacles = obstacles;
  }
  update(delta: number) {
    //this.chrono += delta
    this.feeds = this.feeds.filter((el) => !el.touched);
    if (this.feeds.length < 10) {
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

export const createObjets = (snake: Snake, numBlocks: number, blockSize: number, mapa: Map) => {
  Objets = new ObjetsManager(snake, numBlocks, blockSize, mapa);
};
