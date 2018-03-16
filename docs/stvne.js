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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameObject {
    constructor(x = 0, y = 0, height = 10, width = 10, img) {
        this.children = [];
        this._imageMode = ImageMode.WRAP_IMAGE;
        this._element = document.createElement('div');
        this._element.style.position = 'absolute';
        this._components = new Map();
        this.location = new Vector2d(x, y);
        this.height = height;
        this.width = width;
        if (img) {
            this.image = img;
        }
    }
    getChildren() {
        return this.children;
    }
    set imageMode(mode) {
        this._imageMode = mode;
    }
    set image(img) {
        this.element.style.backgroundImage = `url('${img.src}')`;
        if (this._imageMode === ImageMode.WRAP_IMAGE) {
            this.height = img.height;
            this.width = img.width;
        }
    }
    appendChild(child) {
        child.setParent(this);
        this.children.push(child);
        this.element.appendChild(child.element);
    }
    setParent(parent) {
        this.parent = parent;
        return this;
    }
    addComponent(component) {
        this._components.set(component.name, component.register(this));
    }
    get components() {
        return this._components;
    }
    get location() {
        return new Vector2d(parseInt(this._element.style.left, 10), parseInt(this._element.style.top, 10));
    }
    set location(location) {
        this._element.style.top = location.y + 'px';
        this._element.style.left = location.x + 'px';
    }
    get height() {
        return parseInt(this._element.style.height, 10);
    }
    set height(height) {
        this._element.style.height = height + 'px';
    }
    get width() {
        return parseInt(this._element.style.width, 10);
    }
    set width(width) {
        this._element.style.width = width + 'px';
    }
    get element() {
        return this._element;
    }
}
var ImageMode;
(function (ImageMode) {
    ImageMode[ImageMode["WRAP_IMAGE"] = 0] = "WRAP_IMAGE";
    ImageMode[ImageMode["CLIP"] = 1] = "CLIP";
    ImageMode[ImageMode["STRETCH_IMAGE"] = 2] = "STRETCH_IMAGE";
})(ImageMode || (ImageMode = {}));
class Vector2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
/* unused harmony export Vector2d */

/* harmony default export */ __webpack_exports__["a"] = (GameObject);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ResourceLoader {
    static loadImage(url) {
        let img = new Image();
        return new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = () => reject;
            img.src = url;
        });
    }
    static loadNamedImage(name, url) {
        return __awaiter(this, void 0, void 0, function* () {
            let img = yield this.loadImage(url);
            return [name, img];
        });
    }
    static loadImages(...urls) {
        return Promise.all(urls.map(url => this.loadImage(url)));
    }
    static loadImagesToMap(urls) {
        return __awaiter(this, void 0, void 0, function* () {
            let imageMap = new Map();
            let promises = [];
            urls.forEach(((url, name) => {
                promises.push(this.loadNamedImage(name, url));
            }));
            let images = yield Promise.all(promises);
            images.forEach(i => imageMap.set(i[0], i[1]));
            return imageMap;
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (ResourceLoader);


/***/ }),
/* 2 */
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
/* 3 */
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

var	fixUrls = __webpack_require__(19);

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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(0);

function Portal(Base) {
    return class extends Base {
        initPortal(target) {
            this._target = target;
            this.element.addEventListener('click', (ev => { this._target.load(); }));
            this.element.classList.add('portal');
            return this;
        }
        showPortal() {
            this.element.classList.add("visible");
        }
        hidePortal() {
            this.element.classList.remove("visible");
        }
        isVisible() {
            return this.element.classList.contains("visible");
        }
    };
}
class Exit extends Portal(__WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* default */]) {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Exit;

/* harmony default export */ __webpack_exports__["b"] = (Portal);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ActionEvents {
    static pause(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        });
    }
    static doNothing() {
        return Promise.resolve();
    }
    static waitForClick(obj) {
        // wait for a click, then have the listener remove itself
        let element = obj.element || obj;
        return new Promise(resolve => {
            let listener = (e) => {
                resolve();
                element.removeEventListener('click', listener);
            };
            element.addEventListener('click', listener);
        });
    }
    ;
}
/* harmony default export */ __webpack_exports__["a"] = (ActionEvents);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameScreen__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GameObject__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animation_AniEvents__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AreaStyle_scss__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AreaStyle_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__AreaStyle_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AreaDialog__ = __webpack_require__(24);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





