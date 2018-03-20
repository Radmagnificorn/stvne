import GameObject from "./GameObject";
import GameWindow from "./GameWindow";
import Game from "./Game";
import {Loadable} from "./Loadable";

class GameScreen implements Loadable{

    private _sceneGraph: GameObject;
    protected _gameInstance: Game;

    constructor(game: Game, rootObject: GameObject = new GameObject()) {
        this._gameInstance = game;
        this.sceneGraph = rootObject;
        this.sceneGraph.element.classList.add('scene_graph');
    }

    get sceneGraph() {
        return this._sceneGraph;
    }

    set sceneGraph(rootObject: GameObject) {
        this._sceneGraph = rootObject;
    }

    loadResources():Promise<any> {
        return Promise.resolve();
    }

    onReady(): void {};

    onUnload(): void {};

    load() {
        this._gameInstance.loadScene(this);
    }

    async transitionIn(): Promise<any> {
        return Promise.resolve();
    }

    async transitionOut(): Promise<any> {
        return Promise.resolve();
    }

}

export default GameScreen;