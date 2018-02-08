import GameObject, {Vector2d} from "./GameObject";
import GameWindow from "./GameWindow";

class TextObject extends GameObject {

    text: string;

    constructor(text: string, location: Vector2d = new Vector2d(0,0)) {
        super();
        this.text = text;
        this.location = location;
    }

    update() {
        super.update();
    }

    render(gameWindow: GameWindow) {
        super.render(gameWindow);

        gameWindow.drawText(this.text, this.location);
    }

}

export default TextObject;