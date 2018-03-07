import Scene from "../Scene";
import {GameObjectConstructor} from "./Mixins";

function Portal<TBase extends GameObjectConstructor>(Base: TBase) {
    return class extends Base {
        private _target: Scene;
        initPortal(target: Scene) {
            this._target = target;
            this.element.addEventListener('click', (ev => {this._target.load()}));
            return this;
        }

    }
}

export default Portal;