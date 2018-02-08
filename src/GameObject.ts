import GameWindow from "./GameWindow";

class GameObject {

    children: GameObject[] = [];
    parent: GameObject;
    location: Vector2d;


    update(): void {
        this.children.forEach(c => c.update());
    };
    render(gameWindow: GameWindow): void {
        this.children.forEach(c => c.render(gameWindow));
    };

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