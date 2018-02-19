import GameWindow from "./GameWindow";
import {Component} from "./components/Component";
import ImageComponent from "./components/ImageComponent";

class GameObject {

    children: GameObject[] = [];
    parent: GameObject;
    private _components: {[key: string]: Component} = {};
    private _element: HTMLElement;

    constructor(x: number = 0, y: number = 0, img?: HTMLImageElement) {
        this._element = document.createElement('div');
        this._element.style.position = 'absolute';
        this.location = new Vector2d(x, y);

        if (img) {
            this.addComponent(new ImageComponent(img));
        }
    }

    getChildren(): GameObject[] {
        return this.children;
    }

    appendChild(child: GameObject) {
        child.setParent(this);
        this.children.push(child);
    }

    private setParent(parent: GameObject): GameObject {
        this.parent = parent;
        return this;
    }

    addComponent(component: Component) {
        this._components[component.name] = component.register(this);
    }

    get components() {
        return this._components;
    }

    get location(): Vector2d {
        return new Vector2d(
            parseInt(this._element.style.left, 10),
            parseInt(this._element.style.top, 10));
    }

    set location(location: Vector2d) {
        this._element.style.top = location.y + 'px';
        this._element.style.left = location.x + 'px';
    }

    get height(): number {
        return parseInt(this._element.style.height, 10);
    }

    set height(height: number) {
        this._element.style.height = height + 'px';
    }

    get width(): number {
        return parseInt(this._element.style.width, 10);
    }

    set width(width: number) {
        this._element.style.width = width + 'px';
    }


    get element() {
        return this._element
    }

    generateElement() {
        this._element.innerHTML = '';
        this.children.forEach(child => {
            this._element.appendChild(child.generateElement());
        });
        return this._element;
    }

}

export class Vector2d {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export default GameObject;