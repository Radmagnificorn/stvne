import {Component} from "./Component";
import GameWindow from "../GameWindow";

class HtmlDivComponent extends Component {

    protected _element: HTMLDivElement;
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
        this._element = root;
    }

    private px(num: number): string {
        return num.toString() + 'px';
    }

    render(gameWindow: GameWindow) {
        if (!this.isAdded) {
            gameWindow.addHtmlElement(this._element);
            this.isAdded = true;
        }
    }

    get element(): HTMLDivElement {
        return this._element;
    }



}

export default HtmlDivComponent;