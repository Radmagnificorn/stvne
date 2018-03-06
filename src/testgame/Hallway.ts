import Area from "../engine/Area";
import GameObject, {Vector2d} from "../engine/GameObject";
import ResourceLoader from "../engine/ResourceLoader";
import ImageComponent from "../engine/components/ImageComponent";
import AE from "../engine/ActionEvents";
import PortalComponent from "../engine/components/PortalComponent";
import SecondArea from "./SecondArea";
import AniEvents from "../engine/animation/AniEvents";
import DialogComponent from "../engine/components/DialogComponent";
import CharacterComponent from "../engine/components/CharacterComponent";
import StartArea from "./StartArea";


class Hallway extends Area {

    private dialog: DialogComponent;

    async buildScene(imgs: Map<string, HTMLImageElement>) {

        let gs = this._gameInstance.gameState;

        let d = this.dialogComponent;
        let dialogBox = this.dialogComponent.element;
        this.dialog = d;
        let outsideExit = new GameObject();
        outsideExit.addComponent(new PortalComponent(new SecondArea(this._gameInstance)));
        outsideExit.width = 100;
        outsideExit.height = 300;
        outsideExit.location = new Vector2d(725, 200);

        let officeExit = new GameObject();
        officeExit.addComponent(new PortalComponent(new StartArea(this._gameInstance)));
        officeExit.width = 1280;
        officeExit.height = 100;
        officeExit.location = new Vector2d(0, 620);



        let background = new GameObject(0,0);
        background.addComponent(new ImageComponent(imgs.get('hallway'), true));



        this.gameLayer.appendChild(outsideExit);
        this.gameLayer.appendChild(officeExit);
        this.backgroundLayer.appendChild(background);

    }


    loadResources() {
        return new Promise(resolve => {
            ResourceLoader.loadImagesToMap(new Map([
                ["hallway", require("./resources/hallway.png")]
            ]))
                .then(imgs => {
                    resolve();
                    this.buildScene(imgs)
                });

        });
    }
}



export default Hallway;