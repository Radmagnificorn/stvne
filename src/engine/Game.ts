import GameWindow from "./GameWindow";
import ResourceLoader from "./ResourceLoader";
import Scene from "./Scene";
import StartArea from "../testgame/StartArea";
import GameState from "./GameState";

class Game {

    gameWindow: GameWindow;
    running: boolean = false;
    resourceLoader: ResourceLoader;
    fps: number = 24;
    currentScene: Scene;
    private _gameState: GameState;

    private static _instance: Game;

    constructor(gameWindow: GameWindow, resourceLoader: ResourceLoader, gameState: GameState) {
        this.gameWindow = gameWindow;
        this.resourceLoader = resourceLoader;
        this._gameState = gameState;
    }

    loadScene(scene: Scene) {
        this.currentScene = scene;
        scene.loadResources().then(() => {
           this.gameWindow.setScene(scene);
        });
    }

    start() {
        this.running = true;

        let startArea = new StartArea(this);
        this.loadScene(startArea);



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