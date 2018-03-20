import {Component} from "./components/Component";

class GameObject {

    children: GameObject[] = [];
    parent: GameObject;
    private _imageMode: ImageMode;
    private _element: HTMLElement;
    private _image: HTMLImageElement;

    constructor(x: number = 0, y: number = 0,  height: number = 10, width: number = 10, img: HTMLImageElement = new Image()) {
        this._element = document.createElement('div');
        this._element.style.position = 'absolute';
        this.location = new Vector2d(x, y);

        this.imageMode = ImageMode.CLIP;

        this.setHeight(height);
        this.setWidth(width);

        this.resizeImage();

        if (img) {
            this.image = img;
        }
    }

    getChildren(): GameObject[] {
        return this.children;
    }

    set imageMode(mode: ImageMode) {
        this._imageMode = mode;
        this.resizeImage();
    }

    get imageMode() {
        return this._imageMode;
    }

    set image(img: HTMLImageElement) {
        this._image = img;
        this.element.style.backgroundImage = `url('${img.src}')`;
        this.resizeImage();
    }

    get image() {
        return this._image;
    }

    private resizeImage() {
        switch (this._imageMode) {
            case ImageMode.WRAP_IMAGE:
                this.setHeight(this._image.height);
                this.setWidth(this._image.width);
                this.element.style.backgroundSize = 'auto';
                break;
            case ImageMode.MAINTAIN_ASPECT_BY_HEIGHT:
                this.element.style.backgroundSize = 'contain';
                this.setWidth(this._image.width * this.imgScale.height);
                break;
            case ImageMode.MAINTAIN_ASPECT_BY_WIDTH:
                this.element.style.backgroundSize = 'contain';
                this.setHeight(this._image.height * this.imgScale.width);
                break;
            case ImageMode.MAINTAIN_ASPECT_FILL:
                this.element.style.backgroundSize = 'cover';
                break;
            case ImageMode.CLIP:
                this.element.style.backgroundSize = 'auto';
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

    get imgScale(): {height: number, width: number} {
        return {
            height: this.height / this._image.height,
            width: 1.0 * this.width / this._image.width
        }
    }

    set height(height: number) {
        this.setHeight(height);
        this.resizeImage();
    }

    private setHeight(height: number) {
        this._element.style.height = height + 'px';
    }

    get width(): number {
        return parseInt(this._element.style.width, 10);
    }

    set width(width: number) {
        this.setWidth(width);
        this.resizeImage();
    }

    private setWidth(width: number) {
        this._element.style.width = width + 'px';
    }


    get element() {
        return this._element
    }


}

export enum ImageMode {
    WRAP_IMAGE,
    MAINTAIN_ASPECT_BY_HEIGHT,
    MAINTAIN_ASPECT_BY_WIDTH,
    MAINTAIN_ASPECT_FILL,
    CLIP
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