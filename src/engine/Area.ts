import GameScreen from "./GameScreen";
import GameObject from "./GameObject";
import Game from "./Game";
import DialogComponent from "./components/DialogComponent";
import AniEvents from "./animation/AniEvents";
import "./AreaStyle.scss";
import {Exit} from "./components/PortalComponent";

class Area extends GameScreen {

    private _dialog: GameObject;
    private _gameLayer: GameObject;
    private _backgroundLayer: GameObject;
    private _uiLayer: GameObject;
    private _transitionLayer: GameObject;
    private _exits: Exit[] = [];

    constructor(game: Game, rootObject: GameObject = new GameObject()) {
        super(game, rootObject);

        this.sceneGraph.element.classList.add("area");

        this._backgroundLayer = new GameObject();
        this._gameLayer = new GameObject();
        this._uiLayer = new GameObject();
        // TODO: make this dynamic for different resolutions
        this._dialog = new GameObject(0, 450);
        this._dialog.addComponent(new DialogComponent());

        this._transitionLayer = new GameObject(0,0,720, 1280);
        this._transitionLayer.element.style.backgroundColor = '#000000';

        this.sceneGraph.appendChild(this._backgroundLayer);
        this.sceneGraph.appendChild(this._gameLayer);
        this.sceneGraph.appendChild(this._dialog);
        this.sceneGraph.appendChild(this._uiLayer);
        this.sceneGraph.appendChild(this._transitionLayer);

        this.createUi();

    }

    protected createUi() {
        let toggleExitsButton = new GameObject(1250, 10, 30, 30);
        toggleExitsButton.element.classList.add('toggle_exits_button');
        this._uiLayer.appendChild(toggleExitsButton);
        toggleExitsButton.element.addEventListener('click', () => this.toggleExits());
    }

    protected toggleExits() {
        if (this._exits[0].isVisible()) {
            this.hidePortals();
        } else {
            this.showPortals();
        }
    }

    protected setPortals(... exits: Exit[]) {
        this._exits = exits;
        exits.forEach(exit => this._uiLayer.appendChild(exit));
    }

    protected showPortals() {
        this._exits.forEach(exit => exit.showPortal());
    }

    protected hidePortals() {
        this._exits.forEach(exit => exit.hidePortal());
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

    private async fadeIn() {
        await AniEvents.fadeOut(this._transitionLayer, 0.25)
        this._transitionLayer.element.style.display = 'none';
    }

    private async fadeOut() {
        this._transitionLayer.element.style.display = 'block';
        await AniEvents.fadeIn(this._transitionLayer, 0.25);
    }

}

export default Area;