import GameObject, {Vector2d} from "./GameObject";
import GameWindow from "./GameWindow";
import TextObject from "./TextObject";

class Game {

    gameWindow: GameWindow;
    running: boolean = false;

    sceneGraph: GameObject;

    constructor(gameWindow: GameWindow) {
        this.gameWindow = gameWindow;
    }

    start() {
        this.running = true;

        let empty = new GameObject();

        empty.location = new Vector2d(0, 0);

        this.sceneGraph = empty;

        let level1 = new TextObject("level 1 at 0, 0")
        let level2 = new TextObject("level 2 at 30, 30", new Vector2d(30, 30));
        let level3 = new TextObject("level 3 at 60, 60", new Vector2d(60, 60));
        let level22 = new TextObject("level 2 at 200, 200", new Vector2d(200, 200));

        level1.appendChild(level2);
        level1.appendChild(level22);
        level2.appendChild(level3);

        this.sceneGraph.appendChild(level1);

        this.sceneGraph.render(this.gameWindow);

    }

    stop() {

    }

    pause() {

    }

    loop() {

    }

}

export default Game;