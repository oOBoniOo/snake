import { Actor } from "./Actor";
import { Circuit } from "../state/Circuit";

export class Chronometer extends Actor {
    update() { }
    keyboard_event() { }
    draw(delta: number, ctx: CanvasRenderingContext2D) {
        const chrono = Circuit.chrono.toFixed(1);
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(`CHRONO:${chrono} segundos`, this.position.x, this.position.y);
    }
}
