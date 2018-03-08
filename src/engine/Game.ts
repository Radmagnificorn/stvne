import GameWindow from "./GameWindow";
import ResourceLoader from "./ResourceLoader";
import Scene from "./GameScreen";
import StartArea from "../testgame/StartArea";
import GameState from "./GameState";
import StartScreen from "../testgame/StartScreen";

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

    loadScene(scene: Scene) {
        this.currentScene = scene;
        scene.loadResources().then(() => {
           this.gameWindow.setScene(scene);
           scene.onReady();
        });
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