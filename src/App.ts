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

game.start();





