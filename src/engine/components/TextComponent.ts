import GameObject, {Vector2d} from "../GameObject";
import GameWindow from "../GameWindow";
import {Component} from "./Component";

class TextComponent extends Component {

    text: string;

    constructor(text: string) {
        super();
        this.text = text;
    }

    render(gameWindow: GameWindow) {
        super.render(gameWindow);
        let ctx = gameWindow.getGraphicsContext();
        ctx.fillStyle = 'black';
        ctx.fillText(this.text, this.gameObject.location.x, this.gameObject.location.y);
    }

}

export default TextComponent;