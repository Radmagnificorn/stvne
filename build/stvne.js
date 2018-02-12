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
class Component {
    onAdd() { }
    update() { }
    render(gameWindow) { }
    //called by parent when component is added
    register(parent) {
        this.gameObject = parent;
        this.onAdd();
        return this;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Component;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(0);

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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameWindow__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Game__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResourceLoader__ = __webpack_require__(15);



let container = document.getElementById('stvne');
let gameWindow = new __WEBPACK_IMPORTED_MODULE_0__GameWindow__["a" /* default */](720, 1280, document);
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
    addHtmlElement(html) {
        this.rootElement.appendChild(html);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (GameWindow);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_TextComponent__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_ImageComponent__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_AniTestComponent__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_AnimatedTextboxComponent__ = __webpack_require__(8);





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
        let textboxText = "This is some text. I want this text to display inside of the dialog box. It should break correctly on the words. Pneumonoultramicroscopicsilicovolcanoconiosos";
        let text2 = "And this is some more text that I want to show after the first round of text. Hopefully this works out as planned.";
        let dialog = new __WEBPACK_IMPORTED_MODULE_4__components_AnimatedTextboxComponent__["a" /* default */](250, 1280, "rgba(200,200,200,0.8)");
        let level1 = new __WEBPACK_IMPORTED_MODULE_0__GameObject__["b" /* default */](new __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* Vector2d */](0, 450));
        level1.addComponent(dialog);
        dialog.getHtmlElement().addEventListener('click', (ev => {
            dialog.writeText(text2);
        }));
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
            dialog.writeText(textboxText);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(0);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TextComponent__ = __webpack_require__(1);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HtmlDivComponent__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AnimatedTextboxStyle_scss__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AnimatedTextboxStyle_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__AnimatedTextboxStyle_scss__);


class AnimatedDialogBoxComponent extends __WEBPACK_IMPORTED_MODULE_0__HtmlDivComponent__["a" /* default */] {
    constructor(height, width, color = "#000000", doc = document) {
        super(height, width, color, doc);
    }
    createStyleableText(text) {
        return text.split(' ').map(word => this.createStyleableWord(word));
    }
    createStyleableWord(word) {
        let styleableWord = document.createElement('div');
        styleableWord.className = 'word';
        [...word].forEach(char => {
            let styleableLetter = document.createElement('span');
            styleableLetter.innerText = char;
            styleableLetter.style.visibility = 'hidden';
            styleableWord.appendChild(styleableLetter);
        });
        return styleableWord;
    }
    createElement() {
        super.createElement();
        this.element.className = 'animated_dialog_box';
    }
    update() {
        let letterIterator = this.letters.next();
        if (!letterIterator.done) {
            letterIterator.value.style.visibility = 'visible';
        }
    }
    *showLetters() {
        let words = this.element.children;
        for (let w = 0; w < words.length; w++) {
            for (let l = 0; l < words[w].children.length; l++) {
                yield words[w].children[l];
            }
        }
    }
    writeText(text) {
        if (!this.element) {
            this.createElement();
        }
        this.element.innerHTML = '';
        this.createStyleableText(text).forEach(word => this.element.appendChild(word));
        this.letters = this.showLetters();
    }
}
/* harmony default export */ __webpack_exports__["a"] = (AnimatedDialogBoxComponent);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(0);

class HtmlDivComponent extends __WEBPACK_IMPORTED_MODULE_0__Component__["a" /* Component */] {
    constructor(height, width, color, doc = document) {
        super();
        this.isAdded = false;
        this.height = height;
        this.width = width;
        this.color = color;
        this.doc = doc;
    }
    onAdd() {
        this.createElement();
    }
    createElement() {
        let root = this.doc.createElement('div');
        root.style.position = 'absolute';
        root.style.left = this.px(this.gameObject.location.x);
        root.style.top = this.px(this.gameObject.location.y);
        root.style.width = this.px(this.width);
        root.style.height = this.px(this.height);
        root.style.background = this.color;
        this.element = root;
    }
    px(num) {
        return num.toString() + 'px';
    }
    render(gameWindow) {
        if (!this.isAdded) {
            gameWindow.addHtmlElement(this.element);
            this.isAdded = true;
        }
    }
    getHtmlElement() {
        return this.element;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (HtmlDivComponent);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(11);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(13)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./AnimatedTextboxStyle.scss", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./AnimatedTextboxStyle.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, ".animated_dialog_box {\n  padding: 20px;\n  border-radius: 10px 10px 0 0; }\n  .animated_dialog_box .word {\n    font-family: Arial;\n    font-size: 35px;\n    margin: 3px;\n    display: inline-block; }\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(14);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 15 */
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