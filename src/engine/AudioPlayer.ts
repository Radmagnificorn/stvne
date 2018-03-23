export default class AudioPlayer {

    private static _instance: AudioPlayer;
    private _player: HTMLAudioElement;

    play(url: string) {
        this._player.src = url;
        this._player.play();
    }

    stop() {
        this._player.pause();
    }

    static get instance() {
        if (!this._instance) {
            this._instance = new AudioPlayer();
        }

        return this._instance;
    }

}