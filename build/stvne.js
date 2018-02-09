/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(1);

class TextComponent extends __WEBPACK_IMPORTED_MODULE_0__Component__["a" /* Component */] {
    constructor(text) {
        super();
        this.text = text;
    }
    render(gameWindow) {
        super.render(gameWindow);
        let ctx = gameWindow.getGraphicsContext();
        ctx.fillStyle = 'black';
        ctx.fillText(this.text, this.gameObject.location.x, this.gameObject.location.y);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (TextComponent);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Component {
    update() { }
    render(gameWindow) { }
    //called by parent when component is added
    register(parent) {
        this.gameObject = parent;
        return this;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Component;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameWindow__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Game__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResourceLoader__ = __webpack_require__(8);



let container = document.getElementById('stvne');
let gameWindow = new __WEBPACK_IMPORTED_MODULE_0__GameWindow__["a" /* default */](720, 1080, document);
gameWindow.appendToElement(container);
let resourceLoader = new __WEBPACK_IMPORTED_MODULE_2__ResourceLoader__["a" /* default */]();
let game = new __WEBPACK_IMPORTED_MODULE_1__Game__["a" /* default */](gameWindow, resourceLoader);
game.start();


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameWindow {
    constructor(height, width, doc = document) {
        this.canvas = doc.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.canvas.height = height;
        this.canvas.width = width;
        this.canvas.style.top = '0px';
        this.canvas.style.left = '0px';
        this.canvas.style.position = 'absolute';
        this.rootElement = doc.createElement('div');
        this.rootElement.style.width = width.toString() + 'px';
        this.rootElement.style.height = height.toString() + 'px';
        this.rootElement.style.position = 'relative';
        this.rootElement.appendChild(this.canvas);
    }
    appendToElement(parent) {
        parent.appendChild(this.rootElement);
    }
    drawText(text, location, font = '30px Arial') {
        let ctx = this.canvas.getContext("2d");
        ctx.font = font;
        ctx.fillText(text, location.x, location.y);
    }
    getGraphicsContext() {
        return this.ctx;
    }
    clear() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (GameWindow);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_TextComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_ImageComponent__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_AniTestComponent__ = __webpack_require__(7);




class Game {
    constructor(gameWindow, resourceLoader) {
        this.running = false;
        this.fps = 24;
        this.gameWindow = gameWindow;
        this.resourceLoader = resourceLoader;
    }
    start() {
        this.running = true;
        let empty = new __WEBPACK_IMPORTED_MODULE_0__GameObject__["b" /* default */]();
        empty.location = new __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* Vector2d */](0, 0);
        this.sceneGraph = empty;
        let level1 = new __WEBPACK_IMPORTED_MODULE_0__GameObject__["b" /* default */]();
        level1.addComponent(new __WEBPACK_IMPORTED_MODULE_1__components_TextComponent__["a" /* default */]("level 1 at 0, 0"));
        let level2 = new __WEBPACK_IMPORTED_MODULE_0__GameObject__["b" /* default */](new __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* Vector2d */](30, 30));
        level2.addComponent(new __WEBPACK_IMPORTED_MODULE_1__components_TextComponent__["a" /* default */]("level 2 at 30, 30"));
        let level3 = new __WEBPACK_IMPORTED_MODULE_0__GameObject__["b" /* default */](new __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* Vector2d */](60, 60));
        let level22 = new __WEBPACK_IMPORTED_MODULE_0__GameObject__["b" /* default */](new __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* Vector2d */](200, 200));
        level22.addComponent(new __WEBPACK_IMPORTED_MODULE_3__components_AniTestComponent__["a" /* default */]());
        level1.appendChild(level2);
        level1.appendChild(level22);
        level2.appendChild(level3);
        this.sceneGraph.appendChild(level1);
        this.resourceLoader.loadImage("test.png").then(img => {
            level3.addComponent(new __WEBPACK_IMPORTED_MODULE_2__components_ImageComponent__["a" /* default */](img));
            setInterval(this.loop.bind(this), 1000 / this.fps);
        }).catch(() => alert("image not loaded"));
    }
    stop() {
    }
    pause() {
    }
    loop() {
        this.sceneGraph.update();
        this.gameWindow.clear();
        this.sceneGraph.render(this.gameWindow);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameObject {
    constructor(location = new Vector2d(0, 0)) {
        this.children = [];
        this.components = [];
        this.location = location;
    }
    update() {
        this.components.forEach(c => c.update());
        this.children.forEach(c => c.update());
    }
    render(gameWindow) {
        this.components.forEach(component => component.render(gameWindow));
        this.children.forEach(child => child.render(gameWindow));
    }
    getChildren() {
        return this.children;
    }
    appendChild(child) {
        child.setParent(this);
        this.children.push(child);
    }
    setParent(parent) {
        this.parent = parent;
        return this;
    }
    addComponent(component) {
        this.components.push(component.register(this));
    }
}
class Vector2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Vector2d;

/* harmony default export */ __webpack_exports__["b"] = (GameObject);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(1);

class ImageComponent extends __WEBPACK_IMPORTED_MODULE_0__Component__["a" /* Component */] {
    constructor(image) {
        super();
        this.image = image;
    }
    render(gameWindow) {
        let ctx = gameWindow.getGraphicsContext();
        ctx.drawImage(this.image, this.gameObject.location.x, this.gameObject.location.y);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (ImageComponent);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TextComponent__ = __webpack_require__(0);

class AniTestComponent extends __WEBPACK_IMPORTED_MODULE_0__TextComponent__["a" /* default */] {
    constructor() {
        super("0");
        this.count = 0;
    }
    update() {
        this.count++;
        this.text = this.count.toString();
    }
}
/* harmony default export */ __webpack_exports__["a"] = (AniTestComponent);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ResourceLoader {
    loadImage(url) {
        let img = new Image();
        return new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = () => reject;
            img.src = url;
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (ResourceLoader);


/***/ })
/******/ ]);