import {Vector2d} from "./GameObject";

class GameWindow {

    canvas: HTMLCanvasElement;

    constructor(height: number, width: number, doc: Document = document) {
        this.canvas = doc.createElement('canvas');
        this.canvas.height = height;
        this.canvas.width = width;
    }

    appendToElement(parent: HTMLElement) {
        parent.appendChild(this.canvas);
    }

    drawText(text: string, location: Vector2d, font: string = '30px Arial') {
        let ctx = this.canvas.getContext("2d");
        ctx.font = font;
        ctx.fillText(text, location.x, location.y);
    }
}

export default GameWindow;