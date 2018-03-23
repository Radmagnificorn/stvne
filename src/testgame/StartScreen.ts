import GameScreen from "../engine/GameScreen";
import ResourceLoader from "../engine/ResourceLoader";
import GameObject, {ImageMode} from "../engine/GameObject";
import Portal from "../engine/components/PortalComponent";
import "./StartScreen.scss";

class StartScreen extends GameScreen {

    clickText: HTMLDivElement;
    aniTimer: number;

    async loadResources(): Promise<any> {
            let imgs = await ResourceLoader.loadImages(require('./resources/splash.png'));
            const {Zone1} = await import(/*webpackChunkName: "zone1"*/ './Zone1');
            const BG = Portal(GameObject);
            let bg = new BG();
            bg.initPortal(new Zone1.StartArea(this._gameInstance));
            bg.image = imgs[0];
            bg.imageMode = ImageMode.WRAP_IMAGE;
            bg.element.innerHTML = this.screenTemplate;
            this.sceneGraph.appendChild(bg);
            this.clickText = <HTMLDivElement>bg.element.getElementsByClassName("instruction")[0];
    };



    onReady() {
        this.aniTimer = setInterval(() => this.clickText.classList.toggle("faded"), 1000);
    }

    onUnload() {
        clearInterval(this.aniTimer);
    }

    screenTemplate = `
        <div id="title_screen">
            <div class="title">STVNE Test Game</div>
            <div class="instruction">Click to continue</div>
        </div>
    `;


}

export default StartScreen;