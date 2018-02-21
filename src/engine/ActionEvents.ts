import GameObject from "./GameObject";
import {Component} from "./components/Component";

class ActionEvents {
    static pause(time: number): Promise<void> {
        return new Promise<void>(resolve => {
            setTimeout(resolve, time)
        });
    }

    static doNothing(): Promise<void> {
        return Promise.resolve();
    }

    static waitForClick(obj: HTMLElement | GameObject | Component): Promise<void> {
        // wait for a click, then have the listener remove itself
        let element: HTMLElement = (<GameObject>obj).element || <HTMLElement>obj
        return new Promise<void>(resolve => {
            let listener = (e: Event) => {
                resolve();
                element.removeEventListener('click', listener)
            };
            element.addEventListener('click', listener);
        });
    };
}

export default ActionEvents;