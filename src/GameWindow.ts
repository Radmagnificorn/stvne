import {Vector2d} from "./GameObject";

class GameWindow {

    canvas: HTMLCanvasElement;
    rootElement: HTMLElement;
    ctx: CanvasRenderingContext2D;

    constructor(height: number, width: number, doc: Document = document) {
        this.canvas = doc.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.canvas.height = height;
        this.canvas.width = width;
        this.canvas.style.top = '0px';
        this.canvas.style.left = '0px';
        this.canvas.style.position = 'absolute';

        this.rootElement = doc.createElement('div');
        this.rootElement.style.width = width.toString() + 'px';
        this.rootElement.style.height = height.toString() + 'px';
        this.rootElement.style.position = 'relative';

        this.rootElement.appendChild(this.canvas);

    }

    appendToElement(parent: HTMLElement) {
        parent.appendChild(this.rootElement);
    }

    drawText(text: string, location: Vector2d, font: string = '30px Arial') {
        let ctx = this.canvas.getContext("2d");
        ctx.font = font;
        ctx.fillText(text, location.x, location.y);
    }

    getGraphicsContext(): CanvasRenderingContext2D {
        return this.ctx;
    }

    clear() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
    }

    addHtmlElement(html: HTMLElement) {
        this.rootElement.appendChild(html);
    }
}

export default GameWindow;