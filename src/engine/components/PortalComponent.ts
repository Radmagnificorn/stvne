import Scene from "../GameScreen";
import {GameObjectConstructor} from "./Mixins";
import Area from "../Area";
import GameObject from "../GameObject";

function Portal<TBase extends GameObjectConstructor>(Base: TBase) {
    return class extends Base {
        private _target: Area;
        private _locked: boolean = false;

        initPortal(target: Area) {
            this._target = target;
            this.element.addEventListener('click', (ev => {
                if (!this._locked) {
                    this._target.load();
                }
            }));
            this.element.classList.add('portal');
            return this;
        }

        showPortal() {
            this.element.classList.add("visible");
        }

        hidePortal() {
            this.element.classList.remove("visible");
        }

        isVisible() {
            return this.element.classList.contains("visible");
        }

        lock() {
            this._locked = true;
        }

        unlock() {
            this._locked = false;
        }

    }
}

export class Exit extends Portal(GameObject) {}

export default Portal;