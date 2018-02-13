import GameWindow from "./GameWindow";
import Game from "./Game";
import ResourceLoader from "./ResourceLoader";
import screenConfig from "./screenconfig";

let container = document.getElementById('stvne');

let gameWindow = new GameWindow(720, 1280, document);
screenConfig(gameWindow.rootElement, document, screen);

gameWindow.appendToElement(container);

let resourceLoader = new ResourceLoader();

let game = new Game(gameWindow, resourceLoader);

window.onresize = () => scaleScreen(gameWindow, document, screen);
scaleScreen(gameWindow, document, screen);



game.start();

function scaleScreen(gameWindow: GameWindow, document: Document, screen: Screen) {
    let scale = Math.min(
        window.innerWidth / gameWindow.width,
        window.innerHeight / gameWindow.height
    );

    gameWindow.rootElement.style.transform = "scale(" + scale + ")";
}






