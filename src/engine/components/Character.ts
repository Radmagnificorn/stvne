import DialogActor from "./DialogActor";
import DynamicImage from "./DynamicImage";
import GameObject, {ImageMode} from "../GameObject";
import AnimationActor from "./AnimationActor";
import AreaDialog from "../AreaDialog";
import {Loadable} from "../Loadable";
import ResourceLoader from "../ResourceLoader";



export default class Character extends AnimationActor(DynamicImage(DialogActor(GameObject))) implements Loadable {

    private imageList: [string, string][];

    constructor(x: number, y: number, height: number, dialog: AreaDialog, imageList: [string, string][]) {
        super(x, y, height);
        this.imageList = imageList;
        this.initDialogActor(dialog);
    }

    initialize(images: Map<string, HTMLImageElement>) {
        this.initDynamicImage(images);
        this.imageMode = ImageMode.MAINTAIN_ASPECT_BY_HEIGHT;
    }

    /*

    private loadImage(name: string, url: string): [string, HTMLImageElement] {
        let img = new Image();
        img.src = url;
        console.log(`loading image ${img.height} : ${img.width}`);
        return [name, img];
    }

    */

    async loadResources(): Promise<any> {
        let images = await ResourceLoader.loadImagesToMap(this.imageList)
        this.initialize(images);
    }
}
