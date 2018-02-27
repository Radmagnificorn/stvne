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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_ImageComponent__ = __webpack_require__(1);

class GameObject {
    constructor(x = 0, y = 0, img) {
        this.children = [];
        this._components = {};
        this._element = document.createElement('div');
        this._element.style.position = 'absolute';
        this.location = new Vector2d(x, y);
        if (img) {
            this.addComponent(new __WEBPACK_IMPORTED_MODULE_0__components_ImageComponent__["a" /* default */](img));
        }
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
        this._components[component.name] = component.register(this);
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
    generateElement() {
        //this._element.innerHTML = '';
        this.children.forEach(child => {
            this._element.appendChild(child.generateElement());
        });
        return this._element;
    }
}
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(2);

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
/* 2 */
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
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Component;



/***/ }),
/* 3 */
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
/* 4 */
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
/* 5 */
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

var	fixUrls = __webpack_require__(17);

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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_Area__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_GameObject__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_ResourceLoader__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_components_ImageComponent__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__engine_components_PortalComponent__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__SecondArea__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__engine_animation_AniEvents__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__engine_components_CharacterComponent__ = __webpack_require__(11);
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
            vampireIntro: () => __awaiter(this, void 0, void 0, function* () {
                let vampireDave = this.vampire;
                let d = this.dialog;
                yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].pause(1000);
                yield __WEBPACK_IMPORTED_MODULE_7__engine_animation_AniEvents__["a" /* default */].fadeIn(vampireDave.element, 1);
                let princessTalk = yield this.gameState.get("second_area.princess_talk");
                if (princessTalk === "true") {
                    yield vampireDave.say("I see you talked to the princess");
                }
                else {
                    yield vampireDave.say("Hello, I am a vampire. Welcome to my study.", true);
                    yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(d);
                    yield vampireDave.showPortrait('handsup');
                    yield vampireDave.say("As you can see, I have many books", true);
                    yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].pause(100);
                    yield vampireDave.say(", and not just any books...", false);
                    yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].pause(250);
                    yield vampireDave.showPortrait('default');
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
                            yield d.writeText("I am a fan of fiction myself");
                        }
                        else {
                            yield d.writeText("I see, well I generally prefer fiction myself");
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
            }),
            princessShowsUp: () => __awaiter(this, void 0, void 0, function* () {
                let princess = this.princess;
                let vampire = this.vampire;
                yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].pause(1000);
                yield __WEBPACK_IMPORTED_MODULE_7__engine_animation_AniEvents__["a" /* default */].fadeIn(vampire.element, 1);
                yield vampire.say("Oh, hi. How was your meeting with the princess?");
                yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(this.dialog);
                yield __WEBPACK_IMPORTED_MODULE_7__engine_animation_AniEvents__["a" /* default */].fadeIn(princess.element, 1);
                let cabbages = yield this.gameState.get("second_area.cabbages");
                yield princess.say("Hey Dave, some weirdo just told me I look like I could carry " +
                    (cabbages === "One" ? "only one cabbage" : cabbages.toLowerCase() + " cabbages") + "...");
                yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(this.dialog);
                yield princess.say("oh wait! that's them right there.");
                yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(this.dialog);
                yield vampire.showPortrait("handsup");
                yield vampire.say("well what do you want me to do about it?");
            })
        };
    }
    buildScene(imgs) {
        return __awaiter(this, void 0, void 0, function* () {
            let gs = this._gameInstance.gameState;
            let d = this.dialogComponent;
            let dialogBox = this.dialogComponent.element;
            this.dialog = d;
            let exit = new __WEBPACK_IMPORTED_MODULE_1__engine_GameObject__["a" /* default */]();
            exit.addComponent(new __WEBPACK_IMPORTED_MODULE_5__engine_components_PortalComponent__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_6__SecondArea__["a" /* default */](this._gameInstance)));
            exit.width = 50;
            exit.height = 720;
            let background = new __WEBPACK_IMPORTED_MODULE_1__engine_GameObject__["a" /* default */](0, 0);
            background.addComponent(new __WEBPACK_IMPORTED_MODULE_3__engine_components_ImageComponent__["a" /* default */](imgs.get('office'), true));
            //vampire
            let vampire = new __WEBPACK_IMPORTED_MODULE_1__engine_GameObject__["a" /* default */](286, 60);
            let vampireDave = new __WEBPACK_IMPORTED_MODULE_8__engine_components_CharacterComponent__["a" /* default */]("Vampire Dave", new Map([
                ["default", imgs.get('vamp_default')], ['handsup', imgs.get('vamp_handsup')]
            ]), d);
            vampire.addComponent(vampireDave);
            //princess
            let princessGo = new __WEBPACK_IMPORTED_MODULE_1__engine_GameObject__["a" /* default */](505, 190);
            let princess = new __WEBPACK_IMPORTED_MODULE_8__engine_components_CharacterComponent__["a" /* default */]("Demon-eyed Princess", new Map([['default', imgs.get("princess_default")]]), d);
            princessGo.addComponent(princess);
            princessGo.element.style.opacity = '0';
            this.princess = princess;
            this.vampire = vampireDave;
            this.gameLayer.appendChild(vampire);
            this.gameLayer.appendChild(princessGo);
            this.gameLayer.appendChild(exit);
            this.backgroundLayer.appendChild(background);
            vampire.element.style.opacity = '0';
            let talkedToPrincess = yield gs.get("second_area.princess_talk");
            if (!talkedToPrincess) {
                yield this.events.vampireIntro();
            }
            else {
                yield this.events.princessShowsUp();
            }
            yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(dialogBox);
            yield d.hideDialog();
            yield __WEBPACK_IMPORTED_MODULE_7__engine_animation_AniEvents__["a" /* default */].fadeOut(vampire, 1);
        });
    }
    loadResources() {
        return new Promise(resolve => {
            __WEBPACK_IMPORTED_MODULE_2__engine_ResourceLoader__["a" /* default */].loadImagesToMap(new Map([
                ["office", __webpack_require__(26)],
                ["vamp_default", __webpack_require__(27)],
                ["vamp_handsup", __webpack_require__(28)],
                ["princess_default", __webpack_require__(12)]
            ]))
                .then(imgs => {
                resolve();
                this.buildScene(imgs);
            });
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (StartArea);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Scene__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GameObject__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_DialogComponent__ = __webpack_require__(20);



class Area extends __WEBPACK_IMPORTED_MODULE_0__Scene__["a" /* default */] {
    constructor(game, rootObject = new __WEBPACK_IMPORTED_MODULE_1__GameObject__["a" /* default */]()) {
        super(game, rootObject);
        this._backgroundLayer = new __WEBPACK_IMPORTED_MODULE_1__GameObject__["a" /* default */]();
        this._gameLayer = new __WEBPACK_IMPORTED_MODULE_1__GameObject__["a" /* default */]();
        // TODO: make this dynamic for different resolutions
        this._dialog = new __WEBPACK_IMPORTED_MODULE_1__GameObject__["a" /* default */](0, 450);
        this._dialog.addComponent(new __WEBPACK_IMPORTED_MODULE_2__components_DialogComponent__["a" /* default */]());
        this.sceneGraph.appendChild(this._backgroundLayer);
        this.sceneGraph.appendChild(this._gameLayer);
        this.sceneGraph.appendChild(this._dialog);
    }
    get dialogComponent() {
        return this._dialog.components['dialog'];
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
}
/* harmony default export */ __webpack_exports__["a"] = (Area);


/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(2);

class PortalComponent extends __WEBPACK_IMPORTED_MODULE_0__Component__["a" /* Component */] {
    constructor(target) {
        super();
        this._target = target;
    }
    onAdd() {
        this.gameObject.element.addEventListener('click', (ev => { this._target.load(); }));
    }
}
/* harmony default export */ __webpack_exports__["a"] = (PortalComponent);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AniEvents {
    static fadeOut(target, seconds) {
        return this.fadeTo(target, "0.0", seconds);
    }
    static fadeIn(target, seconds) {
        return this.fadeTo(target, "1.0", seconds);
    }
    static fadeTo(target, opacity, seconds) {
        let el = this.getElement(target);
        el.style.transition = "opacity " + seconds + "s";
        el.style.transitionTimingFunction = 'linear';
        el.style.transitionDelay = '0';
        let eaPromise = this.attachEndAnimationListener(el);
        el.style.opacity = opacity;
        return eaPromise;
    }
    static getElement(target) {
        return target.element || target;
    }
    static attachEndAnimationListener(element) {
        return new Promise(resolve => {
            let aniEndListener = () => {
                resolve();
                element.removeEventListener('transitionend', aniEndListener);
            };
            element.addEventListener('transitionend', aniEndListener, false);
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (AniEvents);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ImageComponent__ = __webpack_require__(1);

class CharacterComponent extends __WEBPACK_IMPORTED_MODULE_0__ImageComponent__["a" /* default */] {
    constructor(name, portraits, dialog) {
        super(portraits.get('default'));
        this._charName = name;
        this._portraits = portraits;
        this._dialog = dialog;
    }
    showPortrait(name) {
        return new Promise(resolve => {
            this.image = this._portraits.get(name);
            resolve();
        });
    }
    get name() {
        return "character";
    }
    say(text, clearFirst = true) {
        if (this._dialog) {
            return this._dialog.writeText(text, clearFirst, this._charName);
        }
        else
            return Promise.resolve();
    }
    ask(question, options) {
        return this.say(question, true).then(() => {
            return this._dialog.presentOptions(options, false, this._charName);
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (CharacterComponent);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/acde612f2f7fd10ff9859531aad42466-princess.png";

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_GameWindow__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_Game__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_ResourceLoader__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_GameState__ = __webpack_require__(29);




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
    gameWindow.rootElement.style.transform = "scale(" + scale + ")";
    gameWindow.rootElement.style.left = offset + 'px';
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameWindow_scss__ = __webpack_require__(15);
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
        this._rootElement.appendChild(scene.sceneGraph.generateElement());
    }
}
/* harmony default export */ __webpack_exports__["a"] = (GameWindow);


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

var update = __webpack_require__(5)(content, options);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "body {\n  margin: 0;\n  padding: 0;\n  background: #000000; }\n  body #stvne #game_window {\n    position: relative;\n    top: 0;\n    left: 0;\n    margin: 0;\n    transform-origin: top left; }\n    body #stvne #game_window canvas {\n      position: absolute;\n      top: 0;\n      left: 0; }\n", ""]);

// exports


/***/ }),
/* 17 */
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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__testgame_StartArea__ = __webpack_require__(6);

class Game {
    constructor(gameWindow, resourceLoader, gameState) {
        this.running = false;
        this.fps = 24;
        this.gameWindow = gameWindow;
        this.resourceLoader = resourceLoader;
        this._gameState = gameState;
    }
    loadScene(scene) {
        this.currentScene = scene;
        scene.loadResources().then(() => {
            this.gameWindow.setScene(scene);
        });
    }
    start() {
        this.running = true;
        let startArea = new __WEBPACK_IMPORTED_MODULE_0__testgame_StartArea__["a" /* default */](this);
        this.loadScene(startArea);
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(0);

class Scene {
    constructor(game, rootObject = new __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* default */]()) {
        this._gameInstance = game;
        this.sceneGraph = rootObject;
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
    load() {
        this._gameInstance.loadScene(this);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Scene);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DialogStyle_scss__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DialogStyle_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__DialogStyle_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animation_AnimationTimer__ = __webpack_require__(23);



class DialogComponent extends __WEBPACK_IMPORTED_MODULE_0__Component__["a" /* Component */] {
    constructor() {
        super();
        this.isVisible = false;
        this._running = false;
        this._timer = new __WEBPACK_IMPORTED_MODULE_2__animation_AnimationTimer__["a" /* default */](this.update.bind(this), 30);
    }
    onAdd() {
        this._element = this.createDialogUI();
        this._titleBox = this._element.getElementsByClassName('title_box')[0];
        this._textArea = this._element.getElementsByClassName('text_area')[0];
        this.gameObject.element.appendChild(this._element);
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
    update() {
        if (this.isVisible) {
            let letterIterator = this.letters.next();
            if (!letterIterator.done) {
                letterIterator.value.style.visibility = 'visible';
            }
            else {
                this.sendFinishedNotification();
                this._timer.stop();
            }
        }
    }
    *showLetters() {
        let words = this._textArea.children;
        for (let w = 0; w < words.length; w++) {
            for (let l = 0; l < words[w].children.length; l++) {
                yield words[w].children[l];
            }
        }
    }
    showDialog() {
        let aniEnd = this.startAnimationEndListener();
        this.isVisible = true;
        this._element.classList.add('visible');
        return aniEnd;
    }
    hideDialog() {
        let aniEnd = this.startAnimationEndListener();
        this.isVisible = false;
        this._element.classList.remove('visible');
        return aniEnd;
    }
    startAnimationEndListener() {
        return new Promise(resolve => {
            let aniEndListener = () => {
                resolve();
                this.element.removeEventListener('transitionend', aniEndListener);
            };
            this.element.addEventListener('transitionend', aniEndListener, false);
        });
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
        this.showDialog();
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
    get name() {
        return "dialog";
    }
}
/* harmony default export */ __webpack_exports__["a"] = (DialogComponent);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(22);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(5)(content, options);

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".animated_dialog_box {\n  padding: 20px;\n  border-radius: 20px 20px 0 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 225px;\n  width: 1235px;\n  background: rgba(0, 0, 0, 0.7);\n  border: 3px solid #ffffff;\n  font-family: Arial, serif;\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0s, opacity 0.5s; }\n  .animated_dialog_box.visible {\n    visibility: visible;\n    opacity: 1; }\n  .animated_dialog_box .word {\n    font-size: 40px;\n    color: #ffffff;\n    margin: 0 5px 0 5px;\n    display: inline-block; }\n  .animated_dialog_box .dialog_option {\n    width: 550px;\n    border: 2px solid #ffffff;\n    font-size: 30px;\n    text-align: center;\n    font-weight: bold;\n    color: #ffffff;\n    margin: 10px;\n    padding: 20px;\n    display: inline-block; }\n  .animated_dialog_box .title_box {\n    visibility: hidden;\n    position: absolute;\n    color: #ffffff;\n    top: -25px;\n    font-size: 23px;\n    font-weight: bold;\n    background: #000000;\n    border: #ffffff 2px solid;\n    padding: 5px 10px;\n    border-radius: 10px; }\n    .animated_dialog_box .title_box.visible {\n      visibility: visible; }\n", ""]);

// exports


/***/ }),
/* 23 */
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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__StartArea__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_ResourceLoader__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_GameObject__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_components_ImageComponent__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__engine_components_PortalComponent__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__engine_Area__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__engine_animation_AniEvents__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__engine_components_CharacterComponent__ = __webpack_require__(11);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};









class SecondArea extends __WEBPACK_IMPORTED_MODULE_6__engine_Area__["a" /* default */] {
    buildScene(imgs) {
        return __awaiter(this, void 0, void 0, function* () {
            let gs = this._gameInstance.gameState;
            let exit = new __WEBPACK_IMPORTED_MODULE_2__engine_GameObject__["a" /* default */]();
            exit.addComponent(new __WEBPACK_IMPORTED_MODULE_5__engine_components_PortalComponent__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_0__StartArea__["a" /* default */](this._gameInstance)));
            exit.width = 50;
            exit.height = 720;
            let background = new __WEBPACK_IMPORTED_MODULE_2__engine_GameObject__["a" /* default */]();
            background.addComponent(new __WEBPACK_IMPORTED_MODULE_3__engine_components_ImageComponent__["a" /* default */](imgs[0]));
            let dialog = this.dialogComponent;
            let princessGo = new __WEBPACK_IMPORTED_MODULE_2__engine_GameObject__["a" /* default */](505, 190);
            let princess = new __WEBPACK_IMPORTED_MODULE_8__engine_components_CharacterComponent__["a" /* default */]("Demon-eyed Princess", new Map([['default', imgs[1]]]), dialog);
            princessGo.addComponent(princess);
            princessGo.element.style.opacity = '0';
            this.gameLayer.appendChild(princessGo);
            this.gameLayer.appendChild(exit);
            this.backgroundLayer.appendChild(background);
            yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].pause(1000);
            yield __WEBPACK_IMPORTED_MODULE_7__engine_animation_AniEvents__["a" /* default */].fadeIn(princessGo, 1);
            yield princess.say("Hello, I am a princess of some sort... ");
            yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].pause(250);
            yield princess.say("welcome to my bridge", false);
            yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(dialog);
            yield princess.say("If you want to pass, you must answer a riddle.");
            yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(dialog);
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
            yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(dialog);
            yield dialog.writeText("Oh well... It doesn't even really matter if you got it right or wrong. I was never going to let you pass.");
            yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].waitForClick(dialog);
            yield dialog.writeText("bye... ");
            yield this.gameState.set("second_area.princess_talk", "true");
            yield __WEBPACK_IMPORTED_MODULE_4__engine_ActionEvents__["a" /* default */].pause(500);
            yield dialog.hideDialog();
        });
    }
    loadResources() {
        return new Promise(resolve => {
            __WEBPACK_IMPORTED_MODULE_1__engine_ResourceLoader__["a" /* default */].loadImages(__webpack_require__(25), __webpack_require__(12)).then(imgs => {
                this.buildScene(imgs);
                resolve();
            });
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (SecondArea);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/f3356608c658d0488ca34d767a7d046e-palace.png";

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/962324c1976ede6e1606303d1801d2d9-office.png";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/1133bdbc993daad4f6a0b0cc7a0856ec-vamp_look_straight.png";

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/7ab5ca23fa88201039cc4ca3b242a707-vamp_hands_up.png";

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameState {
    constructor() {
        this._state = {};
    }
    set(key, value) {
        return new Promise(resolve => {
            this._state[key] = value;
            resolve();
        });
    }
    get(key) {
        return new Promise(resolve => resolve(this._state[key]));
    }
}
/* harmony default export */ __webpack_exports__["a"] = (GameState);


/***/ })
/******/ ]);