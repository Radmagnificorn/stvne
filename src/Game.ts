import GameObject, {Vector2d} from "./GameObject";
import GameWindow from "./GameWindow";
import TextComponent from "./components/TextComponent";
import ImageComponent from "./components/ImageComponent";
import ResourceLoader from "./ResourceLoader";
import AniTestComponent from "./components/AniTestComponent";
import HtmlDivComponent from "./components/HtmlDivComponent";
import AnimatedTextboxComponent from "./components/AnimatedTextboxComponent";

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

        let textboxText = "This is some text. I want this text to display inside of the dialog box. It should break correctly on the words. Pneumonoultramicroscopicsilicovolcanoconiosos";
        let text2 = "And this is some more text that I want to show after the first round of text. Hopefully this works out as planned.";

        let dialog = new AnimatedTextboxComponent(250, 1280, "rgba(200,200,200,0.8)");


        let level1 = new GameObject(new Vector2d(0, 450));
        level1.addComponent(dialog);

        dialog.getHtmlElement().addEventListener('click', (ev => {
            dialog.writeText(text2);
        }));

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
            dialog.writeText(textboxText);
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