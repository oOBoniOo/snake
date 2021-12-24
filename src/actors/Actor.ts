import { Point } from "../types/Point";

export interface IActor {
	position?: Point;
	update: (delta: number) => void;
	keyboard_event_down?: (key: string) => void;
	keyboard_event_up?: (key: string) => void;
	draw: (delta: number, ctx: CanvasRenderingContext2D) => void;
}

export class Actor implements IActor {
	position: Point;
	constructor(position: Point) {
		this.position = position;
	}
	update(delta: number) { }
	draw(delta: number, ctx: CanvasRenderingContext2D) { }
	keyboard_event(key: string) { }
}
