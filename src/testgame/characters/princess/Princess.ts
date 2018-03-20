import Character from "../../../engine/components/Character";
import AreaDialog from "../../../engine/AreaDialog";

export default class Princess extends Character {
    constructor(x: number, y: number, height: number, dialog: AreaDialog) {
        super(x, y, height, dialog, [
            ["default", require('./princess_default')]
        ]);

        this.title = "Demon-eyed Princess";
    }
}