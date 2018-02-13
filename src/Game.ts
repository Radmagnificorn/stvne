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

        let root = new GameObject();

        root.location = new Vector2d(0, 0);

        this.sceneGraph = root;

        let textboxText = "This is some text. I want this text to display inside of the dialog box. It should break correctly on the words. Pneumonoultramicroscopicsilicovolcanoconiosos";
        let text2 = "And this is some more text that I want to show after the first round of text. Hopefully this works out as planned.";


        this.resourceLoader.loadImages("test.png", "office.png").then(imgs => {

            let dialogBox = new GameObject(new Vector2d(0, 450));
            let dialog = new AnimatedTextboxComponent();
            dialogBox.addComponent(dialog);
            dialog.writeText(textboxText);
            dialog.getHtmlElement().addEventListener('click', (ev => {
                dialog.writeText(text2);
            }));

            let background = new GameObject(new Vector2d(0,0));
            background.addComponent(new ImageComponent(imgs[1]));

            let vampire = new GameObject(new Vector2d(60, 60));
            vampire.addComponent(new ImageComponent(imgs[0]));

            background.appendChild(vampire);
            this.sceneGraph.appendChild(background);
            this.sceneGraph.appendChild(dialogBox);


            setInterval(this.loop.bind(this), 1000/this.fps);
        });


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