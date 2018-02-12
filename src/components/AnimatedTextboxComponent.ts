import HtmlDivComponent from "./HtmlDivComponent";
import "./AnimatedTextboxStyle.scss";

class AnimatedDialogBoxComponent extends HtmlDivComponent {

    private letters: Iterator<HTMLSpanElement>;

    constructor(height: number, width: number, color: string = "#000000",  doc: Document = document) {
        super(height, width, color, doc);
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
        this.element.className = 'animated_dialog_box';
    }

    update() {
        let letterIterator = this.letters.next();
        if (!letterIterator.done) {
            letterIterator.value.style.visibility = 'visible';
        }
    }

    private *showLetters(): Iterator<HTMLSpanElement> {
        let words = this.element.children;
        for (let w = 0; w < words.length; w++) {
            for(let l = 0; l < words[w].children.length; l++) {
                yield <HTMLSpanElement>words[w].children[l];
            }
        }
    }


    writeText(text: string) {
        if (!this.element) {
            this.createElement();
        }
        this.element.innerHTML = '';
        this.createStyleableText(text).forEach(word => this.element.appendChild(word));
        this.letters = this.showLetters();
    }
}

export default AnimatedDialogBoxComponent;