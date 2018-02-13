import GameWindow from "./GameWindow";
import {Component} from "./components/Component";

class GameObject {

    children: GameObject[] = [];
    parent: GameObject;
    private _location: Vector2d;
    private components: Component[] = [];

    constructor(location: Vector2d = new Vector2d(0,0)) {
        this._location = location;
    }

    update(): void {
        this.components.forEach(c => c.update());
        this.children.forEach(c => c.update());
    }
    render(gameWindow: GameWindow): void {
        this.components.forEach(component => component.render(gameWindow));
        this.children.forEach(child => child.render(gameWindow));
    }

    getChildren(): GameObject[] {
        return this.children;
    }

    appendChild(child: GameObject) {
        child.setParent(this);
        this.children.push(child);
    }

    private setParent(parent: GameObject): GameObject {
        this.parent = parent;
        return this;
    }

    addComponent(component: Component) {
        this.components.push(component.register(this));
    }

    get location(): Vector2d {
        return this._location;
    }

    set location(location: Vector2d) {
        this._location = location;
    }

}

export class Vector2d {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export default GameObject;