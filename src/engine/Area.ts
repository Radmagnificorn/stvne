import GameObject from "./GameObject";
import GameWindow from "./GameWindow";

class Area {

    private _sceneGraph: GameObject;

    constructor(rootObject: GameObject = new GameObject()) {
        this.sceneGraph = rootObject;
    }

    update() {
        this._sceneGraph.update();
    }

    render(gameWindow: GameWindow) {
        this._sceneGraph.render(gameWindow);
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


}

export default Area;