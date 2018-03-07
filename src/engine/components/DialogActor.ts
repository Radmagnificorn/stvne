
import {GameObjectConstructor} from "./Mixins";
import DialogComponent from "./DialogComponent";

function DialogActor<TBase extends GameObjectConstructor>(Base: TBase) {
    return class extends Base {

        private _dialog: DialogComponent;
        private _title: string;

        initDialogActor(dialog: DialogComponent, title: string = "") {

            this._dialog = dialog;
            this._title = title;
            return this;
        }

        say(text: string, clearFirst: boolean = true): Promise<void> {
            if (this._dialog) {
                return this._dialog.writeText(text, clearFirst, this._title);
            }

            else return Promise.resolve();
        }

        ask(question: string, options: string[]): Promise<string> {
            return this.say(question, true).then(() => {
                return this._dialog.presentOptions(options, false, this._title);
            });
        }
    }
}

export default DialogActor;