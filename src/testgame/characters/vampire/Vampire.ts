import Character from "../../../engine/components/Character";
import AreaDialog from "../../../engine/AreaDialog";
import {ImageMode} from "../../../engine/GameObject";


export default class Vampire extends Character {

    constructor(x: number, y: number, height: number, dialog: AreaDialog) {
        super(x, y, height, dialog, [
            ["default", require('./vamp_look_straight')],
            ["handsup", require('./vamp_hands_up')]
        ]);

        this.title = "Vampire Dave";

    }
}