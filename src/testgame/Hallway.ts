import Area from "../engine/Area";
import GameObject from "../engine/GameObject";
import ResourceLoader from "../engine/ResourceLoader";
import ImageComponent from "../engine/components/ImageComponent";
import Portal from "../engine/components/PortalComponent";
import SecondArea from "./SecondArea";
import DialogComponent from "../engine/components/DialogComponent";
import StartArea from "./StartArea";


class Hallway extends Area {

    private dialog: DialogComponent;

    async buildScene(imgs: Map<string, HTMLImageElement>) {

        let gs = this._gameInstance.gameState;

        let d = this.dialogComponent;
        let dialogBox = this.dialogComponent.element;
        this.dialog = d;

        const Exit = Portal(GameObject);
        let outsideExit = new Exit(725, 200, 300, 100);
        outsideExit.initPortal(new SecondArea(this._gameInstance));


        let officeExit = new Exit(0, 630, 100, 1280);
        officeExit.initPortal(new StartArea(this._gameInstance));



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