import GameScreen from "../engine/GameScreen";
import ResourceLoader from "../engine/ResourceLoader";
import GameObject from "../engine/GameObject";
import Portal from "../engine/components/PortalComponent";
import StartArea from "./StartArea";

class StartScreen extends GameScreen {


    loadResources() {
        return new Promise(resolve => {
            ResourceLoader.loadImages(require('./resources/splash.png')).then((imgs) => {
                const BG = Portal(GameObject);
                let bg = new BG();
                bg.initPortal(new StartArea(this._gameInstance));
                bg.image = imgs[0];
                bg.element.innerText = "Click to Start";
                bg.element.style.fontSize = "100px";
                bg.element.style.textAlign = "center";
                bg.element.style.verticalAlign = "center";
                this.sceneGraph.appendChild(bg);
                resolve();
            });
        });
    }
}

export default StartScreen;