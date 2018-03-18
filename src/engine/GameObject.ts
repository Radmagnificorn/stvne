import GameWindow from "./GameWindow";
import {Component} from "./components/Component";

class GameObject {

    children: GameObject[] = [];
    parent: GameObject;
    private _imageMode: ImageMode = ImageMode.WRAP_IMAGE;
    private _components: Map<string, Component>;
    private _element: HTMLElement;
    private _image: HTMLImageElement;

    constructor(x: number = 0, y: number = 0,  height: number = 10, width: number = 10, img?: HTMLImageElement) {
        this._element = document.createElement('div');
        this._element.style.position = 'absolute';
        this._components = new Map<string, Component>();
        this.location = new Vector2d(x, y);

        this.height = height;
        this.width = width;

        if (img) {
            this.image = img;
        }
    }

    getChildren(): GameObject[] {
        return this.children;
    }

    set imageMode(mode: ImageMode) {
        this._imageMode = mode;
    }

    set image(img: HTMLImageElement) {
        this._image = img;
        this.element.style.backgroundImage = `url('${img.src}')`;
        this.resizeImage();
    }

    resizeImage() {
        switch (this._imageMode) {
            case ImageMode.WRAP_IMAGE:
                this.height = this._image.height;
                this.width = this._image.width;
                this.element.style.backgroundSize = 'auto';
                break;
            case ImageMode.MAINTAIN_ASPECT_FIT:
                this.element.style.backgroundSize = 'contain';
                break;
            case ImageMode.MAINTAIN_ASPECT_FILL:
                this.element.style.backgroundSize = 'cover';
                break;
            default:
                // do nothing;
        }
    }

    appendChild(child: GameObject) {
        child.setParent(this);
        this.children.push(child);
        this.element.appendChild(child.element);
    }

    private setParent(parent: GameObject): GameObject {
        this.parent = parent;
        return this;
    }

    addComponent(component: Component) {
        this._components.set(component.name, component.register(this));
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


}

export enum ImageMode {
    WRAP_IMAGE,
    MAINTAIN_ASPECT_FIT,
    MAINTAIN_ASPECT_FILL
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