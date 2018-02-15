import HtmlDivComponent from "./HtmlDivComponent";
import "./AnimatedTextboxStyle.scss";

class AnimatedDialogBoxComponent extends HtmlDivComponent {

    private letters: Iterator<HTMLSpanElement>;
    private isVisible: boolean = false;

    constructor(id: string = '', doc: Document = document) {
        super(id, doc);
        this._element.classList.add('animated_dialog_box');
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
            }
        }
    }

    private *showLetters(): Iterator<HTMLSpanElement> {
        let words = this._element.children;
        for (let w = 0; w < words.length; w++) {
            for(let l = 0; l < words[w].children.length; l++) {
                yield <HTMLSpanElement>words[w].children[l];
            }
        }
    }

    private showDialog() {
        this.isVisible = true;
        this.element.classList.add('visible');
    }

    private hideDialog() {
        this.isVisible = false;
        this.element.classList.remove('visible');
    }

    writeText(text: string) {
        this._element.innerHTML = '';
        this.createStyleableText(text).forEach(word => this._element.appendChild(word));
        this.letters = this.showLetters();
        this.showDialog();
    }
}

export default AnimatedDialogBoxComponent;