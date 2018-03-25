
class GameState {

    private _state: Map<string, string> = new Map();
    private _flags: Map<string, boolean> = new Map();

    set(key: string, value: string): Promise<void> {

        return new Promise<void>(resolve => {
            this._state.set(key, value);
            resolve();
        })
    }

    get(key: string): Promise<string> {
        return new Promise<string>(resolve => resolve(this._state.get(key)));
    }

    async setFlag(key: string, value: boolean): Promise<void> {
        this._flags.set(key, value);
    }

    async getFlag(key: string): Promise<boolean> {
        return this._flags.get(key);
    }

}

export default GameState;