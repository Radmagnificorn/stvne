
class GameState {

    private _state: Map<string, string> = new Map();

    set(key: string, value: string): Promise<void> {

        return new Promise<void>(resolve => {
            this._state.set(key, value);
            resolve();
        })
    }

    get(key: string): Promise<string> {
        return new Promise<string>(resolve => resolve(this._state.get(key)));
    }


}

export default GameState;