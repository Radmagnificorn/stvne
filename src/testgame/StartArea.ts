import Scene from "../engine/Scene";
import AnimatedTextboxComponent, {default as DialogComponent} from "../engine/components/DialogComponent";
import GameObject from "../engine/GameObject";
import ResourceLoader from "../engine/ResourceLoader";
import ImageComponent from "../engine/components/ImageComponent";
import ActionEvents from "../engine/ActionEvents";

class StartArea extends Scene {

    constructor() {
        super();
    }

    buildScene(imgs: HTMLImageElement[]) {

        let dialogBox = new GameObject(0, 450);
        dialogBox.addComponent(new AnimatedTextboxComponent());
        let dialog = <DialogComponent>dialogBox.components['dialog'];

        let background = new GameObject(0,0);
        background.addComponent(new ImageComponent(imgs[1], true));

        //vampire
        let vampire = new GameObject(286, 60);
        let vampImageComponent = new ImageComponent(imgs[0], true);
        vampire.addComponent(vampImageComponent);
        vampire.element.addEventListener('click', (e) => {
            dialog.writeText("Hello, I am a vampire. Welcome to my study. As you can see, I have many books")
                .then(() => ActionEvents.waitForClick(dialogBox.element))
                .then(() => dialog.writeText("and not just any books..."))
                .then(() => ActionEvents.pause(1000))
                .then(() => dialog.writeText("good books.", false))
                .then(() => ActionEvents.waitForClick(dialogBox.element))
                .then(() => dialog.writeText("do you like to read books?"))
                .then(() => dialog.writeOptions(["Yes, books are awesome!", "No... not a fan."], false))
                .then((response) => {
                    if (response === "Yes, books are awesome!") {
                        dialog.writeText("Yes, I thought you might");
                    } else {
                        dialog.writeText("Oh, well that's ok...");
                    }
                })
        });


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