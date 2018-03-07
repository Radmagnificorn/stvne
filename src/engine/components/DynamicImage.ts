
import {GameObjectConstructor} from "./Mixins";

function DynamicImage<TBase extends GameObjectConstructor>(Base: TBase) {
    return class extends Base {

        private _images: Map<string, HTMLImageElement>;

        initDynamicImage(images: Map<string, HTMLImageElement>) {
            this._images = images;
            this.image = this._images.get("default");
            return this;
        }

        showImage(imageName: string) {
            this.image = this._images.get(imageName);
        }

    }
}

export default DynamicImage;