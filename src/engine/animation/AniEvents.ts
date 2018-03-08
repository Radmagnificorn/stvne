import GameObject from "../GameObject";

class AniEvents {

    static fadeOut(target: HTMLElement | GameObject, seconds: number): Promise<void> {
        return this.fadeTo(target, "0.0", seconds, 1);
    }

    static fadeIn(target: HTMLElement | GameObject, seconds: number): Promise<void> {
        return this.fadeTo(target, "1.0", seconds, 0);
    }

    static fadeTo(target: HTMLElement | GameObject, opacity: string, seconds: number, startValue: number = -1): Promise<void> {

        let el = this.getElement(target);
        if (startValue !== -1) {
            el.style.opacity = `${startValue}`;
        }
        el.style.transition = "opacity " + seconds + "s";
        el.style.transitionTimingFunction = 'linear';
        el.style.transitionDelay = '1s';
        let eaPromise = this.attachEndAnimationListener(el);

        el.style.opacity = opacity;

        return eaPromise;

    }

    private static getElement(target: GameObject | HTMLElement): HTMLElement {
        return (<GameObject>target).element || <HTMLElement>target;
    }

    private static attachEndAnimationListener(element: HTMLElement) {
        return new Promise<void>(resolve => {
            let aniEndListener = () => {
                resolve();
                element.removeEventListener('transitionend', aniEndListener);
            };
            element.addEventListener('transitionend', aniEndListener, false);
        });
    }

}

export default AniEvents;