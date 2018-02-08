import GameWindow from "./GameWindow";
import Game from "./Game";

let container = document.getElementById('stvne');

let gameWindow = new GameWindow(720, 1080, document);

gameWindow.appendToElement(container);

let game = new Game(gameWindow);

game.start();


