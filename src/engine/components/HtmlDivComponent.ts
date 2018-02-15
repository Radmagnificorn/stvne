import {Component} from "./Component";
import GameWindow from "../GameWindow";

class HtmlDivComponent extends Component {

    protected _element: HTMLDivElement;
    private isAdded: boolean = false;
    private doc: Document | undefined;

    constructor(id: string, doc: Document = document) {
        super();
        this.doc = doc;
        this.createElement(id);
    }

    onAdd() {
        this.element.style.left = this.px(this.gameObject.location.x);
        this.element.style.top = this.px(this.gameObject.location.y);
    }

    protected createElement(id: string) {
        let root = this.doc.createElement('div');
        root.id = id;
        root.className = 'game_object';
        root.style.position = 'absolute';
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