import GameScreen from "./GameScreen";
import GameObject from "./GameObject";
import Game from "./Game";
import DialogComponent from "./components/DialogComponent";
import AniEvents from "./animation/AniEvents";
import ActionEvents from "./ActionEvents";

class Area extends GameScreen {

    private _dialog: GameObject;
    private _gameLayer: GameObject;
    private _backgroundLayer: GameObject;
    private _transitionLayer: GameObject;

    constructor(game: Game, rootObject: GameObject = new GameObject()) {
        super(game, rootObject);

        this._backgroundLayer = new GameObject();
        this._gameLayer = new GameObject();
        // TODO: make this dynamic for different resolutions
        this._dialog = new GameObject(0, 450);
        this._dialog.addComponent(new DialogComponent());

        this._transitionLayer = new GameObject(0,0,720, 1280);
        this._transitionLayer.element.style.backgroundColor = '#000000';

        this.sceneGraph.appendChild(this._backgroundLayer);
        this.sceneGraph.appendChild(this._gameLayer);
        this.sceneGraph.appendChild(this._dialog);
        this.sceneGraph.appendChild(this._transitionLayer);

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

    async transitionIn() {
        await this.fadeIn();
    }

    async transitionOut() {
        await this.fadeOut();
    }

    async fadeIn() {
        await AniEvents.fadeOut(this._transitionLayer, 0.25)
        this._transitionLayer.element.style.display = 'none';
    }

    async fadeOut() {
        this._transitionLayer.element.style.display = 'block';
        await AniEvents.fadeIn(this._transitionLayer, 0.25);
    }

}

export default Area;