class Area extends __WEBPACK_IMPORTED_MODULE_0__GameScreen__["a" /* default */] {
    constructor(game, rootObject = new __WEBPACK_IMPORTED_MODULE_1__GameObject__["a" /* default */]()) {
        super(game, rootObject);
        this._exits = [];
        this.sceneGraph.element.classList.add("area");
        this._backgroundLayer = new __WEBPACK_IMPORTED_MODULE_1__GameObject__["a" /* default */]();
        this._gameLayer = new __WEBPACK_IMPORTED_MODULE_1__GameObject__["a" /* default */]();
        this._uiLayer = new __WEBPACK_IMPORTED_MODULE_1__GameObject__["a" /* default */]();
        // TODO: make this dynamic for different resolutions
        this._dialog = new __WEBPACK_IMPORTED_MODULE_4__AreaDialog__["a" /* default */](0, 450);
        this._dialog.initDialogContainter();
        this._transitionLayer = new __WEBPACK_IMPORTED_MODULE_1__GameObject__["a" /* default */](0, 0, 720, 1280);
        this._transitionLayer.element.style.backgroundColor = '#000000';
        this.sceneGraph.appendChild(this._backgroundLayer);
        this.sceneGraph.appendChild(this._gameLayer);
        this.sceneGraph.appendChild(this._dialog);
        this.sceneGraph.appendChild(this._uiLayer);
        this.sceneGraph.appendChild(this._transitionLayer);
        this.createUi();
    }
    createUi() {
        let toggleExitsButton = new __WEBPACK_IMPORTED_MODULE_1__GameObject__["a" /* default */](1220, 20, 30, 30);
        toggleExitsButton.element.classList.add('toggle_exits_button');
        this._uiLayer.appendChild(toggleExitsButton);
        toggleExitsButton.element.addEventListener('click', () => this.toggleExits());
    }
    toggleExits() {
        if (this._exits[0].isVisible()) {
            this.hidePortals();
        }
        else {
            this.showPortals();
        }
    }
    setPortals(...exits) {
        this._exits = exits;
        exits.forEach(exit => this._uiLayer.appendChild(exit));
    }
    showPortals() {
        this._exits.forEach(exit => exit.showPortal());
    }
    hidePortals() {
        this._exits.forEach(exit => exit.hidePortal());
    }
    get dialogComponent() {
        return this._dialog;
    }
    get backgroundLayer() {
        return this._backgroundLayer;
    }
    get gameLayer() {
        return this._gameLayer;
    }
    get gameState() {
        return this._gameInstance.gameState;
    }
    transitionIn() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fadeIn();
        });
    }
    transitionOut() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fadeOut();
        });
    }
    fadeIn() {
        return __awaiter(this, void 0, void 0, function* () {
            yield __WEBPACK_IMPORTED_MODULE_2__animation_AniEvents__["a" /* default */].fadeOut(this._transitionLayer, 0.25);
            this._transitionLayer.element.style.display = 'none';
        });
    }
    fadeOut() {
        return __awaiter(this, void 0, void 0, function* () {
            this._transitionLayer.element.style.display = 'block';
            yield __WEBPACK_IMPORTED_MODULE_2__animation_AniEvents__["a" /* default */].fadeIn(this._transitionLayer, 0.25);
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Area);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(29);

class ImageComponent extends __WEBPACK_IMPORTED_MODULE_0__Component__["a" /* Component */] {
    constructor(image, fitImage = true) {
        super();
        this._image = image;
        this._fitImage = fitImage;
    }
    onAdd() {
        this.syncActiveImage();
        if (this._fitImage) {
            this.gameObject.height = this.image.height;
            this.gameObject.width = this.image.width;
        }
    }
    syncActiveImage() {
        this.gameObject.element.style.backgroundImage = "url('" + this._image.src + "')";
    }
    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
        this.syncActiveImage();
    }
    get name() {
        return "image";
    }
}
/* harmony default export */ __webpack_exports__["a"] = (ImageComponent);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DialogActor__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DynamicImage__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__GameObject__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AnimationActor__ = __webpack_require__(12);




class Character extends Object(__WEBPACK_IMPORTED_MODULE_3__AnimationActor__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_1__DynamicImage__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_0__DialogActor__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_2__GameObject__["a" /* default */]))) {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Character;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(0);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class GameScreen {
    constructor(game, rootObject = new __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* default */]()) {
        this._gameInstance = game;
        this.sceneGraph = rootObject;
        this.sceneGraph.element.classList.add('scene_graph');
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
    onReady() { }
    ;
    onUnload() { }
    ;
    load() {
        this._gameInstance.loadScene(this);
    }
    transitionIn() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
    transitionOut() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (GameScreen);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_Area__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_GameObject__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_ResourceLoader__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_components_ImageComponent__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__engine_components_PortalComponent__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__engine_components_Character__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Hallway__ = __webpack_require__(13);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








class StartArea extends __WEBPACK_IMPORTED_MODULE_0__engine_Area__["a" /* default */] {
    constructor() {
        super(...arguments);
        this.events = {
            main: () => __awaiter(this, void 0, void 0, function* () {
                let vampireDave = this.vampire;
                let d = this.dialogComponent;
                //await AE.pause(1000);
                let talkedToPrincess = yield this.gameState.get("second_area.princess_talk");
                yield d.fadeIn(1);
                if (!talkedToPrincess) {
                    yield this.events.vampireIntro();
                }
                else {
                    yield this.events.princessShowsUp();
                }
                yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(d);
                yield d.fadeOut();
                yield vampireDave.fadeOut(1);
            }),
            vampireIntro: () => __awaiter(this, void 0, void 0, function* () {
                let vampireDave = this.vampire;
                let d = this.dialogComponent;
                yield vampireDave.fadeIn(1);
                let princessTalk = yield this.gameState.get("second_area.princess_talk");
                if (princessTalk === "true") {
                    yield vampireDave.say("I see you talked to the princess");
                }
                else {
                    yield vampireDave.say("Hello, I am a vampire. Welcome to my study.", true);
                    yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(d);
                    yield vampireDave.showImage('handsup');
                    yield vampireDave.say("As you can see, I have many books", true);
                    yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].pause(100);
                    yield vampireDave.say(", and not just any books...", false);
                    yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].pause(250);
                    yield vampireDave.showImage('default');
                    yield vampireDave.say(" good books.", false);
                }
                yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(d);
                let likesToRead = yield vampireDave.ask("Do you like to read books?", ["Yes, books are awesome!", "No... not a fan.", "Books are for losers", "No, I'm too cool"]);
                switch (likesToRead) {
                    case "Yes, books are awesome!":
                        yield vampireDave.say("Yes, I thought you might");
                        yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(d);
                        yield vampireDave.say("What kind of books do you like to read?");
                        let fictionOrNo = yield d.presentOptions(["Fiction", "Non-fiction"]);
                        if (fictionOrNo === "Fiction") {
                            yield vampireDave.say("I am a fan of fiction myself");
                        }
                        else {
                            yield vampireDave.say("I see, well I generally prefer fiction myself");
                        }
                        break;
                    case "Books are for losers":
                        yield vampireDave.say("Yeah? well maybe books think that you're a loser...");
                        break;
                    default:
                        yield vampireDave.say("Oh, well that's ok...");
                }
                yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(d);
                yield vampireDave.say("You should head outside to the left and talk to the princess.");
                yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(d);
                yield vampireDave.showImage("handsup");
                yield vampireDave.say("If at any time you aren't sure where you're going. You can show and hide the exit locations with that little white button in the top right corner of the screen.");
            }),
            princessShowsUp: () => __awaiter(this, void 0, void 0, function* () {
                let princess = this.princess;
                let vampire = this.vampire;
                let dialog = this.dialogComponent;
                yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].pause(1000);
                yield vampire.fadeIn(1);
                yield vampire.say("Oh, hi. How was your meeting with the princess?");
                yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(dialog);
                yield princess.fadeIn(1);
                let cabbages = yield this.gameState.get("second_area.cabbages");
                yield princess.say("Hey Dave, some weirdo just told me I look like I could carry " +
                    (cabbages === "One" ? "only one cabbage" : `${cabbages.toLowerCase()} cabbages`) + "...");
                yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(dialog);
                yield princess.say("oh wait! that's them right there.");
                yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(dialog);
                yield vampire.showImage("handsup");
                yield vampire.say("well what do you want me to do about it?");
            })
        };
    }
    buildScene(imgs) {
        return __awaiter(this, void 0, void 0, function* () {
            let dialog = this.dialogComponent;
            let toHallway = new __WEBPACK_IMPORTED_MODULE_5__engine_components_PortalComponent__["a" /* Exit */](0, 0, 720, 100);
            toHallway.initPortal(new __WEBPACK_IMPORTED_MODULE_7__Hallway__["a" /* default */](this._gameInstance));
            let background = new __WEBPACK_IMPORTED_MODULE_1__engine_GameObject__["a" /* default */](0, 0);
            background.addComponent(new __WEBPACK_IMPORTED_MODULE_3__engine_components_ImageComponent__["a" /* default */](imgs.get('office'), true));
            //vampire
            let vampireDave = new __WEBPACK_IMPORTED_MODULE_6__engine_components_Character__["a" /* default */](286, 60);
            vampireDave.initDialogActor(dialog, "Vampire Dave")
                .initDynamicImage(new Map([
                ["default", imgs.get('vamp_default')], ['handsup', imgs.get('vamp_handsup')]
            ]));
            //princess
            let princess = new __WEBPACK_IMPORTED_MODULE_6__engine_components_Character__["a" /* default */](505, 190);
            princess.initDialogActor(dialog, "Demon-eyed Princess")
                .initDynamicImage(new Map([['default', imgs.get("princess_default")]]));
            princess.element.style.opacity = '0';
            vampireDave.element.style.opacity = '0';
            this.princess = princess;
            this.vampire = vampireDave;
            this.setPortals(toHallway);
            this.gameLayer.appendChild(vampireDave);
            this.gameLayer.appendChild(princess);
            this.backgroundLayer.appendChild(background);
        });
    }
    onReady() {
        this.events.main();
    }
    loadResources() {
        return new Promise(resolve => {
            __WEBPACK_IMPORTED_MODULE_2__engine_ResourceLoader__["a" /* default */].loadImagesToMap(new Map([
                ["office", __webpack_require__(36)],
                ["vamp_default", __webpack_require__(37)],
                ["vamp_handsup", __webpack_require__(38)],
                ["princess_default", __webpack_require__(14)]
            ])).then(imgs => this.buildScene(imgs)).then(() => resolve());
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (StartArea);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ActionEvents__ = __webpack_require__(5);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class AniEvents {
    static fadeOut(target, seconds) {
        return this.fadeTo(target, "0.0", seconds, 1);
    }
    static fadeIn(target, seconds) {
        return this.fadeTo(target, "1.0", seconds, 0);
    }
    static fadeTo(target, opacity, seconds, startValue = -1) {
        return __awaiter(this, void 0, void 0, function* () {
            let el = this.getElement(target);
            if (startValue !== -1) {
                el.style.transitionDuration = '0s';
                el.style.opacity = `${startValue}`;
            }
            el.style.transition = `opacity ${seconds}s`;
            el.style.transitionTimingFunction = 'linear';
            el.style.transitionDelay = '0';
            let eaPromise = this.attachEndAnimationListener(el);
            // unfortunately there is no event for when css is finished recalculating,
            // so we have to wait...
            yield __WEBPACK_IMPORTED_MODULE_0__ActionEvents__["a" /* default */].pause(100);
            el.style.opacity = opacity;
            return eaPromise;
        });
    }
    static getElement(target) {
        return target.element || target;
    }
    static attachEndAnimationListener(element) {
        return new Promise(resolve => {
            let aniEndListener = () => {
                console.log("removing listener");
                element.removeEventListener('transitionend', aniEndListener);
                resolve();
            };
            console.log("attaching end animation listener");
            element.addEventListener('transitionend', aniEndListener, false);
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (AniEvents);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animation_AniEvents__ = __webpack_require__(11);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function AnimationActor(Base) {
    return class extends Base {
        fadeIn(speed = 0.25) {
            return __awaiter(this, void 0, void 0, function* () {
                return __WEBPACK_IMPORTED_MODULE_0__animation_AniEvents__["a" /* default */].fadeIn(this, speed);
            });
        }
        fadeOut(speed = 0.25) {
            return __awaiter(this, void 0, void 0, function* () {
                return __WEBPACK_IMPORTED_MODULE_0__animation_AniEvents__["a" /* default */].fadeOut(this, speed);
            });
        }
    };
}
/* harmony default export */ __webpack_exports__["a"] = (AnimationActor);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_Area__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_GameObject__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_ResourceLoader__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_components_ImageComponent__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__engine_components_PortalComponent__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SecondArea__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__StartArea__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__engine_components_Character__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__engine_ActionEvents__ = __webpack_require__(5);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};









class Hallway extends __WEBPACK_IMPORTED_MODULE_0__engine_Area__["a" /* default */] {
    constructor() {
        super(...arguments);
        this.events = {
            butlerDialog: () => __awaiter(this, void 0, void 0, function* () {
                let dialog = this.dialogComponent;
                let butler = this._bulter;
                yield butler.fadeIn(1);
                yield butler.ask("Greetings. I am a butler. Is there anything I can get for you?", ["you can get out of my way...", "no thank you"]);
                yield butler.say("very good then");
                yield __WEBPACK_IMPORTED_MODULE_8__engine_ActionEvents__["a" /* default */].waitForClick(dialog);
                yield butler.fadeOut(1);
                yield dialog.fadeOut();
            })
        };
    }
    buildScene(imgs) {
        return __awaiter(this, void 0, void 0, function* () {
            let gs = this._gameInstance.gameState;
            let outsideExit = new __WEBPACK_IMPORTED_MODULE_4__engine_components_PortalComponent__["a" /* Exit */](725, 200, 300, 100);
            outsideExit.initPortal(new __WEBPACK_IMPORTED_MODULE_5__SecondArea__["a" /* default */](this._gameInstance));
            let officeExit = new __WEBPACK_IMPORTED_MODULE_4__engine_components_PortalComponent__["a" /* Exit */](0, 630, 100, 1280);
            officeExit.initPortal(new __WEBPACK_IMPORTED_MODULE_6__StartArea__["a" /* default */](this._gameInstance));
            this.setPortals(outsideExit, officeExit);
            let background = new __WEBPACK_IMPORTED_MODULE_1__engine_GameObject__["a" /* default */](0, 0);
            background.addComponent(new __WEBPACK_IMPORTED_MODULE_3__engine_components_ImageComponent__["a" /* default */](imgs.get('hallway'), true));
            let butler = new __WEBPACK_IMPORTED_MODULE_7__engine_components_Character__["a" /* default */](100, 100);
            butler.initDynamicImage(new Map([["default", imgs.get("butler")]]));
            butler.initDialogActor(this.dialogComponent, "Mysterious Butler");
            butler.element.style.opacity = "0";
            this._bulter = butler;
            this.gameLayer.appendChild(butler);
            this.backgroundLayer.appendChild(background);
        });
    }
    onReady() {
        this.events.butlerDialog();
    }
    loadResources() {
        return new Promise(resolve => {
            __WEBPACK_IMPORTED_MODULE_2__engine_ResourceLoader__["a" /* default */].loadImagesToMap(new Map([
                ["hallway", __webpack_require__(34)],
                ["butler", __webpack_require__(35)]
            ]))
                .then(imgs => {
                resolve();
                this.buildScene(imgs);
            });
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Hallway);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/acde612f2f7fd10ff9859531aad42466-princess.png";

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_GameWindow__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_Game__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_ResourceLoader__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_GameState__ = __webpack_require__(42);




let container = document.getElementById('stvne');
let gameWindow = new __WEBPACK_IMPORTED_MODULE_0__engine_GameWindow__["a" /* default */](720, 1280, document);
container.appendChild(gameWindow.rootElement);
let resourceLoader = new __WEBPACK_IMPORTED_MODULE_2__engine_ResourceLoader__["a" /* default */]();
let game = new __WEBPACK_IMPORTED_MODULE_1__engine_Game__["a" /* default */](gameWindow, resourceLoader, new __WEBPACK_IMPORTED_MODULE_3__engine_GameState__["a" /* default */]());
window.onresize = () => scaleScreen(gameWindow, document, screen);
scaleScreen(gameWindow, document, screen);
game.start();
function scaleScreen(gameWindow, document, screen) {
    let scale = Math.min(window.innerWidth / gameWindow.width, window.innerHeight / gameWindow.height);
    let scaledCenter = gameWindow.width * scale * 0.5;
    let offset = window.innerWidth * 0.5 - scaledCenter;
    gameWindow.rootElement.style.transform = `scale(${scale})`;
    gameWindow.rootElement.style.left = `${offset}px`;
}


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameWindow_scss__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameWindow_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__GameWindow_scss__);

class GameWindow {
    constructor(height, width, doc = document) {
        this._rootElement = doc.createElement('div');
        this._rootElement.id = 'game_window';
        this._rootElement.style.width = width.toString() + 'px';
        this._rootElement.style.height = height.toString() + 'px';
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
    setScene(scene) {
        this._rootElement.innerHTML = '';
        this._rootElement.appendChild(scene.sceneGraph.element);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (GameWindow);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(18);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(3)(content, options);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "body {\n  margin: 0;\n  padding: 0;\n  background: #000000; }\n  body #stvne #game_window {\n    position: relative;\n    top: 0;\n    left: 0;\n    margin: 0;\n    transform-origin: top left;\n    overflow: hidden; }\n    body #stvne #game_window canvas {\n      position: absolute;\n      top: 0;\n      left: 0; }\n", ""]);

// exports


/***/ }),
/* 19 */
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__testgame_StartScreen__ = __webpack_require__(21);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class Game {
    constructor(gameWindow, resourceLoader, gameState) {
        this.running = false;
        this.fps = 24;
        this.gameWindow = gameWindow;
        this.resourceLoader = resourceLoader;
        this._gameState = gameState;
        this._transitionElement = document.createElement('div');
        document.addEventListener('readystatechange', (e) => {
            console.log(e.type);
        });
    }
    loadScene(scene) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentScene) {
                yield this.currentScene.transitionOut();
                this.currentScene.onUnload();
            }
            yield scene.loadResources();
            this.gameWindow.setScene(scene);
            this.currentScene = scene;
            yield this.currentScene.transitionIn();
            scene.onReady();
        });
    }
    start() {
        this.running = true;
        let startScreen = new __WEBPACK_IMPORTED_MODULE_0__testgame_StartScreen__["a" /* default */](this);
        this.loadScene(startScreen);
    }
    get gameState() {
        return this._gameState;
    }
    stop() {
    }
    pause() {
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_GameScreen__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_ResourceLoader__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_GameObject__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_components_PortalComponent__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__StartArea__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__StartScreen_scss__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__StartScreen_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__StartScreen_scss__);






class StartScreen extends __WEBPACK_IMPORTED_MODULE_0__engine_GameScreen__["a" /* default */] {
    constructor() {
        super(...arguments);
        this.screenTemplate = `
        <div id="title_screen">
            <div class="title">STVNE Test Game</div>
            <div class="instruction">Click to continue</div>
        </div>
    `;
    }
    loadResources() {
        return new Promise(resolve => {
            __WEBPACK_IMPORTED_MODULE_1__engine_ResourceLoader__["a" /* default */].loadImages(__webpack_require__(41)).then((imgs) => {
                const BG = Object(__WEBPACK_IMPORTED_MODULE_3__engine_components_PortalComponent__["b" /* default */])(__WEBPACK_IMPORTED_MODULE_2__engine_GameObject__["a" /* default */]);
                let bg = new BG();
                bg.initPortal(new __WEBPACK_IMPORTED_MODULE_4__StartArea__["a" /* default */](this._gameInstance));
                bg.image = imgs[0];
                bg.element.innerHTML = this.screenTemplate;
                this.sceneGraph.appendChild(bg);
                this.clickText = bg.element.getElementsByClassName("instruction")[0];
                resolve();
            });
        });
    }
    onReady() {
        this.aniTimer = setInterval(() => this.clickText.classList.toggle("faded"), 1000);
    }
    onUnload() {
        clearInterval(this.aniTimer);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (StartScreen);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(23);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(3)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./AreaStyle.scss", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./AreaStyle.scss");

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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".area .portal {\n  background: rgba(200, 0, 0, 0.25);\n  opacity: 0;\n  transition: opacity 0.25s; }\n  .area .portal.visible {\n    opacity: 1; }\n\n.area .toggle_exits_button {\n  background-color: rgba(255, 255, 255, 0.5);\n  border: 3px solid rgba(255, 255, 255, 0.75);\n  border-radius: 15px; }\n", ""]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_DialogContainer__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_AnimationActor__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_DialogStyle_scss__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_DialogStyle_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_DialogStyle_scss__);




class AreaDialog extends Object(__WEBPACK_IMPORTED_MODULE_2__components_AnimationActor__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_1__components_DialogContainer__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* default */])) {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AreaDialog;



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animation_AnimationTimer__ = __webpack_require__(26);

function DialogContainer(Base) {
    return class extends Base {
        constructor() {
            super(...arguments);
            this.isVisible = false;
        }
        initDialogContainter() {
            let dialogEl = this.createDialogUI();
            this._titleBox = dialogEl.getElementsByClassName('title_box')[0];
            this._textArea = dialogEl.getElementsByClassName('text_area')[0];
            this.element.appendChild(dialogEl);
            this.element.style.opacity = '0';
            this._timer = new __WEBPACK_IMPORTED_MODULE_0__animation_AnimationTimer__["a" /* default */](this.update.bind(this), 30);
        }
        createDialogUI() {
            let element = document.createElement('div');
            element.classList.add('animated_dialog_box');
            let titleBox = document.createElement('div');
            titleBox.classList.add('title_box');
            let textArea = document.createElement('div');
            textArea.classList.add('text_area');
            element.appendChild(textArea);
            element.appendChild(titleBox);
            return element;
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
            //if (this.isVisible) {
            let letterIterator = this.letters.next();
            if (!letterIterator.done) {
                letterIterator.value.style.visibility = 'visible';
            }
            else {
                this.sendFinishedNotification();
                this._timer.stop();
            }
            //}
        }
        *showLetters() {
            let words = this._textArea.children;
            for (let w = 0; w < words.length; w++) {
                for (let l = 0; l < words[w].children.length; l++) {
                    yield words[w].children[l];
                }
            }
        }
        writeText(text, clearBox = true, title) {
            if (clearBox) {
                this._textArea.innerHTML = '';
            }
            if (title) {
                this._titleBox.classList.add('visible');
                this._titleBox.innerText = title;
            }
            else {
                this._titleBox.classList.remove('visible');
            }
            this.createStyleableText(text).forEach(word => this._textArea.appendChild(word));
            this.letters = this.showLetters();
            this._timer.start();
            return new Promise(resolve => { this.sendFinishedNotification = resolve; });
        }
        presentOptions(options, clearBox = false, title) {
            return new Promise(resolve => {
                let optionContainer = document.createElement('div');
                options.forEach(option => {
                    let button = document.createElement('div');
                    button.innerText = option;
                    button.classList.add('dialog_option');
                    optionContainer.appendChild(button);
                    button.addEventListener('click', ev => {
                        resolve(option);
                    });
                });
                this._textArea.appendChild(optionContainer);
                this.writeText('', false, title);
            });
        }
    };
}
/* harmony default export */ __webpack_exports__["a"] = (DialogContainer);


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AnimationTimer {
    constructor(action, fps) {
        this._action = action;
        this._fps = fps;
    }
    start() {
        this._timerId = setInterval(this._action, 1000 / this._fps);
    }
    stop() {
        clearInterval(this._timerId);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (AnimationTimer);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(28);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(3)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./DialogStyle.scss", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./DialogStyle.scss");

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".animated_dialog_box {\n  padding: 20px;\n  border-radius: 20px 20px 0 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 225px;\n  width: 1235px;\n  background: rgba(0, 0, 0, 0.7);\n  border: 3px solid #ffffff;\n  font-family: Arial, serif;\n  transition: visibility 0s, opacity 0.5s; }\n  .animated_dialog_box .word {\n    font-size: 40px;\n    color: #ffffff;\n    margin: 0 5px 0 5px;\n    display: inline-block; }\n  .animated_dialog_box .dialog_option {\n    width: 550px;\n    border: 2px solid #ffffff;\n    font-size: 30px;\n    text-align: center;\n    font-weight: bold;\n    color: #ffffff;\n    margin: 10px;\n    padding: 20px;\n    display: inline-block; }\n  .animated_dialog_box .title_box {\n    visibility: hidden;\n    position: absolute;\n    color: #ffffff;\n    top: -25px;\n    font-size: 23px;\n    font-weight: bold;\n    background: #000000;\n    border: #ffffff 2px solid;\n    padding: 5px 10px;\n    border-radius: 10px; }\n    .animated_dialog_box .title_box.visible {\n      visibility: visible; }\n", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Component {
    onAdd() {
    }
    //called by parent when component is added
    register(parent) {
        this.gameObject = parent;
        this.onAdd();
        return this;
    }
    get element() {
        return this.gameObject.element;
    }
    get name() {
        return 'Component';
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Component;



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function DialogActor(Base) {
    return class extends Base {
        initDialogActor(dialog, title = "") {
            this._dialog = dialog;
            this._title = title;
            return this;
        }
        say(text, clearFirst = true) {
            if (this._dialog) {
                return this._dialog.writeText(text, clearFirst, this._title);
            }
            else
                return Promise.resolve();
        }
        ask(question, options) {
            return this.say(question, true).then(() => {
                return this._dialog.presentOptions(options, false, this._title);
            });
        }
    };
}
/* harmony default export */ __webpack_exports__["a"] = (DialogActor);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function DynamicImage(Base) {
    return class extends Base {
        initDynamicImage(images) {
            this._images = images;
            this.image = this._images.get("default");
            return this;
        }
        showImage(imageName) {
            this.image = this._images.get(imageName);
        }
    };
}
/* harmony default export */ __webpack_exports__["a"] = (DynamicImage);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_ResourceLoader__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_GameObject__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_components_ImageComponent__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_ActionEvents__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__engine_components_PortalComponent__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__engine_Area__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__engine_components_Character__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Hallway__ = __webpack_require__(13);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








class SecondArea extends __WEBPACK_IMPORTED_MODULE_5__engine_Area__["a" /* default */] {
    buildScene(imgs) {
        return __awaiter(this, void 0, void 0, function* () {
            let gs = this._gameInstance.gameState;
            let toHallway = new __WEBPACK_IMPORTED_MODULE_4__engine_components_PortalComponent__["a" /* Exit */](0, 0, 720, 50);
            toHallway.initPortal(new __WEBPACK_IMPORTED_MODULE_7__Hallway__["a" /* default */](this._gameInstance));
            this.setPortals(toHallway);
            let background = new __WEBPACK_IMPORTED_MODULE_1__engine_GameObject__["a" /* default */]();
            background.addComponent(new __WEBPACK_IMPORTED_MODULE_2__engine_components_ImageComponent__["a" /* default */](imgs[0]));
            let dialog = this.dialogComponent;
            let princess = new __WEBPACK_IMPORTED_MODULE_6__engine_components_Character__["a" /* default */](505, 190);
            princess.initDialogActor(dialog, "Demon-eyed Princess")
                .initDynamicImage(new Map([['default', imgs[1]]]));
            princess.element.style.opacity = '0';
            this.gameLayer.appendChild(princess);
            this.gameLayer.appendChild(toHallway);
            this.backgroundLayer.appendChild(background);
            yield __WEBPACK_IMPORTED_MODULE_3__engine_ActionEvents__["a" /* default */].pause(1000);
            yield princess.fadeIn(1);
            yield princess.say("Hello, I am a princess of some sort... ");
            yield __WEBPACK_IMPORTED_MODULE_3__engine_ActionEvents__["a" /* default */].pause(250);
            yield princess.say("welcome to my bridge", false);
            yield __WEBPACK_IMPORTED_MODULE_3__engine_ActionEvents__["a" /* default */].waitForClick(dialog);
            yield princess.say("If you want to pass, you must answer a riddle.");
            yield __WEBPACK_IMPORTED_MODULE_3__engine_ActionEvents__["a" /* default */].waitForClick(dialog);
            let response = yield princess.ask("How many cabbages do you think I could carry at one time?", ["One", "Five", "Twelve", "Fourteen"]);
            switch (response) {
                case 'One':
                    yield dialog.writeText("Really? One? okay ya dick, whatever");
                    break;
                case 'Five':
                    yield dialog.writeText("Yeah, I think that's probably about right");
                    break;
                default:
                    yield dialog.writeText("Uh, thanks? You're an idiot though. That is not even remotely realistic");
            }
            yield gs.set("second_area.cabbages", response);
            yield __WEBPACK_IMPORTED_MODULE_3__engine_ActionEvents__["a" /* default */].waitForClick(dialog);
            yield dialog.writeText("Oh well... It doesn't even really matter if you got it right or wrong. I was never going to let you pass.");
            yield __WEBPACK_IMPORTED_MODULE_3__engine_ActionEvents__["a" /* default */].waitForClick(dialog);
            yield dialog.writeText("bye... ");
            yield this.gameState.set("second_area.princess_talk", "true");
            yield __WEBPACK_IMPORTED_MODULE_3__engine_ActionEvents__["a" /* default */].pause(500);
            yield dialog.fadeOut();
        });
    }
    loadResources() {
        return new Promise(resolve => {
            __WEBPACK_IMPORTED_MODULE_0__engine_ResourceLoader__["a" /* default */].loadImages(__webpack_require__(33), __webpack_require__(14)).then(imgs => {
                this.buildScene(imgs);
                resolve();
            });
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (SecondArea);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/f3356608c658d0488ca34d767a7d046e-palace.png";

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/5b560ef711876fc3b69b49007b06536a-hallway.png";

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/6f7442ceec67e6e1f0e129abc865a913-butler.png";

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/dbea1641a453b89c7d93ed3f8a9675f5-office.png";

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/1133bdbc993daad4f6a0b0cc7a0856ec-vamp_look_straight.png";

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/7ab5ca23fa88201039cc4ca3b242a707-vamp_hands_up.png";

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(40);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(3)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./StartScreen.scss", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./StartScreen.scss");

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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "#title_screen {\n  font-size: 100px;\n  text-align: center;\n  font-family: Arial, serif;\n  color: #ffffff;\n  text-shadow: 0 0 10px #000000; }\n  #title_screen .title {\n    margin-top: 100px; }\n  #title_screen .instruction {\n    margin-top: 100px;\n    font-size: 50px;\n    opacity: 1;\n    transition: opacity linear 1s; }\n    #title_screen .instruction.faded {\n      opacity: 0.25; }\n", ""]);

// exports


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/0b002364bc039584c853041b1138d2b8-splash.png";

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameState {
    constructor() {
        this._state = new Map();
    }
    set(key, value) {
        return new Promise(resolve => {
            this._state.set(key, value);
            resolve();
        });
    }
    get(key) {
        return new Promise(resolve => resolve(this._state.get(key)));
    }
}
/* harmony default export */ __webpack_exports__["a"] = (GameState);


/***/ })
/******/ ]);