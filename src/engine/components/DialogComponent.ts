import {Component} from "./Component";
import "./DialogStyle.scss";
import AnimationTimer from "../animation/AnimationTimer";

class DialogComponent extends Component {

    private letters: Iterator<HTMLSpanElement>;
    private isVisible: boolean = false;
    private sendFinishedNotification: Function;
    private _timer: AnimationTimer;
    private _titleBox: HTMLDivElement;
    private _textArea: HTMLDivElement;
    private _element: HTMLDivElement;

    private _running: boolean = false;

    constructor() {
        super();
        this._timer = new AnimationTimer(this.update.bind(this), 30);
    }

    onAdd() {
        this._element = this.createDialogUI();
        this._titleBox = <HTMLDivElement>this._element.getElementsByClassName('title_box')[0];
        this._textArea = <HTMLDivElement>this._element.getElementsByClassName('text_area')[0];
        this.gameObject.element.appendChild(this._element);
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

    private createDialogUI(): HTMLDivElement {
        let element = document.createElement('div');
        element.classList.add('animated_dialog_box');
        let titleBox = document.createElement('div');
        titleBox.classList.add('title_box');
        let textArea = document.createElement('div');
        textArea.classList.add('text_area');
        element.appendChild(textArea);
        element.appendChild(titleBox);

        return element;
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
        let words = this._textArea.children;
        for (let w = 0; w < words.length; w++) {
            for(let l = 0; l < words[w].children.length; l++) {
                yield <HTMLSpanElement>words[w].children[l];
            }
        }
    }

    showDialog() {
        let aniEnd = this.startAnimationEndListener();
        this.isVisible = true;
        this._element.classList.add('visible');
        return aniEnd;
    }


    hideDialog() {
        let aniEnd = this.startAnimationEndListener();
        this.isVisible = false;
        this._element.classList.remove('visible');
        return aniEnd;
    }

    private startAnimationEndListener() {
        return new Promise<void>(resolve => {
            let aniEndListener = () => {
                resolve();
                this.element.removeEventListener('transitionend', aniEndListener);
            };
            this.element.addEventListener('transitionend', aniEndListener, false);
        });
    }

    writeText(text: string, clearBox: boolean = true, title?: string): Promise<void> {
        if (clearBox) {
            this._textArea.innerHTML = '';
        }
        if (title) {
            this._titleBox.classList.add('visible');
            this._titleBox.innerText = title;
        } else {
            this._titleBox.classList.remove('visible');
        }
        this.createStyleableText(text).forEach(word => this._textArea.appendChild(word));
        this.letters = this.showLetters();
        this.showDialog();
            this._timer.start();
        return new Promise<void>(resolve => {this.sendFinishedNotification = resolve});
    }

    presentOptions(options: string[], clearBox: boolean = false, title?: string): Promise<string> {

        return new Promise<string>(resolve => {
            let optionContainer = document.createElement('div');
            options.forEach(option => {
                let button = document.createElement('div');
                button.innerText = option;
                button.classList.add('dialog_option');
                optionContainer.appendChild(button);
                button.addEventListener('click', ev => {
                    resolve(option);
                });
            });
            this._textArea.appendChild(optionContainer);

            this.writeText('', false, title);
        });
    }

    get name(): string {
        return "dialog"
    }
}

export default DialogComponent;