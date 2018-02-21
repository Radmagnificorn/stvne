import ImageComponent from "./ImageComponent";

class CharacterComponent extends ImageComponent {
    private _portraits: {[key: string]: HTMLImageElement} = {};
    private _CharName: string;

    constructor(name: string, portraits: {[key: string]: HTMLImageElement}) {
        super(portraits['default']);

        this._CharName = name;
        this._portraits = portraits;
    }

    showPortrait(name: string): Promise<void> {
        return new Promise<void>(resolve => {
            this.image = this._portraits[name];
            resolve();
        });
    }

    get name() {
        return "character";
    }



}

export default CharacterComponent;