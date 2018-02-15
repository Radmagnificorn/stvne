import HtmlDivComponent from "./HtmlDivComponent";

class HtmlImageComponent extends HtmlDivComponent {

    constructor(id: string, image: HTMLImageElement, height: number = -1, width: number = -1) {
        super(id);
        this.element.style.backgroundImage = "url('" + image.src + "')";
        if (height < 0 || width < 0) {
            this.element.style.height = image.height + 'px';
            this.element.style.width = image.width + 'px';
        } else {
            this.element.style.height = height + 'px';
            this.element.style.width = width + 'px';
        }
    }

}

export default HtmlImageComponent;