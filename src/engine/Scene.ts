import GameObject from "./GameObject";
import GameWindow from "./GameWindow";
import Game from "./Game";

class Scene {

    private _sceneGraph: GameObject;
    protected _gameInstance: Game;

    constructor(game: Game, rootObject: GameObject = new GameObject()) {
        this._gameInstance = game;
        this.sceneGraph = rootObject;
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

    load() {
        this._gameInstance.loadScene(this);
    }

}

export default Scene;