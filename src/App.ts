import GameWindow from "./GameWindow";
import Game from "./Game";
import ResourceLoader from "./ResourceLoader";

let container = document.getElementById('stvne');

let gameWindow = new GameWindow(720, 1080, document);

gameWindow.appendToElement(container);

let resourceLoader = new ResourceLoader();

let game = new Game(gameWindow, resourceLoader);

game.start();


