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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Vector2d; });
var GameObject = /** @class */ (function () {
    function GameObject() {
        this.children = [];
    }
    GameObject.prototype.update = function () {
        this.children.forEach(function (c) { return c.update(); });
    };
    ;
    GameObject.prototype.render = function (gameWindow) {
        this.children.forEach(function (c) { return c.render(gameWindow); });
    };
    ;
    GameObject.prototype.getChildren = function () {
        return this.children;
    };
    GameObject.prototype.appendChild = function (child) {
        child.setParent(this);
        this.children.push(child);
    };
    GameObject.prototype.setParent = function (parent) {
        this.parent = parent;
        return this;
    };
    return GameObject;
}());
var Vector2d = /** @class */ (function () {
    function Vector2d(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector2d;
}());

/* harmony default export */ __webpack_exports__["b"] = (GameObject);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameWindow__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Game__ = __webpack_require__(3);


var container = document.getElementById('stvne');
var gameWindow = new __WEBPACK_IMPORTED_MODULE_0__GameWindow__["a" /* default */](720, 1080, document);
gameWindow.appendToElement(container);
var game = new __WEBPACK_IMPORTED_MODULE_1__Game__["a" /* default */](gameWindow);
game.start();


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var GameWindow = /** @class */ (function () {
    function GameWindow(height, width, doc) {
        if (doc === void 0) { doc = document; }
        this.canvas = doc.createElement('canvas');
        this.canvas.height = height;
        this.canvas.width = width;
    }
    GameWindow.prototype.appendToElement = function (parent) {
        parent.appendChild(this.canvas);
    };
    GameWindow.prototype.drawText = function (text, location, font) {
        if (font === void 0) { font = '30px Arial'; }
        var ctx = this.canvas.getContext("2d");
        ctx.font = font;
        ctx.fillText(text, location.x, location.y);
    };
    return GameWindow;
}());
/* harmony default export */ __webpack_exports__["a"] = (GameWindow);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TextObject__ = __webpack_require__(4);


var Game = /** @class */ (function () {
    function Game(gameWindow) {
        this.running = false;
        this.gameWindow = gameWindow;
    }
    Game.prototype.start = function () {
        this.running = true;
        var empty = new __WEBPACK_IMPORTED_MODULE_0__GameObject__["b" /* default */]();
        empty.location = new __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* Vector2d */](0, 0);
        this.sceneGraph = empty;
        var level1 = new __WEBPACK_IMPORTED_MODULE_1__TextObject__["a" /* default */]("level 1 at 0, 0");
        var level2 = new __WEBPACK_IMPORTED_MODULE_1__TextObject__["a" /* default */]("level 2 at 30, 30", new __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* Vector2d */](30, 30));
        var level3 = new __WEBPACK_IMPORTED_MODULE_1__TextObject__["a" /* default */]("level 3 at 60, 60", new __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* Vector2d */](60, 60));
        var level22 = new __WEBPACK_IMPORTED_MODULE_1__TextObject__["a" /* default */]("level 2 at 200, 200", new __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* Vector2d */](200, 200));
        level1.appendChild(level2);
        level1.appendChild(level22);
        level2.appendChild(level3);
        this.sceneGraph.appendChild(level1);
        this.sceneGraph.render(this.gameWindow);
    };
    Game.prototype.stop = function () {
    };
    Game.prototype.pause = function () {
    };
    Game.prototype.loop = function () {
    };
    return Game;
}());
/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TextObject = /** @class */ (function (_super) {
    __extends(TextObject, _super);
    function TextObject(text, location) {
        if (location === void 0) { location = new __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* Vector2d */](0, 0); }
        var _this = _super.call(this) || this;
        _this.text = text;
        _this.location = location;
        return _this;
    }
    TextObject.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    TextObject.prototype.render = function (gameWindow) {
        _super.prototype.render.call(this, gameWindow);
        gameWindow.drawText(this.text, this.location);
    };
    return TextObject;
}(__WEBPACK_IMPORTED_MODULE_0__GameObject__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (TextObject);


/***/ })
/******/ ]);