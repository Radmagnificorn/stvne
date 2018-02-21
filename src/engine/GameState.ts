
class GameState {

    private _state: { [key: string]: string; } = {};

    set(key: string, value: string) {

        return new Promise<void>(resolve => {
            this._state[key] = value;
            resolve();
        })
    }

    get(key: string): Promise<string> {
        return new Promise<string>(resolve => resolve(this._state[key]));
    }


}

export default GameState;