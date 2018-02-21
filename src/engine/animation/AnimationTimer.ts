class AnimationTimer {

    private _fps: number;
    private _action: Function;
    private _timerId: number;

    constructor(action: Function, fps: number) {
        this._action = action;
        this._fps = fps;
    }

    start() {
        this._timerId = setInterval(this._action, 1000/this._fps);
    }

    stop() {
        clearInterval(this._timerId);
    }
}

export default AnimationTimer;