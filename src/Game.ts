import GameObject, {Vector2d} from "./GameObject";
import GameWindow from "./GameWindow";
import TextComponent from "./components/TextComponent";
import ImageComponent from "./components/ImageComponent";
import ResourceLoader from "./ResourceLoader";
import AniTestComponent from "./components/AniTestComponent";

class Game {

    gameWindow: GameWindow;
    running: boolean = false;
    resourceLoader: ResourceLoader;
    fps: number = 24;

    sceneGraph: GameObject;

    constructor(gameWindow: GameWindow, resourceLoader: ResourceLoader) {
        this.gameWindow = gameWindow;
        this.resourceLoader = resourceLoader;
    }

    start() {
        this.running = true;

        let empty = new GameObject();

        empty.location = new Vector2d(0, 0);

        this.sceneGraph = empty;

        let level1 = new GameObject();
        level1.addComponent(new TextComponent("level 1 at 0, 0"));
        let level2 = new GameObject(new Vector2d(30, 30));
        level2.addComponent(new TextComponent("level 2 at 30, 30"));
        let level3 = new GameObject(new Vector2d(60, 60));

        let level22 = new GameObject(new Vector2d(200, 200));
        level22.addComponent(new AniTestComponent());

        level1.appendChild(level2);
        level1.appendChild(level22);
        level2.appendChild(level3);

        this.sceneGraph.appendChild(level1);

        this.resourceLoader.loadImage("test.png").then(img => {
            level3.addComponent(new ImageComponent(img));
            setInterval(this.loop.bind(this), 1000/this.fps);
        }).catch(() => alert("image not loaded"));


    }

    stop() {

    }

    pause() {

    }

    loop() {
        this.sceneGraph.update();
        this.gameWindow.clear();
        this.sceneGraph.render(this.gameWindow);

    }

}

export default Game;