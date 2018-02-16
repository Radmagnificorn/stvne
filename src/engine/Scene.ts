import GameObject from "./GameObject";
import GameWindow from "./GameWindow";

class Scene {

    private _sceneGraph: GameObject;

    constructor(rootObject: GameObject = new GameObject()) {
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

}

export default Scene;