import { Actor, IActor } from "./actors/Actor";
import { Feed } from "./actors/Feed";
import { Snake } from "./actors/Snake";
import { FPSViewer } from "./actors/FPSViewer";
import { Objets, createObjets } from "./state/Objets";
import { MAP_A} from "./utils/keyboardMap";
//import { Chronometer } from "./actors/Chronometer";
//import { LapCounter } from "./actors/LapCounter";
//import { Map } from "./actors/Map";



window.onload = () => {
	var canvas = document.getElementById("canvas") as HTMLCanvasElement;
	var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

	let fps = new FPSViewer({ x: 15, y: 35 });
	//let laps = new LapCounter({ x: 100, y: 15 });
	//let chrono = new Chronometer({ x: 200, y: 15 });

	let snake = new Snake({ x: 100, y: 100 }, MAP_A);

	createObjets(snake);

	let actors: Array<IActor> = [fps, Objets, snake, ...Objets.feeds,...Objets.obstacles];

	let lastFrame = 0;
	const render = (time: number) => {
		actors = [fps, Objets, snake, ...Objets.feeds,...Objets.obstacles];
		let delta = (time - lastFrame) / 1000;
		console.log(actors.length)
		lastFrame = time;
		actors.forEach((e) => e.update(delta));
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		actors.forEach((e) => {
			ctx.save();
			e.draw(delta, ctx);
			ctx.restore();
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
	// document.body.addEventListener("keyup", (e) => {
	// 	actors.forEach((actor) => {
	// 		if (actor.keyboard_event_up) {
	// 			actor.keyboard_event_up(e.key);
	// 		}
	// 	});
	// });
};
