import GameWindow from "../engine/GameWindow";
import ResourceLoader from "../engine/ResourceLoader";
import Scene from "../engine/Scene";
import StartArea from "./StartArea";

class Game {

    gameWindow: GameWindow;
    running: boolean = false;
    resourceLoader: ResourceLoader;
    fps: number = 24;
    currentArea: Scene;

    constructor(gameWindow: GameWindow, resourceLoader: ResourceLoader) {
        this.gameWindow = gameWindow;
        this.resourceLoader = resourceLoader;
    }

    start() {
        this.running = true;

        let startArea = new StartArea();
        this.currentArea = startArea;

        startArea.loadResources().then(() => {
            this.gameWindow.setScene(startArea);
        });



    }

    stop() {

    }

    pause() {

    }


}

export default Game;