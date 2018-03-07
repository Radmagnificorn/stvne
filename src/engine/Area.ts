import Scene from "./Scene";
import GameObject from "./GameObject";
import Game from "./Game";
import DialogComponent from "./components/DialogComponent";

class Area extends Scene {

    private _dialog: GameObject;
    private _gameLayer: GameObject;
    private _backgroundLayer: GameObject;

    constructor(game: Game, rootObject: GameObject = new GameObject()) {
        super(game, rootObject);

        this._backgroundLayer = new GameObject();
        this._gameLayer = new GameObject();
        // TODO: make this dynamic for different resolutions
        this._dialog = new GameObject(0, 450);
        this._dialog.addComponent(new DialogComponent());

        this.sceneGraph.appendChild(this._backgroundLayer);
        this.sceneGraph.appendChild(this._gameLayer);
        this.sceneGraph.appendChild(this._dialog);

    }

    get dialogComponent(): DialogComponent {
        return <DialogComponent>this._dialog.components.get('dialog');
    }

    get backgroundLayer() {
        return this._backgroundLayer;
    }

    get gameLayer() {
        return this._gameLayer;
    }

    get gameState() {
        return this._gameInstance.gameState;
    }

}

export default Area;