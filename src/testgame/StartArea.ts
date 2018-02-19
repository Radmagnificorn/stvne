import Scene from "../engine/Scene";
import AnimatedTextboxComponent, {default as DialogComponent} from "../engine/components/DialogComponent";
import GameObject from "../engine/GameObject";
import ResourceLoader from "../engine/ResourceLoader";
import ImageComponent from "../engine/components/ImageComponent";
import AE from "../engine/ActionEvents";
import PortalComponent from "../engine/components/PortalComponent";
import SecondArea from "./SecondArea";

class StartArea extends Scene {

    buildScene(imgs: HTMLImageElement[]) {

        let dialogBox = new GameObject(0, 450);
        dialogBox.addComponent(new AnimatedTextboxComponent());
        let dialog = <DialogComponent>dialogBox.components['dialog'];

        let exit = new GameObject();
        exit.addComponent(new PortalComponent(new SecondArea(this._gameInstance)));
        exit.width = 50;
        exit.height = 720;



        let background = new GameObject(0,0);
        background.addComponent(new ImageComponent(imgs[1], true));

        //vampire
        let vampire = new GameObject(286, 60);
        let vampImageComponent = new ImageComponent(imgs[0], true);
        vampire.addComponent(vampImageComponent);
        AE.waitForClick(vampire.element)()
            .then(() => dialog.writeText("Hello, I am a vampire. Welcome to my study. As you can see, I have many books"))
            .then(AE.waitForClick(dialogBox.element))
            .then(() => dialog.writeText("and not just any books..."))
            .then(AE.pause(500))
            .then(() => dialog.writeText("good books.", false))
            .then(AE.waitForClick(dialogBox.element))
            .then(() => dialog.writeText("do you like to read books?"))
            .then(() => dialog.presentOptions(["Yes, books are awesome!", "No... not a fan.", "Books are for losers", "No, I'm too cool"], false))
            .then((response) => {
                if (response === "Yes, books are awesome!") {
                    return dialog.writeText("Yes, I thought you might")
                        .then(AE.waitForClick(dialogBox.element))
                        .then(() => dialog.writeText("What kind of books do you like to read?"))
                        .then(() => dialog.presentOptions(["Fiction", "Non-fiction"]))
                        .then((response) => {
                            if (response === "Fiction") {
                                return dialog.writeText("I am a fan of fiction myself")
                            } else {
                                return dialog.writeText("I see, well I generally prefer fiction myself")
                            }
                        });
                } else if (response === "Books are for losers") {
                    return dialog.writeText("Yeah? well maybe books think that you're a loser...");
                } else {
                    return dialog.writeText("Oh, well that's ok...");
                }
            })
            .then(AE.waitForClick(dialogBox.element))
            .then(() => dialog.writeText("Well, I guess I don't have much more to say. Please have a look around."))
            .then(AE.waitForClick(dialogBox.element))
            .then(() => dialog.hideDialog());



        background.appendChild(vampire);
        background.appendChild(exit);
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