import GameObject from "../GameObject";

class AniEvents {

    static fadeOut(target: HTMLElement | GameObject, seconds: number): Promise<void> {
        return this.fadeTo(target, "0.0", seconds);
    }

    static fadeIn(target: HTMLElement | GameObject, seconds: number): Promise<void> {
        return this.fadeTo(target, "1.0", seconds);
    }

    static fadeTo(target: HTMLElement | GameObject, opacity: string, seconds: number): Promise<void> {

        let el = this.getElement(target);
        el.style.transition = "opacity " + seconds + "s";
        el.style.transitionTimingFunction = 'linear';
        el.style.transitionDelay = '0';
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