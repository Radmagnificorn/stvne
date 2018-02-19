import GameWindow from "./GameWindow";
import ResourceLoader from "./ResourceLoader";
import Scene from "./Scene";
import StartArea from "../testgame/StartArea";

class Game {

    gameWindow: GameWindow;
    running: boolean = false;
    resourceLoader: ResourceLoader;
    fps: number = 24;
    currentScene: Scene;

    private static _instance: Game;

    constructor(gameWindow: GameWindow, resourceLoader: ResourceLoader) {
        this.gameWindow = gameWindow;
        this.resourceLoader = resourceLoader;
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

    stop() {

    }

    pause() {

    }


}

export default Game;