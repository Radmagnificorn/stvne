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
import CharacterComponent from "../engine/components/CharacterComponent";
import Hallway from "./Hallway";

class SecondArea extends Area {

    async buildScene(imgs: HTMLImageElement[]) {



        let gs = this._gameInstance.gameState;

        let exit = new GameObject();
        exit.addComponent(new PortalComponent(new Hallway(this._gameInstance)));
        exit.width = 50;
        exit.height = 720;

        let background = new GameObject();
        background.addComponent(new ImageComponent(imgs[0]));


        let dialog = this.dialogComponent;
        let princessGo = new GameObject(505,190);
        let princess = new CharacterComponent("Demon-eyed Princess", new Map([['default', imgs[1]]]), dialog);
        princessGo.addComponent(princess);
        princessGo.element.style.opacity = '0';

        this.gameLayer.appendChild(princessGo);
        this.gameLayer.appendChild(exit);
        this.backgroundLayer.appendChild(background);

        await AE.pause(1000);
        await AniEvents.fadeIn(princessGo, 1);
        await princess.say("Hello, I am a princess of some sort... ");
        await AE.pause(250);
        await princess.say("welcome to my bridge", false);
        await AE.waitForClick(dialog);
        await princess.say("If you want to pass, you must answer a riddle.");
        await AE.waitForClick(dialog);
        let response = await princess.ask("How many cabbages do you think I could carry at one time?",
            ["One", "Five", "Twelve", "Fourteen"]);
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

        await gs.set("second_area.cabbages", response);

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
            ResourceLoader.loadImages(require("./resources/palace.png"), require("./resources/princess.png")).then(imgs => {
                this.buildScene(imgs);
                resolve();
            });
        });
    }
}

export default SecondArea;