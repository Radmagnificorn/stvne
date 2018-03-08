import GameScreen from "../engine/GameScreen";
import ResourceLoader from "../engine/ResourceLoader";
import GameObject from "../engine/GameObject";
import Portal from "../engine/components/PortalComponent";
import StartArea from "./StartArea";
import "./StartScreen.scss";

class StartScreen extends GameScreen {


    loadResources() {
        return new Promise(resolve => {
            ResourceLoader.loadImages(require('./resources/splash.png')).then((imgs) => {
                const BG = Portal(GameObject);
                let bg = new BG();
                bg.initPortal(new StartArea(this._gameInstance));
                bg.image = imgs[0];
                bg.element.innerHTML = this.screenTemplate;
                this.sceneGraph.appendChild(bg);
                resolve();
            });
        });
    }

    screenTemplate = `
        <div id="title_screen">
            <div class="title">STVNE Test Game</div>
            <div class="instruction">Click to continue</div>
        </div>
    `;


}

export default StartScreen;