import ResourceLoader from "../engine/ResourceLoader";
import GameObject from "../engine/GameObject";
import ImageComponent from "../engine/components/ImageComponent";
import AE from "../engine/ActionEvents";
import Portal, {Exit} from "../engine/components/PortalComponent";
import Area from "../engine/Area";
import AniEvents from "../engine/animation/AniEvents";
import Character from "../engine/components/Character";
import Hallway from "./Hallway";

class SecondArea extends Area {

    async buildScene(imgs: HTMLImageElement[]) {

        let gs = this._gameInstance.gameState;


        let toHallway = new Exit(0, 0, 720, 50);
        toHallway.initPortal(new Hallway(this._gameInstance));

        this.setPortals(toHallway);

        let background = new GameObject();
        background.addComponent(new ImageComponent(imgs[0]));


        let dialog = this.dialogComponent;
        let princess = new Character(505,190);
        princess.initDialogActor(dialog, "Demon-eyed Princess")
            .initDynamicImage(new Map([['default', imgs[1]]]));
        princess.element.style.opacity = '0';

        this.gameLayer.appendChild(princess);
        this.gameLayer.appendChild(toHallway);
        this.backgroundLayer.appendChild(background);

        await AE.pause(1000);
        await AniEvents.fadeIn(princess, 1);
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