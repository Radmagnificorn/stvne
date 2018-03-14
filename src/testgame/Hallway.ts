import Area from "../engine/Area";
import GameObject from "../engine/GameObject";
import ResourceLoader from "../engine/ResourceLoader";
import ImageComponent from "../engine/components/ImageComponent";
import Portal, {Exit} from "../engine/components/PortalComponent";
import SecondArea from "./SecondArea";
import StartArea from "./StartArea";
import Character from "../engine/components/Character";
import ActionEvents from "../engine/ActionEvents";


class Hallway extends Area {

    private _bulter: Character;

    async buildScene(imgs: Map<string, HTMLImageElement>) {

        let gs = this._gameInstance.gameState;


        let outsideExit = new Exit(725, 200, 300, 100);
        outsideExit.initPortal(new SecondArea(this._gameInstance));


        let officeExit = new Exit(0, 630, 100, 1280);
        officeExit.initPortal(new StartArea(this._gameInstance));

        this.setPortals(outsideExit, officeExit);


        let background = new GameObject(0,0);
        background.addComponent(new ImageComponent(imgs.get('hallway'), true));

        let butler = new Character(100, 100);
        butler.initDynamicImage(new Map([["default", imgs.get("butler")]]));
        butler.initDialogActor(this.dialogComponent, "Mysterious Butler");
        butler.element.style.opacity = "0";
        this._bulter = butler;

        this.gameLayer.appendChild(butler);
        this.backgroundLayer.appendChild(background);

    }

    events = {
        butlerDialog: async () => {
            let dialog = this.dialogComponent;
            let butler = this._bulter;
            await butler.fadeIn(1);
            await butler.ask("Greetings. I am a butler. Is there anything I can get for you?", ["you can get out of my way...", "no thank you"]);
            await butler.say("very good then");
            await ActionEvents.waitForClick(dialog);
            await butler.fadeOut(1);
            await dialog.fadeOut();
        }
    };

    onReady() {
        this.events.butlerDialog();
    }


    loadResources(): Promise<any> {
        return new Promise(resolve => {
            ResourceLoader.loadImagesToMap(new Map([
                ["hallway", require("./resources/hallway.png")],
                ["butler", require("./resources/butler.png")]
            ]))
                .then(imgs => {
                    resolve();
                    this.buildScene(imgs)
                });

        });
    }
}



export default Hallway;