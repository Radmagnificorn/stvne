import Scene from "../engine/Scene";
import StartArea from "./StartArea";
import ResourceLoader from "../engine/ResourceLoader";
import GameObject from "../engine/GameObject";
import ImageComponent from "../engine/components/ImageComponent";
import AnimatedTextboxComponent, {default as DialogComponent} from "../engine/components/DialogComponent";
import AE from "../engine/ActionEvents";
import PortalComponent from "../engine/components/PortalComponent";

class SecondArea extends Scene {

    buildScene(imgs: HTMLImageElement[]) {

        let exit = new GameObject();
        exit.addComponent(new PortalComponent(new StartArea(this._gameInstance)));
        exit.width = 50;
        exit.height = 720;

        let background = new GameObject();
        background.addComponent(new ImageComponent(imgs[0]));

        let princess = new GameObject(505,190, imgs[1]);


        let dialogBox = new GameObject(0, 450);
        dialogBox.addComponent(new AnimatedTextboxComponent());
        let dialog = <DialogComponent>dialogBox.components['dialog'];

        AE.waitForClick(princess.element)()
            .then(() => dialog.writeText("Hello, I am a princess of some sort... "))
            .then(AE.pause(250))
            .then(() => dialog.writeText("welcome to my bridge", false))
            .then(AE.waitForClick(dialogBox.element))
            .then(() => dialog.writeText("If you want to pass, you must answer a riddle."))
            .then(AE.waitForClick(dialogBox.element))
            .then(() => dialog.writeText("How many cabbages do you think I could carry at one time?"))
            .then(() => dialog.presentOptions(["One", "Five", "Twelve", "Fourteen"]))
            .then((response) => {
                switch (response) {
                    case 'One':
                        return dialog.writeText("Really? One? okay ya dick, whatever");
                    case 'Five':
                        return dialog.writeText("Yeah, I think that's probably about right");
                    default:
                        return dialog.writeText("Uh, thanks? You're an idiot though. That is not even remotely realistic")
                }
            })
            .then(AE.waitForClick(dialogBox.element))
            .then(() => dialog.writeText("Oh well... It doesn't even really matter if you got it right or wrong. I was never going to let you pass."))
            .then(AE.waitForClick(dialogBox.element))
            .then(() => dialog.writeText("bye... "))
            .then(AE.pause(500))
            .then(() => dialog.hideDialog());


        background.appendChild(princess);
        background.appendChild(exit);
        this.sceneGraph.appendChild(background);
        this.sceneGraph.appendChild(dialogBox);

    }

    loadResources() {
        return new Promise(resolve => {
            ResourceLoader.loadImages("palace.png", "princess.png").then(imgs => {
                this.buildScene(imgs);
                resolve();
            });
        });
    }
}

export default SecondArea;