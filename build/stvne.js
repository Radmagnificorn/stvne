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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameObject {
    constructor(location = new Vector2d(0, 0)) {
        this.children = [];
        this.components = [];
        this._location = location;
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
    get location() {
        return this._location;
    }
    set location(location) {
        this._location = location;
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
/* 1 */
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
/* 2 */
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

var	fixUrls = __webpack_require__(9);

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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(14);

class HtmlDivComponent extends __WEBPACK_IMPORTED_MODULE_0__Component__["a" /* Component */] {
    constructor(id, doc = document) {
        super();
        this.isAdded = false;
        this.doc = doc;
        this.createElement(id);
    }
    onAdd() {
        this.element.style.left = this.px(this.gameObject.location.x);
        this.element.style.top = this.px(this.gameObject.location.y);
    }
    createElement(id) {
        let root = this.doc.createElement('div');
        root.id = id;
        root.className = 'game_object';
        root.style.position = 'absolute';
        this._element = root;
    }
    px(num) {
        return num.toString() + 'px';
    }
    render(gameWindow) {
        if (!this.isAdded) {
            gameWindow.addHtmlElement(this._element);
            this.isAdded = true;
        }
    }
    get element() {
        return this._element;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (HtmlDivComponent);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ResourceLoader {
    static loadImage(url) {
        let img = new Image();
        return new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = () => reject;
            img.src = url;
        });
    }
    static loadImages(...urls) {
        return Promise.all(urls.map(url => this.loadImage(url)));
    }
}
/* harmony default export */ __webpack_exports__["a"] = (ResourceLoader);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_GameWindow__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__testgame_Game__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_ResourceLoader__ = __webpack_require__(4);



let container = document.getElementById('stvne');
let gameWindow = new __WEBPACK_IMPORTED_MODULE_0__engine_GameWindow__["a" /* default */](720, 1280, document);
gameWindow.appendToElement(container);
let resourceLoader = new __WEBPACK_IMPORTED_MODULE_2__engine_ResourceLoader__["a" /* default */]();
let game = new __WEBPACK_IMPORTED_MODULE_1__testgame_Game__["a" /* default */](gameWindow, resourceLoader);
window.onresize = () => scaleScreen(gameWindow, document, screen);
scaleScreen(gameWindow, document, screen);
game.start();
function scaleScreen(gameWindow, document, screen) {
    let scale = Math.min(window.innerWidth / gameWindow.width, window.innerHeight / gameWindow.height);
    gameWindow.rootElement.style.transform = "scale(" + scale + ")";
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameWindow_scss__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameWindow_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__GameWindow_scss__);

class GameWindow {
    constructor(height, width, doc = document) {
        this._canvas = doc.createElement('canvas');
        this._ctx = this._canvas.getContext("2d");
        this._canvas.height = height;
        this._canvas.width = width;
        this._rootElement = doc.createElement('div');
        this._rootElement.id = 'game_window';
        this._rootElement.style.width = width.toString() + 'px';
        this._rootElement.style.height = height.toString() + 'px';
        this._rootElement.appendChild(this._canvas);
        this._height = height;
        this._width = width;
    }
    get height() {
        return this._height;
    }
    get width() {
        return this._width;
    }
    get rootElement() {
        return this._rootElement;
    }
    appendToElement(parent) {
        parent.appendChild(this._rootElement);
    }
    drawText(text, location, font = '30px Arial') {
        let ctx = this._canvas.getContext("2d");
        ctx.font = font;
        ctx.fillText(text, location.x, location.y);
    }
    getGraphicsContext() {
        return this._ctx;
    }
    get ctx() {
        return this._ctx;
    }
    clear() {
        this._ctx.fillStyle = 'white';
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }
    addHtmlElement(html) {
        this._rootElement.appendChild(html);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (GameWindow);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(8);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./GameWindow.scss", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./GameWindow.scss");

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "body {\n  margin: 0;\n  padding: 0;\n  background: #000000; }\n  body #stvne #game_window {\n    position: relative;\n    top: 0;\n    left: 0;\n    margin: 0;\n    transform-origin: top left; }\n    body #stvne #game_window canvas {\n      position: absolute;\n      top: 0;\n      left: 0; }\n", ""]);

// exports


/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__StartArea__ = __webpack_require__(11);

class Game {
    constructor(gameWindow, resourceLoader) {
        this.running = false;
        this.fps = 24;
        this.gameWindow = gameWindow;
        this.resourceLoader = resourceLoader;
    }
    start() {
        this.running = true;
        let startArea = new __WEBPACK_IMPORTED_MODULE_0__StartArea__["a" /* default */]();
        this.currentArea = startArea;
        startArea.loadResources().then(() => {
            setInterval(this.loop.bind(this), 1000 / this.fps);
        });
    }
    stop() {
    }
    pause() {
    }
    loop() {
        this.currentArea.update();
        this.gameWindow.clear();
        this.currentArea.render(this.gameWindow);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_Area__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_components_AnimatedTextboxComponent__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_GameObject__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_ResourceLoader__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__engine_components_HtmlImageComponent__ = __webpack_require__(17);






class StartArea extends __WEBPACK_IMPORTED_MODULE_0__engine_Area__["a" /* default */] {
    constructor() {
        super();
    }
    buildScene(imgs) {
        let textboxText = "This is some text. I want this text to display inside of the dialog box. It should break correctly on the words. Pneumonoultramicroscopicsilicovolcanoconiosos";
        let text2 = "And this is some more text that I want to show after the first round of text. Hopefully this works out as planned.";
        let dialogBox = new __WEBPACK_IMPORTED_MODULE_2__engine_GameObject__["b" /* default */](new __WEBPACK_IMPORTED_MODULE_2__engine_GameObject__["a" /* Vector2d */](0, 450));
        let dialog = new __WEBPACK_IMPORTED_MODULE_1__engine_components_AnimatedTextboxComponent__["a" /* default */]();
        dialogBox.addComponent(dialog);
        //dialog.writeText(textboxText);
        dialog.element.addEventListener('click', (ev => {
            dialog.writeText(text2);
        }));
        let background = new __WEBPACK_IMPORTED_MODULE_2__engine_GameObject__["b" /* default */](new __WEBPACK_IMPORTED_MODULE_2__engine_GameObject__["a" /* Vector2d */](0, 0));
        background.addComponent(new __WEBPACK_IMPORTED_MODULE_4__engine_components_HtmlImageComponent__["a" /* default */]('office', imgs[1]));
        //vampire
        let vampire = new __WEBPACK_IMPORTED_MODULE_2__engine_GameObject__["b" /* default */](new __WEBPACK_IMPORTED_MODULE_2__engine_GameObject__["a" /* Vector2d */](286, 60));
        let vampImageComponent = new __WEBPACK_IMPORTED_MODULE_4__engine_components_HtmlImageComponent__["a" /* default */]('vampire', imgs[0]);
        vampire.addComponent(vampImageComponent);
        vampImageComponent.element.addEventListener('click', (e) => {
            dialog.writeText("Hello, I am a vampire. Welcome to my study. As you can see, I have many books");
        });
        background.appendChild(vampire);
        this.sceneGraph.appendChild(background);
        this.sceneGraph.appendChild(dialogBox);
    }
    loadResources() {
        return new Promise(resolve => {
            __WEBPACK_IMPORTED_MODULE_3__engine_ResourceLoader__["a" /* default */].loadImages("test.png", "office.png").then(imgs => {
                this.buildScene(imgs);
                resolve();
            });
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (StartArea);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(0);

class Area {
    constructor(rootObject = new __WEBPACK_IMPORTED_MODULE_0__GameObject__["b" /* default */]()) {
        this.sceneGraph = rootObject;
    }
    update() {
        this._sceneGraph.update();
    }
    render(gameWindow) {
        this._sceneGraph.render(gameWindow);
    }
    get sceneGraph() {
        return this._sceneGraph;
    }
    set sceneGraph(rootObject) {
        this._sceneGraph = rootObject;
    }
    loadResources() {
        return Promise.resolve();
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Area);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HtmlDivComponent__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AnimatedTextboxStyle_scss__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AnimatedTextboxStyle_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__AnimatedTextboxStyle_scss__);


class AnimatedDialogBoxComponent extends __WEBPACK_IMPORTED_MODULE_0__HtmlDivComponent__["a" /* default */] {
    constructor(id = '', doc = document) {
        super(id, doc);
        this.isVisible = false;
        this._element.classList.add('animated_dialog_box');
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
    update() {
        if (this.isVisible) {
            let letterIterator = this.letters.next();
            if (!letterIterator.done) {
                letterIterator.value.style.visibility = 'visible';
            }
        }
    }
    *showLetters() {
        let words = this._element.children;
        for (let w = 0; w < words.length; w++) {
            for (let l = 0; l < words[w].children.length; l++) {
                yield words[w].children[l];
            }
        }
    }
    showDialog() {
        this.isVisible = true;
        this.element.classList.add('visible');
    }
    hideDialog() {
        this.isVisible = false;
        this.element.classList.remove('visible');
    }
    writeText(text) {
        this._element.innerHTML = '';
        this.createStyleableText(text).forEach(word => this._element.appendChild(word));
        this.letters = this.showLetters();
        this.showDialog();
    }
}
/* harmony default export */ __webpack_exports__["a"] = (AnimatedDialogBoxComponent);


/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(16);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./AnimatedTextboxStyle.scss", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./AnimatedTextboxStyle.scss");

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".animated_dialog_box {\n  padding: 20px;\n  border-radius: 20px 20px 0 0;\n  position: absolute;\n  top: 450px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.7);\n  border: 3px solid #ffffff;\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0s, opacity 0.5s; }\n  .animated_dialog_box.visible {\n    visibility: visible;\n    opacity: 1; }\n  .animated_dialog_box .word {\n    font-family: Arial;\n    font-size: 40px;\n    color: #ffffff;\n    margin: 0 5px 0 5px;\n    display: inline-block; }\n", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HtmlDivComponent__ = __webpack_require__(3);

class HtmlImageComponent extends __WEBPACK_IMPORTED_MODULE_0__HtmlDivComponent__["a" /* default */] {
    constructor(id, image, height = -1, width = -1) {
        super(id);
        this.element.style.backgroundImage = "url('" + image.src + "')";
        if (height < 0 || width < 0) {
            this.element.style.height = image.height + 'px';
            this.element.style.width = image.width + 'px';
        }
        else {
            this.element.style.height = height + 'px';
            this.element.style.width = width + 'px';
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (HtmlImageComponent);


/***/ })
/******/ ]);