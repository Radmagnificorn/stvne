import {Vector2d} from "./GameObject";
import './GameWindow.scss';

class GameWindow {

    private _canvas: HTMLCanvasElement;
    private _rootElement: HTMLElement;
    private _ctx: CanvasRenderingContext2D;
    private _height: number;
    private _width: number;

    constructor(height: number, width: number, doc: Document = document) {
        this._canvas = doc.createElement('canvas');
        this._ctx = this._canvas.getContext("2d");
        this._canvas.height = height;
        this._canvas.width = width;

        this._rootElement = doc.createElement('div');
        this._rootElement.id = 'game_window';
        this._rootElement.style.width = width.toString() + 'px';
        this._rootElement.style.height = height.toString() + 'px';

        this._rootElement.appendChild(this._canvas);

        this._height = height;
        this._width = width;

    }

    get height(): number {
        return this._height;
    }

    get width(): number {
        return this._width
    }

    get rootElement(): HTMLElement {
        return this._rootElement;
    }

    appendToElement(parent: HTMLElement) {
        parent.appendChild(this._rootElement);
    }

    drawText(text: string, location: Vector2d, font: string = '30px Arial') {
        let ctx = this._canvas.getContext("2d");
        ctx.font = font;
        ctx.fillText(text, location.x, location.y);
    }

    getGraphicsContext(): CanvasRenderingContext2D {
        return this._ctx;
    }

    get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }

    clear() {
        this._ctx.fillStyle = 'white';
        this._ctx.fillRect(0,0,this._canvas.width, this._canvas.height);
    }

    addHtmlElement(html: HTMLElement) {
        this._rootElement.appendChild(html);
    }
}

export default GameWindow;