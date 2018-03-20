import Character from "../../../engine/components/Character";
import AreaDialog from "../../../engine/AreaDialog";


export default class Butler extends Character {

    constructor(x: number, y: number, height: number, dialog: AreaDialog) {
        super(x, y, height, dialog, [
            ["default", require('./butler_default')]
        ]);

        this.title = "Mysterious Butler";

    }
}