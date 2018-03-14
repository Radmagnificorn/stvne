import {GameObjectConstructor} from "./Mixins";
import AnimationTimer from "../animation/AnimationTimer";

function DialogContainer<TBase extends GameObjectConstructor>(Base: TBase) {
    return class extends Base {

        private letters: Iterator<HTMLSpanElement>;
        private isVisible: boolean = false;
        private sendFinishedNotification: Function;
        private _timer: AnimationTimer;
        private _titleBox: HTMLDivElement;
        private _textArea: HTMLDivElement;

        initDialogContainter() {
            let dialogEl = this.createDialogUI();
            this._titleBox = <HTMLDivElement>dialogEl.getElementsByClassName('title_box')[0];
            this._textArea = <HTMLDivElement>dialogEl.getElementsByClassName('text_area')[0];
            this.element.appendChild(dialogEl);

            this.element.style.opacity = '0';

            this._timer = new AnimationTimer(this.update.bind(this), 30);
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
            let words = this._textArea.children;
            for (let w = 0; w < words.length; w++) {
                for(let l = 0; l < words[w].children.length; l++) {
                    yield <HTMLSpanElement>words[w].children[l];
                }
            }
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

    }
}

export default DialogContainer;