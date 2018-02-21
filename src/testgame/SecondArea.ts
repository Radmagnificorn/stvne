import Scene from "../engine/Scene";
import StartArea from "./StartArea";
import ResourceLoader from "../engine/ResourceLoader";
import GameObject from "../engine/GameObject";
import ImageComponent from "../engine/components/ImageComponent";
import AnimatedTextboxComponent, {default as DialogComponent} from "../engine/components/DialogComponent";
import AE from "../engine/ActionEvents";
import PortalComponent from "../engine/components/PortalComponent";
import Area from "../engine/Area";
import AniEvents from "../engine/animation/AniEvents";

class SecondArea extends Area {

    async buildScene(imgs: HTMLImageElement[]) {



        let gs = this._gameInstance.gameState;

        let exit = new GameObject();
        exit.addComponent(new PortalComponent(new StartArea(this._gameInstance)));
        exit.width = 50;
        exit.height = 720;

        let background = new GameObject();
        background.addComponent(new ImageComponent(imgs[0]));

        let princess = new GameObject(505,190, imgs[1]);


        let dialog = this.dialogComponent;

        princess.element.style.opacity = '0';

        this.gameLayer.appendChild(princess);
        this.gameLayer.appendChild(exit);
        this.backgroundLayer.appendChild(background);

        await AE.pause(1000);
        await AniEvents.fadeIn(princess, 1);
        await dialog.writeText("Hello, I am a princess of some sort... ");
        await AE.pause(250);
        await dialog.writeText("welcome to my bridge", false);
        await AE.waitForClick(dialog);
        await dialog.writeText("If you want to pass, you must answer a riddle.");
        await AE.waitForClick(dialog);
        await dialog.writeText("How many cabbages do you think I could carry at one time?");
        let response = await dialog.presentOptions(["One", "Five", "Twelve", "Fourteen"]);
        switch (response) {
            case 'One':
                await dialog.writeText("Really? One? okay ya dick, whatever");
                break;
            case 'Five':
                await dialog.writeText("Yeah, I think that's probably about right");
                break;
            default:
                await dialog.writeText("Uh, thanks? You're an idiot though. That is not even remotely realistic");
        }

        await AE.waitForClick(dialog);
        await dialog.writeText("Oh well... It doesn't even really matter if you got it right or wrong. I was never going to let you pass.");
        await AE.waitForClick(dialog);
        await dialog.writeText("bye... ");
        await this.gameState.set("second_area.princess_talk", "true");
        await AE.pause(500);
        await dialog.hideDialog();

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