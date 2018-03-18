import GameObject from "../GameObject";
import ActionEvents from "../ActionEvents";

class AniEvents {

    static fadeOut(target: HTMLElement | GameObject, seconds: number): Promise<void> {
        return this.fadeTo(target, "0.0", seconds);
    }

    static fadeIn(target: HTMLElement | GameObject, seconds: number): Promise<void> {
        return this.fadeTo(target, "1.0", seconds);
    }

    static async fadeTo(target: HTMLElement | GameObject, opacity: string, seconds: number, startValue: number = -1): Promise<void> {

        let el = this.getElement(target);

        // resolve immediately if there is no change in opacity
        if ( parseFloat(opacity) === parseFloat(el.style.opacity)) {
            return Promise.resolve();
        }

        if (startValue !== -1) {
            el.style.transitionDuration = '0s';
            el.style.opacity = `${startValue}`;
        }
        el.style.transition = `opacity ${seconds}s`;
        el.style.transitionTimingFunction = 'linear';
        el.style.transitionDelay = '0';

        let eaPromise = this.attachEndAnimationListener(el);

        // unfortunately there is no event for when css is finished recalculating,
        // so we have to wait...
        await ActionEvents.pause(100);

        el.style.opacity = opacity;

        return eaPromise;

    }

    private static getElement(target: GameObject | HTMLElement): HTMLElement {
        return (<GameObject>target).element || <HTMLElement>target;
    }

    private static attachEndAnimationListener(element: HTMLElement) {
        return new Promise<void>(resolve => {
            let aniEndListener = () => {
                console.log("removing listener");
                element.removeEventListener('transitionend', aniEndListener);
                resolve();
            };
            console.log("attaching end animation listener");
            element.addEventListener('transitionend', aniEndListener, false);
        });
    }

}

export default AniEvents;