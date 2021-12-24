import { Actor } from "./Actor";
import { Objets } from "../state/Objets";

export class Chronometer extends Actor {
    update() { }
    keyboard_event() { }
    draw(delta: number, ctx: CanvasRenderingContext2D) {
        const chrono = Objets.chrono.toFixed(1);
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(`CHRONO:${chrono} segundos`, this.position.x, this.position.y);
    }
}
