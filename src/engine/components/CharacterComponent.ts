import ImageComponent from "./ImageComponent";
import DialogComponent from "./DialogComponent";
import DialogActor from "./DialogActor";
import DynamicImage from "./DynamicImage";
import GameObject from "../GameObject";

class CharacterComponent extends ImageComponent {
    private _portraits: Map<string, HTMLImageElement>;
    private _charName: string;
    private _dialog: DialogComponent;

    constructor(name: string, portraits: Map<string, HTMLImageElement>, dialog?: DialogComponent) {
        super(portraits.get('default'));

        this._charName = name;
        this._portraits = portraits;
        this._dialog = dialog;
    }

    showPortrait(name: string): Promise<void> {
        return new Promise<void>(resolve => {
            this.image = this._portraits.get(name);
            resolve();
        });
    }

    get name() {
        return "character";
    }


    say(text: string, clearFirst: boolean = true): Promise<void> {
        if (this._dialog) {
            return this._dialog.writeText(text, clearFirst, this._charName);
        }

        else return Promise.resolve();
    }

    ask(question: string, options: string[]): Promise<string> {
        return this.say(question, true).then(() => {
            return this._dialog.presentOptions(options, false, this._charName);
        });
    }




}

export class Character extends DynamicImage(DialogActor(GameObject)) {}

export default CharacterComponent;