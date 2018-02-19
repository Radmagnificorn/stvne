import GameObject from "../GameObject";
import GameWindow from "../GameWindow";

export abstract class Component {
    protected gameObject: GameObject;

    onAdd() {
        this.gameObject
    }

    //called by parent when component is added
    register(parent: GameObject): Component {
        this.gameObject = parent;
        this.onAdd();
        return this;
    }

    name: string;
}

