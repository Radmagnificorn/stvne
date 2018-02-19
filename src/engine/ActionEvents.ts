class ActionEvents {
    static pause(time: number): () => Promise<void> {
        return () => {
            return new Promise<void>(resolve => {
                setTimeout(resolve, time)
            });
        };
    }

    static waitForClick(element: HTMLElement): () => Promise<void> {
        // wait for a click, then have the listener remove itself
        return () => {
            return new Promise<void>(resolve => {
                let listener = (e: Event) => {
                    resolve();
                    element.removeEventListener('click', listener)
                };
                element.addEventListener('click', listener);
            });
        };

    }
}

export default ActionEvents;