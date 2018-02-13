import {Component} from "./Component";
import TextComponent from "./TextComponent";


class AniTestComponent extends TextComponent {

    count: number = 0;

    constructor() {
        super("0");
    }

    update() {
        this.count++;
        this.text = this.count.toString();
    }

}

export default AniTestComponent;