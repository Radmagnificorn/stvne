import GameObject from "../GameObject";

export type Constructor<T = {}> = new (...args: any[]) => T;
export type GameObjectConstructor = Constructor<GameObject>;