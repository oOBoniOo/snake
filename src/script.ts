import { Actor, IActor } from "./actors/Actor";
import { Feed } from "./actors/Feed";
import { Snake } from "./actors/Snake";
import { FPSViewer } from "./actors/FPSViewer";
import { Objets, createObjets } from "./state/Objets";
import { MAP_A } from "./utils/keyboardMap";
//import { Chronometer } from "./actors/Chronometer";
//import { LapCounter } from "./actors/LapCounter";
//import { Map } from "./actors/Map";

// function dibujaGrid(disX:number, disY:number, anchoLinea:number, color:string,ctx:CanvasRenderingContext2D){
// 	let cuadritos = [];
// 	let width = 1024;
// 	let height = 1024;

// 	ctx.strokeStyle = color;
// 	ctx.lineWidth = anchoLinea;
// 	let columnas = [];
// 	let filas = [];
// 	for (let i = disX; i < width; i += disX) {
// 		ctx.setLineDash([2, 2]);
// 		ctx.beginPath();
// 		ctx.moveTo(i, 0);
// 		ctx.lineTo(i, height);
// 		ctx.stroke();
// 		columnas.push(i);
// 	}
// 	for (let i = disY; i < height; i += disY) {
// 		ctx.setLineDash([2, 2]);
// 		ctx.beginPath();
// 		ctx.moveTo(0, i);
// 		ctx.lineTo(ctx.canvas.width, i);
// 		ctx.stroke();
// 		filas.push(i);
// 	}
// 	columnas.push(0);
// 	filas.push(0);
// 	for (let x = 0; x < columnas.length; x++) {
// 			for (let y = 0; y < filas.length; y++) {
// 					cuadritos.push([columnas[x], filas[y], disX, disY]);
// 			}
// 	}
// }

window.onload = () => {
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;
  var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const numBlocks: number = 25;
  let blockSize: number = canvas.width / numBlocks;

  let fps = new FPSViewer({ x: 15, y: 35 });
  //let laps = new LapCounter({ x: 100, y: 15 });
  //let chrono = new Chronometer({ x: 200, y: 15 });

  let snake = new Snake({ x: 10, y: 10 }, MAP_A);

  createObjets(snake, numBlocks, blockSize);

  let actors: Array<IActor> = [
    fps,
    Objets,
    snake,
    ...Objets.feeds,
    ...Objets.obstacles,
    ...snake.snakeBody,
  ];

  let lastFrame = 0;
  let counter = 0;
  const render = (time: number) => {
    counter += 1;

    let delta = (time - lastFrame) / 1000;
    lastFrame = time;
    if (counter > 7) {
      actors = [
        fps,
        Objets,
        snake,
        ...Objets.feeds,
        ...Objets.obstacles,
        ...snake.snakeBody,
      ];
      counter = 0;
      actors.forEach((e) => e.update(delta));
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      actors.forEach((e) => {
        ctx.save();
        e.draw(delta, ctx);
        ctx.restore();
      });
    }

    //dibujaGrid(32,32,1,"#000000",ctx)
    window.requestAnimationFrame(render);
  };

  window.requestAnimationFrame(render);

  document.body.addEventListener("keydown", (e) => {
    actors.forEach((actor) => {
      if (actor.keyboard_event_down) {
        actor.keyboard_event_down(e.key);
      }
    });
  });
  // document.body.addEventListener("keyup", (e) => {
  // 	actors.forEach((actor) => {
  // 		if (actor.keyboard_event_up) {
  // 			actor.keyboard_event_up(e.key);
  // 		}
  // 	});
  // });
};
