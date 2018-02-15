import HtmlDivComponent from "./HtmlDivComponent";
import "./AnimatedTextboxStyle.scss";

class AnimatedDialogBoxComponent extends HtmlDivComponent {

    private letters: Iterator<HTMLSpanElement>;

    constructor(id: string = '', doc: Document = document) {
        super(id, doc);
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

    createElement() {
        super.createElement();
        this._element.className = 'animated_dialog_box';
    }

    update() {
        let letterIterator = this.letters.next();
        if (!letterIterator.done) {
            letterIterator.value.style.visibility = 'visible';
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


    writeText(text: string) {
        if (!this._element) {
            this.createElement();
        }
        this._element.innerHTML = '';
        this.createStyleableText(text).forEach(word => this._element.appendChild(word));
        this.letters = this.showLetters();
    }
}

export default AnimatedDialogBoxComponent;