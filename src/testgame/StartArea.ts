import Area from "../engine/Area";
import ImageComponent from "../engine/components/ImageComponent";
import AnimatedTextboxComponent from "../engine/components/AnimatedTextboxComponent";
import {Vector2d} from "../engine/GameObject";
import GameObject from "../engine/GameObject";
import ResourceLoader from "../engine/ResourceLoader";

class StartArea extends Area {

    constructor() {
        super();



    }

    buildScene(imgs: HTMLImageElement[]) {
        let textboxText = "This is some text. I want this text to display inside of the dialog box. It should break correctly on the words. Pneumonoultramicroscopicsilicovolcanoconiosos";
        let text2 = "And this is some more text that I want to show after the first round of text. Hopefully this works out as planned.";


        let dialogBox = new GameObject(new Vector2d(0, 450));
        let dialog = new AnimatedTextboxComponent();
        dialogBox.addComponent(dialog);
        dialog.writeText(textboxText);
        dialog.getHtmlElement().addEventListener('click', (ev => {
            dialog.writeText(text2);
        }));

        let background = new GameObject(new Vector2d(0,0));
        background.addComponent(new ImageComponent(imgs[1]));

        let vampire = new GameObject(new Vector2d(60, 60));
        vampire.addComponent(new ImageComponent(imgs[0]));

        background.appendChild(vampire);
        this.sceneGraph.appendChild(background);
        this.sceneGraph.appendChild(dialogBox);
    }

    loadResources() {
        return new Promise(resolve => {
            ResourceLoader.loadImages("test.png", "office.png").then(imgs => {
                this.buildScene(imgs);
                resolve();
            });
        });
    }


}

export default StartArea;