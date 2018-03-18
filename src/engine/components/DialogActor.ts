
import {GameObjectConstructor} from "./Mixins";
import AreaDialog from "../AreaDialog";

function DialogActor<TBase extends GameObjectConstructor>(Base: TBase) {
    return class extends Base {

        private _dialog: AreaDialog;
        private _title: string;

        initDialogActor(dialog: AreaDialog, title: string = "") {

            this._dialog = dialog;
            this._title = title;
            return this;
        }

        async say(text: string, clearFirst: boolean = true): Promise<void> {
            if (this._dialog) {
                await this._dialog.fadeIn();
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