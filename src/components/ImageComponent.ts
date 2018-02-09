import {Component} from "./Component";
import GameWindow from "../GameWindow";

class ImageComponent extends Component {

    image: HTMLImageElement;

    constructor(image: HTMLImageElement) {
        super();
        this.image = image;
    }

    render(gameWindow: GameWindow) {
        let ctx = gameWindow.getGraphicsContext();
        ctx.drawImage(this.image, this.gameObject.location.x, this.gameObject.location.y);
    }

}

export default ImageComponent;