import Scene from "../GameScreen";
import {GameObjectConstructor} from "./Mixins";
import Area from "../Area";

function Portal<TBase extends GameObjectConstructor>(Base: TBase) {
    return class extends Base {
        private _target: Area;
        initPortal(target: Area) {
            this._target = target;
            this.element.addEventListener('click', (ev => {this._target.load()}));
            return this;
        }

    }
}

export default Portal;