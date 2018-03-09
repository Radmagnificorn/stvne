import GameWindow from "./engine/GameWindow";
import Game from "./engine/Game";
import ResourceLoader from "./engine/ResourceLoader";
import GameState from "./engine/GameState";

let container = document.getElementById('stvne');

let gameWindow = new GameWindow(720, 1280, document);

container.appendChild(gameWindow.rootElement);

let resourceLoader = new ResourceLoader();

let game = new Game(gameWindow, resourceLoader, new GameState());

window.onresize = () => scaleScreen(gameWindow, document, screen);
scaleScreen(gameWindow, document, screen);



game.start();

function scaleScreen(gameWindow: GameWindow, document: Document, screen: Screen) {
    let scale = Math.min(
        window.innerWidth / gameWindow.width,
        window.innerHeight / gameWindow.height
    );

    let scaledCenter = gameWindow.width * scale * 0.5;
    let offset = window.innerWidth * 0.5 - scaledCenter;

    gameWindow.rootElement.style.transform = `scale(${scale})`;
    gameWindow.rootElement.style.left = `${offset}px`;
}






