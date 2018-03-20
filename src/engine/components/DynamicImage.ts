
import {GameObjectConstructor} from "./Mixins";

function DynamicImage<TBase extends GameObjectConstructor>(Base: TBase) {
    return class extends Base {

        private _images: Map<string, HTMLImageElement>;

        initDynamicImage(images: Map<string, HTMLImageElement>) {
            this._images = images;

            let def = images.get("default");
            let defImg = def ? def : images.values().next().value;

            if (this.image.src === "") {
                this.image = defImg;
            }
            //this.image = this._images.get("default");
            return this;
        }

        showImage(imageName: string) {
            this.image = this._images.get(imageName);
        }

    }
}

export default DynamicImage;