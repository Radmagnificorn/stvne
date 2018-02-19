import {Component} from "./Component";

class ImageComponent extends Component {

    private _image: HTMLImageElement;
    private _fitImage: boolean;

    constructor(image: HTMLImageElement, fitImage = true) {
        super();
        this._image = image;
        this._fitImage = fitImage;
    }

    onAdd() {
        let goElement = this.gameObject.element;
        goElement.style.backgroundImage = "url('" + this._image.src + "')";
        if (this._fitImage) {
            this.gameObject.height = this.image.height;
            this.gameObject.width = this.image.width;
        }
    }

    get image(): HTMLImageElement {
        return this._image;
    }

    set image(image: HTMLImageElement) {
        this._image = image;
    }

    get name(): string {
        return "image";
    }


}

export default ImageComponent;