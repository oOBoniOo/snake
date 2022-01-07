import _ from "lodash";
import { Point } from "../types/Point";
import { Feed } from "../actors/Feed";
import { Obstacle } from "../actors/Obstacle";
import { Snake } from "../actors/Snake";
import { Map } from "../actors/Map";
const wallsImg = require("../assets/sprites/walls.png");
import { PointCounter } from "../actors/PointCounter";

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
  image: HTMLImageElement;
  points: number;
  gameover: boolean;
  //chrono: number
  constructor(snake: Snake, numBlocks: number, blockSize: number, mapa: Map) {
    this.maxFeed = 1;
    this.feedInterval = 10;
    this.numBlocks = numBlocks;
    this.blockSize = blockSize;
    this.snake = snake;
    this.mapa = mapa;
    this.posicionesLibres = [];
    this.gameover = false;
    this.image = new Image();
    this.image.src = wallsImg;
    this.points = 0;
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
    this.posicionesLibres = mapa.posLibres();
    console.log(this.posicionesLibres);
    feeds.push(new Feed(_.sample(this.posicionesLibres), 20, snake));

    this.feeds = feeds;
    this.obstacles = obstacles;
  }
  update(delta: number) {
    //this.chrono += delta
    this.feeds = this.feeds.filter((el) => !el.touched);
    //this.points += 10 - this.feeds.length;
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
    let choques = this.obstacles.filter((b) => b.crashed == true);

    if (choques.length > 0) {
      this.gameover = true;
      //alert(`GAME OVER!! Score: ${this.points}`);
    }
  }

  draw(delta: number, ctx: CanvasRenderingContext2D) {
    this.mapa.mapa.map((row, i) =>
      row.map((el, j) => {
        if (el == 1) {
          ctx.drawImage(
            this.image,
            6 * 24,
            1 * 24,
            24,
            24,
            (i - 1) * this.blockSize,
            (j - 1) * this.blockSize,
            this.blockSize,
            this.blockSize
          );
        }
      })
    );
  }
}

export let Objets: ObjetsManager;

export const createObjets = (snake: Snake, numBlocks: number, blockSize: number, mapa: Map) => {
  Objets = new ObjetsManager(snake, numBlocks, blockSize, mapa);
};
