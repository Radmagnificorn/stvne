import {Component} from "./Component";
import GameWindow from "../GameWindow";

class HtmlDivComponent extends Component {

    protected element: HTMLDivElement;
    private isAdded: boolean = false;
    private doc: Document | undefined;

    constructor(className: string, doc: Document = document) {
        super();
        this.doc = doc;
    }

    onAdd() {
        this.createElement();
    }

    protected createElement() {
        let root = this.doc.createElement('div');
        root.style.position = 'absolute';
        root.style.left = this.px(this.gameObject.location.x);
        root.style.top = this.px(this.gameObject.location.y);
        this.element = root;
    }

    private px(num: number): string {
        return num.toString() + 'px';
    }

    render(gameWindow: GameWindow) {
        if (!this.isAdded) {
            gameWindow.addHtmlElement(this.element);
            this.isAdded = true;
        }
    }

    getHtmlElement(): HTMLDivElement {
        return this.element;
    }



}

export default HtmlDivComponent;