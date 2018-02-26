import ImageComponent from "./ImageComponent";

class CharacterComponent extends ImageComponent {
    private _portraits: Map<string, HTMLImageElement>;
    private _CharName: string;

    constructor(name: string, portraits: Map<string, HTMLImageElement>) {
        super(portraits.get('default'));

        this._CharName = name;
        this._portraits = portraits;
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



}

export default CharacterComponent;