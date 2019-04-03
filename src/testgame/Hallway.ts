import Area from "../engine/Area";
import GameObject, {ImageMode} from "../engine/GameObject";
import ResourceLoader from "../engine/ResourceLoader";
import Portal, {Exit} from "../engine/components/PortalComponent";
import SecondArea from "./SecondArea";
import StartArea from "./StartArea";
import Character from "../engine/components/Character";
import ActionEvents from "../engine/ActionEvents";
import Butler from "./characters/butler/Butler";


class Hallway extends Area {

    private _butler: Character;


    async buildScene(imgs: Map<string, HTMLImageElement>) {

        let outsideExit = new Exit(725, 200, 300, 100);
        outsideExit.initPortal(new SecondArea(this._gameInstance));


        let officeExit = new Exit(0, 630, 100, 1280);
        officeExit.initPortal(new StartArea(this._gameInstance));

        this.setPortals(outsideExit, officeExit);


        let background = new GameObject(0,0,0,0, imgs.get('hallway'));
        background.imageMode = ImageMode.WRAP_IMAGE;

        let butler = new Butler(100, 100, 700, this.dialogComponent);
        await butler.loadResources();

        butler.element.style.opacity = "0";
        this._butler = butler;

        this.gameLayer.appendChild(butler);
        this.backgroundLayer.appendChild(background);

    }

    events = {
        butlerDialog: async () => {
            let gs = this._gameInstance.gameState;
            let dialog = this.dialogComponent;
            let butler = this._butler;

            this.lockNavigation();
            await butler.fadeIn(1);
            let butlerAnswer = await butler.ask("Greetings. I am a butler. Is there anything I can get for you?", ["you can get out of my way...", "no thank you"]);
            gs.setFlag("butler.rude_response", (butlerAnswer === "you can get out of my way..."));
            await butler.say("very good then");
            await ActionEvents.waitForClick(dialog);
            await butler.fadeOut(1);
            await dialog.fadeOut();
            this.unlockNavigation();
        }
    };

    onReady() {
        if (!this.gameState.getFlag("butler.rude_response")) {
            this.events.butlerDialog();
        }
    }


    loadResources(): Promise<any> {
        return new Promise(resolve => {
            ResourceLoader.loadImagesToMap([
                ["hallway", require("./resources/hallway.png")]
            ])
                .then(imgs => {
                    resolve();
                    this.buildScene(imgs)
                });

        });
    }
}



export default Hallway;