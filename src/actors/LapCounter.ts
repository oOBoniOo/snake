import { Actor } from "./Actor";
import { Circuit } from "../state/Circuit";

export class LapCounter extends Actor {
    update() { }
    keyboard_event() { }
    draw(delta: number, ctx: CanvasRenderingContext2D) {
        const laps = Circuit.currentLap;
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(`LAP:${laps}/1`, this.position.x, this.position.y);
    }
}
