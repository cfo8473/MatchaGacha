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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst Tap = __webpack_require__(/*! ./tap */ \"./src/tap.js\");\nconst Scroller = __webpack_require__(/*! ./scroller */ \"./src/scroller.js\");\nconst Party = __webpack_require__(/*! ./party */ \"./src/party.js\");\n\nclass Game {\n  constructor(\n            context,\n            gameCanvas, \n            mountainsContext, \n            backgroundMountainsContext,\n            cloudLayerContextA, \n            cloudLayerContextC, \n            hillContext,\n            skyContext,\n            partyCanvasGroupContext\n            ) \n    {\n      this.context = context;\n      this.gameCanvas = gameCanvas;\n      this.gameCanvas.setAttribute(\"tabindex\", 0);\n      \n      this.player = new Player();\n\n      this.bindKeyHandlers();\n      this.keyboardTap = this.keyboardTap.bind(this);\n    \n      // Tap.tapMethods(this.player);\n\n      this.draw = this.draw.bind(this);\n      this.drawPartyFrames = this.drawPartyFrames.bind(this);\n\n      this.drawBackground(\n        hillContext,\n        skyContext,\n        mountainsContext,\n        backgroundMountainsContext,\n        cloudLayerContextA,\n        cloudLayerContextC\n      );\n\n      this.drawParty(\n        partyCanvasGroupContext[0],\n        partyCanvasGroupContext[1],\n        partyCanvasGroupContext[2],\n        partyCanvasGroupContext[3],\n      )\n\n  }\n\n  bindKeyHandlers() {\n    this.gameCanvas.addEventListener('keydown', (e) => this.keyboardTap(e));\n\n  }\n\n  keyboardTap(e) {\n    if (e.key === 'a') {\n      this.player.tap(this.heroA.fetchPower());\n      this.heroA.heroAttackAnimation();\n    } else if (e.key === 's') {\n      this.player.tap(this.heroB.fetchPower());\n      this.heroB.heroAttackAnimation();\n    } else if (e.key === 'd') {\n      this.player.tap(this.heroC.fetchPower());\n      this.heroC.heroAttackAnimation();\n    } else if (e.key === 'f') {\n      this.player.tap(this.heroD.fetchPower());\n      this.heroD.heroAttackAnimation();\n    }\n\n    switch(e.key) {\n      case 'z':\n        return this.heroA.upgradeStr();\n      case 'x':\n        return this.heroB.upgradeStr();\n      case 'c':\n        return this.heroC.upgradeStr();\n      case 'v':\n        return this.heroD.upgradeStr();\n    }\n  }\n\n  drawBackground(\n    hillContext,\n    skyContext,\n    mountainsContext, \n    backgroundMountainsContext,\n    cloudLayerContextA,\n    cloudLayerContextC,\n    ) {\n\n      const hill = new Image();\n      const sky = new Image();\n      const mountains = new Image();\n      const backgroundMountains = new Image();\n      const cloudLayerA = new Image();\n      const cloudLayerC = new Image();\n    \n      hill.src = \"../assets/images/layers/hill.png\";\n      sky.src = \"../assets/images/layers/sky_fc.png\";\n      mountains.src = '../assets/images/layers/grassy_mountains_fc.png';\n      backgroundMountains.src = '../assets/images/layers/far_mountains_fc.png';\n      cloudLayerA.src = '../assets/images/layers/clouds_front_fc.png';\n      cloudLayerC.src = '../assets/images/layers/clouds_mid_fc.png';\n    \n      this.hill = new Scroller(hillContext, hill, -8, 768, 0);\n      this.sky = new Scroller(skyContext, sky, -5, 768, 0);\n      this.mountains = new Scroller(mountainsContext, mountains, -15, 768, 0.2);\n      this.backgroundMountains = new Scroller(backgroundMountainsContext, backgroundMountains, -15, 768, 0.3);\n      this.cloudLayerA = new Scroller(cloudLayerContextA, cloudLayerA, 0, 768, 0.2);\n      this.cloudLayerC = new Scroller(cloudLayerContextC, cloudLayerC, -10, 768, 0.6)\n  }\n\n  drawParty(partyAContext, partyBContext, partyCContext, partyDContext) {\n    const heroIdleA = new Image();\n    const heroIdleB = new Image();\n    const heroIdleC = new Image();\n    const heroIdleD = new Image();\n    heroIdleA.src = \"../assets/images/characters/hero/lufia-a-idle.png\";\n    heroIdleB.src = \"../assets/images/characters/hero/lufia-b-idle.png\";\n    heroIdleC.src = \"../assets/images/characters/hero/lufia-c-idle.png\";\n    heroIdleD.src = \"../assets/images/characters/hero/lufia-d-idle.png\";\n    \n    this.heroA = new Party(partyAContext, heroIdleA, 5, 95, false);\n    this.heroB = new Party(partyBContext, heroIdleB, 5, 95, false);\n    this.heroC = new Party(partyCContext, heroIdleC, 5, 95, false);\n    this.heroD = new Party(partyDContext, heroIdleD, 5, 95, false);\n  }\n\n  draw() {\n    requestAnimationFrame(this.draw);\n    // temporary stat display\n    this.player.drawTapPower(this.context);\n\n    // main canvas parallax draw\n    this.hill.draw();\n    this.sky.draw();\n    this.cloudLayerA.draw();\n    this.cloudLayerC.draw();\n    this.mountains.draw();\n    this.backgroundMountains.draw();\n\n    // party  member draw\n\n    \n    // this.heroA.draw();\n\n    this.gameCanvas.focus();\n    \n\n    // party canvas draw\n    this.heroA.draw('a');\n    this.heroB.draw('b');\n    this.heroC.draw('c');\n    this.heroD.draw('d');\n  }\n\n  drawPartyFrames() {\n    requestAnimationFrame(this.drawPartyFrames);\n    this.heroA.draw('a');\n    this.heroB.draw('b');\n    this.heroC.draw('c');\n    this.heroD.draw('d');\n\n  }\n\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("console.log(\"Webpack is working!\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function() {\n  const gameCanvas = document.getElementById(\"game-canvas\");\n  const canvasContext = gameCanvas.getContext(\"2d\");\n\n  const hill = document.getElementById('hill-canvas');\n  const hillContext = hill.getContext('2d');\n\n  const sky = document.getElementById('sky-canvas');\n  const skyContext = sky.getContext('2d');\n\n  const cloudLayerCanvasA = document.getElementById('cloud-layer-a-canvas');\n  const cloudLayerContextA = cloudLayerCanvasA.getContext('2d');\n\n  const cloudLayerCanvasC = document.getElementById('cloud-layer-c-canvas');\n  const cloudLayerContextC = cloudLayerCanvasC.getContext('2d');\n\n  const mountainsCanvas = document.getElementById('mountains-canvas');\n  const mountainsCanvasContext = mountainsCanvas.getContext('2d');\n\n  const backgroundMountainsCanvas = document.getElementById('background-mountains-canvas');\n  const backgroundMountainsCanvasContext = backgroundMountainsCanvas.getContext('2d');\n\n  const partyCanvasA = document.getElementById('party-member-canvas-a');\n  const partyCanvasContextA = partyCanvasA.getContext('2d');\n\n  const partyCanvasB = document.getElementById('party-member-canvas-b');\n  const partyCanvasContextB = partyCanvasB.getContext('2d');\n\n  const partyCanvasC = document.getElementById('party-member-canvas-c');\n  const partyCanvasContextC = partyCanvasC.getContext('2d');\n\n  const partyCanvasD = document.getElementById('party-member-canvas-d');\n  const partyCanvasContextD = partyCanvasD.getContext('2d');\n\n  const partyCanvasGroup = [partyCanvasContextA, partyCanvasContextB, partyCanvasContextC, partyCanvasContextD];\n\n\n\n\n  const game = new Game(\n    canvasContext, \n    gameCanvas, \n    mountainsCanvasContext,\n    backgroundMountainsCanvasContext,\n    cloudLayerContextA,\n    cloudLayerContextC,\n    hillContext,\n    skyContext,\n    partyCanvasGroup\n  );\n  game.draw();\n  \n  // const gameView = new GameView(game, context);\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/party.js":
/*!**********************!*\
  !*** ./src/party.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Party {\n  constructor(context, image, startHeight, srcWidth, attackState) {\n    this.context = context;\n    this.image = image;\n    this.x = 0;\n    this.y = startHeight;\n    this.srcWidth = srcWidth;\n    this.attackState = attackState;\n    this.height = this.context.canvas.height;\n    this.width = this.context.canvas.width;\n    this.attackPower = 1;\n    this.critChance = 5;\n    \n  }\n\n  fetchPower() {\n    return this.attackPower;\n  }\n\n  upgradeStr() {\n    this.attackPower += 1;\n  }\n\n  heroAttackAnimation() {\n    this.attackState = true;\n  }\n\n  draw(heroTag) {\n    if (!this.attackState) {\n      this.context.clearRect(0, 0, this.width, this.height);\n      this.context.drawImage(this.image, this.x, this.y);\n    } else {\n      this.drawAttack(heroTag);\n    }\n    this.drawStats();\n    \n  }\n\n  drawAttack(hero) {\n    const heroAttackA = new Image();\n    const heroAttackB = new Image();\n    const heroAttackC = new Image();\n    const heroAttackD = new Image();\n\n    heroAttackA.src = \"../assets/images/characters/hero/lufia-a-attack.png\";\n    heroAttackB.src = \"../assets/images/characters/hero/lufia-b-attack.png\";\n    heroAttackC.src = \"../assets/images/characters/hero/lufia-c-attack.png\";\n    heroAttackD.src = \"../assets/images/characters/hero/lufia-d-attack.png\";\n\n    if (hero === 'a') {\n      this.context.clearRect(0, 0, this.width, this.height);\n      this.context.drawImage(heroAttackA, this.x, this.y);\n    } else if (hero === 'b') {\n      this.context.clearRect(0, 0, this.width, this.height);\n      this.context.drawImage(heroAttackB, this.x, this.y);\n    } else if (hero === 'c') {\n      this.context.clearRect(0, 0, this.width, this.height);\n      this.context.drawImage(heroAttackC, this.x, this.y);\n    } else if (hero === 'd') {\n      this.context.clearRect(0, 0, this.width, this.height);\n      this.context.drawImage(heroAttackD, this.x, this.y);\n    } \n    \n    \n    this.attackState = false;\n  }\n\n\n\n  drawStats() {\n    const width = this.context.canvas.width;\n    const height = this.context.canvas.height;\n    this.context.clearRect(55, 0, width, height);\n\n    const attackStat = `ATK ${this.attackPower}`;\n    const criticalStat = `CRIT ${this.critChance}%`;\n\n    this.context.font = \"10px Arial\";\n    this.context.fillStyle = 'white';\n    this.context.fillText(attackStat, 75, 20);\n    this.context.fillText(criticalStat, 75, 35);\n  }\n}\n\nmodule.exports = Party;\n\n\n//# sourceURL=webpack:///./src/party.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Player {\n  constructor() {\n    this.freeCurrency = 0;\n    this.premiumCurrency = 0;\n    this.passiveIncome = 1;\n    setInterval(() => this.income(), 1000);\n  }\n\n  tap(value) {\n    this.freeCurrency += value;\n    console.log(`FREE CURRENCY ${this.freeCurrency}`);\n  }\n\n  income() {\n    this.freeCurrency += this.passiveIncome;\n  }\n\n  // upgradeTap(value) {\n  //   this.tapPower += value;\n  //   console.log(`${value} added to tap power (${this.tapPower})`);\n  // }\n\n  upgradeIncome(value) {\n    this.passiveIncome += value;\n    console.log(`${value} added to income (${this.passiveIncome})`);\n  }\n\n  addPremiumCurrency(value) {\n    this.premiumCurrency += value;\n  }\n\n  update(context) {\n    this.draw(context);\n  }\n\n  drawTapPower(context) {\n    const width = context.canvas.width;\n    const height = context.canvas.height;\n    context.clearRect(0, 0, width, height);\n\n    const freeCurrency = `Currency: ${this.freeCurrency}`;\n    const passiveIncome = `Income: ${this.passiveIncome}`;\n\n    context.font = \"15px Arial\";\n    context.fillStyle = 'white';\n    context.fillText(freeCurrency, 10, 20);\n    context.fillText(passiveIncome, 10, 60);\n  }\n\n\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/scroller.js":
/*!*************************!*\
  !*** ./src/scroller.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Scroller {\n  constructor(context, image, startHeight, srcWidth, speed) {\n    this.context = context;\n    this.image = image;\n    this.x = 0;\n    this.y = startHeight;\n    this.srcWidth = srcWidth;\n    this.speed = speed;\n    this.height = this.context.canvas.height;\n    this.width = this.context.canvas.width;\n\n  }\n\n  draw() {\n    this.context.clearRect(0, 0, this.width, this.height);\n    this.context.drawImage(this.image, this.x, this.y);\n    this.context.drawImage(this.image, this.x + this.srcWidth, this.y);\n    if (this.x <= -this.srcWidth) {\n      this.x = 0;\n    }\n    this.x -= this.speed;\n  }\n}\n\nmodule.exports = Scroller;\n\n\n//# sourceURL=webpack:///./src/scroller.js?");

/***/ }),

/***/ "./src/tap.js":
/*!********************!*\
  !*** ./src/tap.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Tap = {\n  tapMethods(player) {\n    const tapClick = document.getElementById('tap-click');\n    const tapUpgrade = document.getElementById('tap-upgrade');\n\n    tapClick.addEventListener('click', (e) => {\n      player.tap();\n    });\n\n    tapUpgrade.addEventListener('click', (e) => {\n      player.upgrade(5);\n    });\n  }\n\n  \n}\n\nmodule.exports = Tap;\n\n//# sourceURL=webpack:///./src/tap.js?");

/***/ })

/******/ });