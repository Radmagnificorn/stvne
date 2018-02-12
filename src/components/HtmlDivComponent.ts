import {Component} from "./Component";
import GameWindow from "../GameWindow";

class HtmlDivComponent extends Component {

    private height: number;
    private width: number;
    private color: string;
    protected element: HTMLDivElement;
    private isAdded: boolean = false;
    private doc: Document | undefined;

    constructor(height: number, width: number, color: string, doc: Document = document) {
        super();
        this.height = height;
        this.width = width;
        this.color = color;
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
        root.style.width = this.px(this.width);
        root.style.height = this.px(this.height);
        root.style.background = this.color;
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