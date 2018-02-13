import GameObject, {Vector2d} from "../engine/GameObject";
import GameWindow from "../engine/GameWindow";
import TextComponent from "../engine/components/TextComponent";
import ImageComponent from "../engine/components/ImageComponent";
import ResourceLoader from "../engine/ResourceLoader";
import AniTestComponent from "../engine/components/AniTestComponent";
import HtmlDivComponent from "../engine/components/HtmlDivComponent";
import AnimatedTextboxComponent from "../engine/components/AnimatedTextboxComponent";
import Area from "../engine/Area";
import StartArea from "./StartArea";

class Game {

    gameWindow: GameWindow;
    running: boolean = false;
    resourceLoader: ResourceLoader;
    fps: number = 24;
    currentArea: Area;

    constructor(gameWindow: GameWindow, resourceLoader: ResourceLoader) {
        this.gameWindow = gameWindow;
        this.resourceLoader = resourceLoader;
    }

    start() {
        this.running = true;

        let startArea = new StartArea();
        this.currentArea = startArea;

        startArea.loadResources().then(() => {
            setInterval(this.loop.bind(this), 1000 / this.fps);
        });



    }

    stop() {

    }

    pause() {

    }

    loop() {
        this.currentArea.update();
        this.gameWindow.clear();
        this.currentArea.render(this.gameWindow);

    }

}

export default Game;