import { Actor, IActor } from "./actors/Actor";
import { PointCounter } from "./actors/PointCounter";
import { Snake } from "./actors/Snake";
import { FPSViewer } from "./actors/FPSViewer";
import { Objets, createObjets } from "./state/Objets";
import { MAP_A } from "./utils/keyboardMap";
import { Map } from "./actors/Map";

// script principal del juego donde creamos todos los actores y los introducimos en el buble de renderizado para realizar
//todas las acciones necesarias.

window.onload = () => {
  alert("utiliza las flechas del teclado \npara dirigir a la serpiente");
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;
  var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const numBlocks: number = 25;
  let blockSize: number = canvas.width / numBlocks;

  let fps = new FPSViewer({ x: 15, y: 15 });
  let pointCounter = new PointCounter({ x: 100, y: 1 });

  let snake = new Snake({ x: 1, y: 1 }, MAP_A);
  let mapa = new Map();
  createObjets(snake, numBlocks, blockSize, mapa);

  let actors: Array<IActor> = [
    fps,
    pointCounter,
    Objets,
    snake,
    ...Objets.feeds,
    ...Objets.obstacles,
    ...snake.snakeBody,
  ];

  let lastFrame = 0;

  const render = (time: number) => {
    let delta = (time - lastFrame) / 1000;
    lastFrame = time;
    actors = [
      fps,
      pointCounter,
      Objets,
      snake,
      ...Objets.feeds,
      ...Objets.obstacles,
      ...snake.snakeBody,
    ];

    actors.forEach((e) => e.update(delta));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    actors.forEach((e) => {
      e.draw(delta, ctx);
    });

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
};
