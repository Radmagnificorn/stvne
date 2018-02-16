import {Vector2d} from "./GameObject";
import './GameWindow.scss';
import Scene from "./Scene";

class GameWindow {

    private _rootElement: HTMLElement;
    private _height: number;
    private _width: number;

    constructor(height: number, width: number, doc: Document = document) {
        this._rootElement = doc.createElement('div');
        this._rootElement.id = 'game_window';
        this._rootElement.style.width = width.toString() + 'px';
        this._rootElement.style.height = height.toString() + 'px';

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


    setScene(scene: Scene) {
        this._rootElement.innerHTML = '';
        this._rootElement.appendChild(scene.sceneGraph.generateElement());
    }
}

export default GameWindow;