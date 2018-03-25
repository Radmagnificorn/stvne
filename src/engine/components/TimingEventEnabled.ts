import {GameObjectConstructor} from "./Mixins";
import GameObject from "../GameObject";
import {Component} from "./Component";

export default function TimingEventEnabled<TBase extends GameObjectConstructor>(Base: TBase) {
    return class extends Base {
        waitForClick(): Promise<void> {
            // wait for a click, then have the listener remove itself
            let element = this.element;
            return new Promise<void>(resolve => {
                let listener = (e: Event) => {
                    resolve();
                    element.removeEventListener('click', listener)
                };
                element.addEventListener('click', listener);
            });
        };

        pause(time: number): Promise<void> {
            return new Promise<void>(resolve => {
                setTimeout(resolve, time)
            });
        }
    }


}