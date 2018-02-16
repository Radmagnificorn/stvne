import {Component} from "./Component";
import "./DialogStyle.scss";
import AnimationTimer from "../AnimationTimer";

class DialogComponent extends Component {

    private letters: Iterator<HTMLSpanElement>;
    private isVisible: boolean = false;
    private sendFinishedNotification: Function;
    private _timer: AnimationTimer;

    private _running: boolean = false;

    constructor() {
        super();
        this._timer = new AnimationTimer(this.update.bind(this), 30);
    }

    onAdd() {
        let element = this.gameObject.element;
        element.classList.add('animated_dialog_box');
    }

    private createStyleableText(text: string): HTMLDivElement[] {
        return text.split(' ').map(
            word => this.createStyleableWord(word));
    }

    private createStyleableWord(word: string): HTMLDivElement {
        let styleableWord = document.createElement('div');
        styleableWord.className = 'word';
        [... word].forEach(char => {
            let styleableLetter = document.createElement('span');
            styleableLetter.innerText = char;
            styleableLetter.style.visibility = 'hidden';
            styleableWord.appendChild(styleableLetter);
        });

        return styleableWord;
    }

    update() {
        if (this.isVisible) {
            let letterIterator = this.letters.next();
            if (!letterIterator.done) {
                letterIterator.value.style.visibility = 'visible';
            } else {
                this.sendFinishedNotification();
                this._timer.stop();
            }
        }
    }

    private *showLetters(): Iterator<HTMLSpanElement> {
        let words = this.gameObject.element.children;
        for (let w = 0; w < words.length; w++) {
            for(let l = 0; l < words[w].children.length; l++) {
                yield <HTMLSpanElement>words[w].children[l];
            }
        }
    }

    private showDialog() {
        this.isVisible = true;
        this.gameObject.element.classList.add('visible');
    }

    private hideDialog() {
        this.isVisible = false;
        this.gameObject.element.classList.remove('visible');
    }

    writeText(text: string, clearBox: boolean = true): Promise<void> {
        if (clearBox) {
            this.gameObject.element.innerHTML = '';
        }
        this.createStyleableText(text).forEach(word => this.gameObject.element.appendChild(word));
        this.letters = this.showLetters();
        this.showDialog();
        this._timer.start();
        return new Promise<void>(resolve => {this.sendFinishedNotification = resolve});
    }

    writeOptions(options: string[], clearBox: boolean = true): Promise<string> {

        return new Promise<string>(resolve => {
            options.forEach(option => {
                let button = document.createElement('div');
                button.innerText = option;
                button.classList.add('dialog_option');
                this.gameObject.element.appendChild(button);
                button.addEventListener('click', ev => {
                    resolve(option);
                });
            });

            this.writeText('', clearBox);
        });
    }

    get name(): string {
        return "dialog"
    }
}

export default DialogComponent;