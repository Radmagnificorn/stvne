import Character from "../../../engine/components/Character";
import AreaDialog from "../../../engine/AreaDialog";
import {ImageMode} from "../../../engine/GameObject";


export default class Vampire extends Character {

    private images = [
        ["default", require('./vamp_look_straight')],
        ["handsup", require('./vamp_hands_up')]
    ];

    constructor(x: number, y: number, height: number, dialog: AreaDialog) {
        super(x, y, height);
        this.initDialogActor(dialog, "Vampire Dave");

        let imgs = this.images.map(imgSet => this.loadImage(imgSet[0], imgSet[1]));

        let imgMap = new Map<string, HTMLImageElement>(imgs);

        this.initDynamicImage(imgMap);

        this.imageMode = ImageMode.MAINTAIN_ASPECT_BY_HEIGHT;


    }

    loadImage(name: string, url: string): [string, HTMLImageElement] {
        let img = new Image();
        img.src = url;
        return [name, img];
    }

}