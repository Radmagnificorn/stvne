import GameWindow from "./GameWindow";
import ResourceLoader from "./ResourceLoader";
import Scene from "./GameScreen";
import StartArea from "../testgame/StartArea";
import GameState from "./GameState";
import StartScreen from "../testgame/StartScreen";
import AniEvents from "./animation/AniEvents";
import ActionEvents from "./ActionEvents";

class Game {

    gameWindow: GameWindow;
    running: boolean = false;
    resourceLoader: ResourceLoader;
    fps: number = 24;
    currentScene: Scene;
    private _gameState: GameState;

    private _transitionElement: HTMLDivElement;

    private static _instance: Game;

    constructor(gameWindow: GameWindow, resourceLoader: ResourceLoader, gameState: GameState) {
        this.gameWindow = gameWindow;
        this.resourceLoader = resourceLoader;
        this._gameState = gameState;

        this._transitionElement = document.createElement('div');

    }

    async loadScene(scene: Scene) {
        if (this.currentScene) {
            await AniEvents.fadeOut(this.currentScene.sceneGraph, 0.2);
        }
        this.currentScene = scene;
        await scene.loadResources();
        this.gameWindow.setScene(scene);
        scene.sceneGraph.element.style.opacity = '0';
        await ActionEvents.pause(100);
        await AniEvents.fadeIn(scene.sceneGraph, 0.2);
        scene.onReady();

    }

    start() {
        this.running = true;

        let startScreen = new StartScreen(this);
        this.loadScene(startScreen);

    }

    get gameState(): GameState {
        return this._gameState;
    }

    stop() {

    }

    pause() {

    }


}

export default Game;