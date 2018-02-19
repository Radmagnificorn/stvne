import {Component} from "./Component";
import Scene from "../Scene";

class PortalComponent extends Component {

    private _target: Scene;

    constructor(target: Scene) {
        super();
        this._target = target;
    }

    onAdd() {
        this.gameObject.element.addEventListener('click', (ev => {this._target.load()}));
    }


}

export default PortalComponent;