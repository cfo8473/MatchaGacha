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

/***/ "./src/boss.js":
/*!*********************!*\
  !*** ./src/boss.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Boss {\n  constructor(context, image, startHeight, srcWidth, speed, player) {\n    this.context = context;\n    this.image = image;\n    this.hitPoints = 1000;\n    this.x = 0;\n    this.y = startHeight;\n    this.srcWidth = srcWidth;\n    this.flyUp = false;\n    this.bossFrames = 0;\n    this.speed = speed;\n    this.flySpeed = speed;\n    this.height = this.context.canvas.height;\n    this.width = this.context.canvas.width;\n    this.player = player;\n    this.hit = false;\n    \n    \n    setInterval(() => this.changeSprite(), 400);\n  }\n\n  takeDamage(partyMember) {\n\n    // start frame\n    this.bossFrames = 1;\n    // this.context.clearRect(0, 0, this.width, this.height);\n    // this.context.drawImage(damaged, this.x, this.y);\n\n    if (Math.random() >= (1 - (partyMember.critChance * 0.01))) {\n      console.log(\"CRITICAL!\")\n      this.hitPoints -= partyMember.attackPower * 2;\n    } else {\n      this.hitPoints -= partyMember.attackPower;\n    }\n\n\n  \n    // debug death\n    if ( this.hitPoints <= 0 ) {\n      this.death();\n    }\n  }\n\n  death() {\n    // temporary death\n    this.hitPoints += 1000;\n    this.x = 200;\n    this.y = 60;\n\n    this.player.freeCurrency += 40000;\n  }\n\n  changeSprite() {\n    let random = Math.floor((Math.random() * 3) + 1)-1;\n    // console.log(random)\n\n    //condtional for boss dmg\n    // console.log(this.bossFrames);\n\n    // if (this.bossFrames > 0) {\n    //   return this.image.src = \"../assets/images/characters/bosses/mana-beast-idle3-damaged.png\";\n    // } else {\n\n      switch(random) {\n        case 0:\n          return this.image.src = \"../assets/images/characters/bosses/mana-beast-idle.png\";\n        case 1:\n          return this.image.src = \"../assets/images/characters/bosses/mana-beast-idle2.png\";\n        case 2:\n          return this.image.src = \"../assets/images/characters/bosses/mana-beast-idle3.png\";\n      // }\n    }\n      \n    \n  }\n\n  shift() {\n    // console.log(this.y);\n    let shiftValue = this.flySpeed;\n    if (this.y <= 80) {\n      this.flyUp = true;\n    }\n     else if (this.y >= 125) {\n      //  console.log(\"TOO FAR\")\n      //  console.log(\"this.y\");\n      //  console.log(shiftValue);\n      this.flyUp = false;\n    }\n    \n    if (this.flyUp === true) {\n      this.y += shiftValue;\n    } else if (this.flyUp === false) {\n      this.y -= shiftValue;\n    }\n  }\n  \n\n  draw() {\n    // requestAnimationFrame(this.draw);\n    \n    // console.log(this.bossFrames);\n    \n    if (this.bossFrames > 0 ) {\n      this.image.src = \"../assets/images/characters/bosses/mana-beast-idle3-damaged.png\";\n      if (this.hit) {\n        this.y += 4;\n        this.hit = !this.hit;\n      } else {\n        this.y -= 4;\n        this.hit = !this.hit;\n      }\n      this.bossFrames -= 1;\n    } else {\n      this.shift();\n      this.x -= this.speed;\n      this.context.clearRect(0, 0, this.width, this.height);\n      this.context.drawImage(this.image, this.x, this.y);\n      if (this.x >= this.srcWidth - 350) {\n        this.speed = -(this.speed)\n      }\n      else if (this.x <= -25) {\n        this.speed = -(this.speed)\n      }\n    }\n\n    // this.context.font = \"20px Arial\";\n    // this.context.fillStyle = 'red';\n    // this.context.fillText(\"SDFSFD\", this.x + 560, this.y + 320);\n    \n    // this.context.drawImage(this.image, this.x + this.srcWidth, this.y);\n    \n    const hitPoints = `HP: ${this.hitPoints}`;\n\n    this.context.font = \"20px Arial\";\n    this.context.fillStyle = 'red';\n    this.context.strokeStyle = 'white';\n    this.context.fillText(hitPoints, this.x+160, this.y+20);\n    this.context.strokeText(hitPoints, this.x + 160, this.y + 20);\n  }\n}\n\nmodule.exports = Boss;\n\n\n//# sourceURL=webpack:///./src/boss.js?");

/***/ }),

/***/ "./src/controls.js":
/*!*************************!*\
  !*** ./src/controls.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nclass Controls {\n  constructor(game) {\n    this.game = game;\n  }\n\n  bindKeyHandlers() {\n    this.game.gameCanvas.addEventListener('keydown', (e) => this.keyboardTap(e));\n    this.game.gameCanvas.addEventListener('keyup', (e) => this.keyboardTapRelease(e));\n  }\n\n  keyboardTap(e) {\n    if (e.repeat) { return }\n    switch (e.key) {\n      case 'a':\n        this.game.player.tap(this.game.heroA.fetchPower());\n        this.game.heroA.heroAttackAnimation();\n        this.game.bossLayerC.takeDamage(this.game.heroA);\n        break;\n      case 's':\n        this.game.player.tap(this.game.heroB.fetchPower());\n        this.game.heroB.heroAttackAnimation();\n        this.game.bossLayerC.takeDamage(this.game.heroB);\n        break;\n      case 'd':\n        this.game.player.tap(this.game.heroC.fetchPower());\n        this.game.heroC.heroAttackAnimation();\n        this.game.bossLayerC.takeDamage(this.game.heroC);\n        break;\n      case 'f':\n        this.game.player.tap(this.game.heroD.fetchPower());\n        this.game.heroD.heroAttackAnimation();\n        this.game.bossLayerC.takeDamage(this.game.heroD);\n        break;\n      case 'z':\n        return this.game.heroA.upgradeStr();\n      case 'x':\n        return this.game.heroB.upgradeStr();\n      case 'c':\n        return this.game.heroC.upgradeStr();\n      case 'v':\n        return this.game.heroD.upgradeStr();\n    }\n  }\n\n  keyboardTapRelease(e) {\n    switch (e.key) {\n      case 'a':\n        this.game.heroA.heroIdle();\n        break;\n      case 's':\n        this.game.heroB.heroIdle();\n        break;\n      case 'd':\n        this.game.heroC.heroIdle();\n        break;\n      case 'f':\n        this.game.heroD.heroIdle();\n        break;\n    }\n  }\n}\n\nmodule.exports = Controls;\n\n//# sourceURL=webpack:///./src/controls.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst Tap = __webpack_require__(/*! ./tap */ \"./src/tap.js\");\nconst Scroller = __webpack_require__(/*! ./scroller */ \"./src/scroller.js\");\nconst Party = __webpack_require__(/*! ./party */ \"./src/party.js\");\nconst Boss = __webpack_require__(/*! ./boss */ \"./src/boss.js\");\nconst Controls = __webpack_require__(/*! ./controls */ \"./src/controls.js\");\n\nclass Game {\n  constructor(options)  {\n    this.context = options.context;\n    this.gameCanvas = options.gameCanvas;\n    this.gameCanvas.setAttribute(\"tabindex\", 0);\n    const { partyUI } = options;\n    \n    this.player = new Player();\n\n    this.controls = new Controls(this);\n    this.controls.bindKeyHandlers(this.gameCanvas);\n    \n\n    // this.bindKeyHandlers();\n    // this.keyboardTap = this.keyboardTap.bind(this);\n  \n    this.draw = this.draw.bind(this);\n    // this.drawPartyFrames = this.drawPartyFrames.bind(this);\n\n    this.drawBackground(options);\n    this.drawParty(partyUI[0], partyUI[1], partyUI[2], partyUI[3]);\n\n    Tap.tapMethods({\n      player: this.player,\n      heroA: this.heroA,\n      heroB: this.heroB,\n      heroC: this.heroC,\n      heroD: this.heroD,\n      boss: this.bossLayerC\n    });\n  }\n\n  \n\n  keyboardTapRelease(e) {\n    switch (e.key) {\n      case 'a':\n        this.heroA.heroIdle();\n        break;\n      case 's':\n        this.heroB.heroIdle();\n        break;\n      case 'd':\n        this.heroC.heroIdle();\n        break;\n      case 'f':\n        this.heroD.heroIdle();\n        break;\n    }\n  }\n\n  drawBackground(options) {\n    const hill = new Image();\n    const sky = new Image();\n    const mountains = new Image();\n    const backgroundMountains = new Image();\n    const cloudLayerA = new Image();\n    const cloudLayerC = new Image();\n\n    const bossLayerC = new Image();\n    console.log(hill);\n  \n    hill.src = \"../assets/images/layers/hill.png\";\n    sky.src = \"../assets/images/layers/sky_fc.png\";\n    mountains.src = '../assets/images/layers/grassy_mountains_fc.png';\n    backgroundMountains.src = '../assets/images/layers/far_mountains_fc.png';\n    cloudLayerA.src = '../assets/images/layers/clouds_front_fc.png';\n    cloudLayerC.src = '../assets/images/layers/clouds_mid_fc.png';\n    bossLayerC.src = '../assets/images/characters/bosses/mana-beast-idle.png';\n  \n    this.hill = new Scroller(options.hill, hill, -8, 768, 0);\n    this.sky = new Scroller(options.sky, sky, -5, 768, 0);\n    this.mountains = new Scroller(options.mountains, mountains, -15, 768, 0.2);\n    this.backgroundMountains = new Scroller(options.backgroundMountains, backgroundMountains, -15, 768, 0.3);\n    this.cloudLayerA = new Scroller(options.frontCloudLayer, cloudLayerA, 0, 768, 0.2);\n    this.cloudLayerC = new Scroller(options.backCloudLayer, cloudLayerC, -10, 768, 0.6)\n    this.bossLayerC = new Boss(options.frontBoss, bossLayerC, 110, 768, 0.2, this.player)\n  }\n\n  drawParty(partyAContext, partyBContext, partyCContext, partyDContext) {\n    const heroIdleA = new Image();\n    const heroIdleB = new Image();\n    const heroIdleC = new Image();\n    const heroIdleD = new Image();\n    heroIdleA.src = \"../assets/images/characters/hero/lufia-a-idle.png\";\n    heroIdleB.src = \"../assets/images/characters/hero/lufia-b-idle.png\";\n    heroIdleC.src = \"../assets/images/characters/hero/lufia-c-idle.png\";\n    heroIdleD.src = \"../assets/images/characters/hero/lufia-d-idle.png\";\n\n    const heroPrepA = new Image();\n    const heroPrepB = new Image();\n    const heroPrepC = new Image();\n    const heroPrepD = new Image();\n    heroPrepA.src = \"../assets/images/characters/hero/lufia-a-prep.png\";\n    heroPrepB.src = \"../assets/images/characters/hero/lufia-b-prep.png\";\n    heroPrepC.src = \"../assets/images/characters/hero/lufia-c-prep.png\";\n    heroPrepD.src = \"../assets/images/characters/hero/lufia-d-prep.png\";\n\n    const heroAttackA = new Image();\n    const heroAttackB = new Image();\n    const heroAttackC = new Image();\n    const heroAttackD = new Image();\n    heroAttackA.src = \"../assets/images/characters/hero/lufia-a-attack.png\";\n    heroAttackB.src = \"../assets/images/characters/hero/lufia-b-attack.png\";\n    heroAttackC.src = \"../assets/images/characters/hero/lufia-c-attack.png\";\n    heroAttackD.src = \"../assets/images/characters/hero/lufia-d-attack.png\";\n\n    const heroKeyDownA = new Image();\n    const heroKeyDownB = new Image();\n    const heroKeyDownC = new Image();\n    const heroKeyDownD = new Image();\n    heroKeyDownA.src = \"../assets/images/keys/a-down.png\";\n    heroKeyDownB.src = \"../assets/images/keys/s-down.png\";\n    heroKeyDownC.src = \"../assets/images/keys/d-down.png\";\n    heroKeyDownD.src = \"../assets/images/keys/f-down.png\";\n\n    const heroKeyUpA = new Image();\n    const heroKeyUpB = new Image();\n    const heroKeyUpC = new Image();\n    const heroKeyUpD = new Image();\n    heroKeyUpA.src = \"../assets/images/keys/a-up.png\";\n    heroKeyUpB.src = \"../assets/images/keys/s-up.png\";\n    heroKeyUpC.src = \"../assets/images/keys/d-up.png\";\n    heroKeyUpD.src = \"../assets/images/keys/f-up.png\";\n\n    let heroOptionsA = {\n      context: partyAContext,\n      idleImage: heroIdleA,\n      prepImage: heroPrepA,\n      attackImage: heroAttackA,\n      heroKeyDown: heroKeyDownA,\n      heroKeyUp: heroKeyUpA,\n      startHeight: 5,\n      srcWidth: 95\n    }\n\n    let heroOptionsB = {\n      context: partyBContext,\n      idleImage: heroIdleB,\n      prepImage: heroPrepB,\n      attackImage: heroAttackB,\n      heroKeyDown: heroKeyDownB,\n      heroKeyUp: heroKeyUpB,\n      startHeight: 5,\n      srcWidth: 95\n    }\n\n    let heroOptionsC = {\n      context: partyCContext,\n      idleImage: heroIdleC,\n      prepImage: heroPrepC,\n      attackImage: heroAttackC,\n      heroKeyDown: heroKeyDownC,\n      heroKeyUp: heroKeyUpC,\n      startHeight: 5,\n      srcWidth: 95\n    }\n\n    let heroOptionsD = {\n      context: partyDContext,\n      idleImage: heroIdleD,\n      prepImage: heroPrepD,\n      attackImage: heroAttackD,\n      heroKeyDown: heroKeyDownD,\n      heroKeyUp: heroKeyUpD,\n      startHeight: 5,\n      srcWidth: 95\n    }\n    \n    this.heroA = new Party(heroOptionsA);\n    this.heroB = new Party(heroOptionsB);\n    this.heroC = new Party(heroOptionsC);\n    this.heroD = new Party(heroOptionsD);\n    this.autoAttackFrames = 200;\n  }\n\n\n  draw() {\n    requestAnimationFrame(this.draw);\n  \n    this.autoAttackFrames -= 1;\n    //debug auto\n    if (this.autoAttackFrames === 150) {\n      this.player.tap(this.heroA.fetchPower());\n      this.heroA.heroAttackAnimation();\n      this.bossLayerC.takeDamage(this.heroA);\n    } else if (this.autoAttackFrames === 100) {\n      this.player.tap(this.heroB.fetchPower());\n      this.heroB.heroAttackAnimation();\n      this.bossLayerC.takeDamage(this.heroB);\n    } else if (this.autoAttackFrames === 50) {\n      this.player.tap(this.heroC.fetchPower());\n      this.heroC.heroAttackAnimation();\n      this.bossLayerC.takeDamage(this.heroC);\n    } else if (this.autoAttackFrames === 0) {\n      this.autoAttackFrames = 200;\n      this.player.tap(this.heroD.fetchPower());\n      this.heroD.heroAttackAnimation();\n      this.bossLayerC.takeDamage(this.heroD);\n    }\n\n    \n\n\n    // temporary stat display\n    this.player.drawTapPower(this.context);\n\n    // main canvas parallax draw\n    this.hill.draw();\n    this.sky.draw();\n    this.cloudLayerA.draw();\n    this.cloudLayerC.draw();\n    this.mountains.draw();\n    this.backgroundMountains.draw();\n\n    // this.heroA.draw();\n\n    this.gameCanvas.focus();\n    \n\n    // party canvas draw\n    this.heroA.draw('a');\n    this.heroB.draw('b');\n    this.heroC.draw('c');\n    this.heroD.draw('d');\n\n    // boss draw\n    this.bossLayerC.draw();\n\n\n\n\n  }\n\n  drawPartyFrames() {\n    requestAnimationFrame(this.drawPartyFrames);\n    this.heroA.draw('a');\n    this.heroB.draw('b');\n    this.heroC.draw('c');\n    this.heroD.draw('d');\n  }\n\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("console.log(\"Webpack is working!\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function() {\n  const gameCanvas = document.getElementById(\"game-canvas\");\n  const context = document.getElementById(\"game-canvas\").getContext('2d');\n\n  // environment contexts\n  const hill = document.getElementById('hill-canvas').getContext('2d');\n  const sky = document.getElementById('sky-canvas').getContext('2d');\n  const cloudLayerA = document.getElementById('cloud-layer-a-canvas').getContext('2d');\n  const cloudLayerC = document.getElementById('cloud-layer-c-canvas').getContext('2d');\n  const mountains = document.getElementById('mountains-canvas').getContext('2d');\n  const backgroundMountains = document.getElementById('background-mountains-canvas').getContext('2d');\n\n  // party UI contexts\n  const partyA = document.getElementById('party-member-canvas-a').getContext('2d');\n  const partyB = document.getElementById('party-member-canvas-b').getContext('2d');\n  const partyC = document.getElementById('party-member-canvas-c').getContext('2d');\n  const partyD = document.getElementById('party-member-canvas-d').getContext('2d');\n  const partyGroup = [partyA, partyB, partyC, partyD];\n\n  // enemy contexts\n  const bossLayerC = document.getElementById('boss-layer-c-canvas').getContext('2d');\n\n  const options = {\n    context: context,\n    gameCanvas: gameCanvas,\n    mountains: mountains,\n    backgroundMountains: backgroundMountains,\n    frontCloudLayer: cloudLayerA,\n    backCloudLayer: cloudLayerC,\n    hill: hill,\n    sky: sky,\n    frontBoss: bossLayerC,\n    partyUI: partyGroup\n    \n  };\n\n  const game = new Game(options);\n\n  game.draw();\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/party.js":
/*!**********************!*\
  !*** ./src/party.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Party {\n  \n\n  constructor(options) {\n    this.context = options.context;\n    this.image = options.idleImage;\n    this.heroAttackImage = options.attackImage;\n    this.heroPrepImage = options.prepImage;\n    this.keyDown = options.heroKeyDown;\n    this.keyUp = options.heroKeyUp;\n    this.x = 0;\n    this.y = options.startHeight;\n    this.srcWidth = options.srcWidth;\n    this.attackState = false;\n    this.height = this.context.canvas.height;\n    this.width = this.context.canvas.width;\n    this.attackFrames = 0;\n    this.attackPower = 1;\n    this.critChance = 5;\n    \n    console.log(this);\n    \n  }\n\n  changeSprite() {\n    console.log(this.image);\n  }\n\n  fetchPower() {\n    return this.attackPower;\n  }\n\n  upgradeStr() {\n    this.attackPower += 1;\n  }\n\n  heroAttackAnimation() {\n    this.attackFrames = 8;\n    this.attackState = true;\n  }\n\n  heroIdle() {\n    this.attackState = false;\n  }\n\n  draw() {\n    this.context.clearRect(0, 0, this.width, this.height);\n    \n    if (this.attackFrames === 0) {\n      this.context.drawImage(this.image, this.x, this.y);\n      this.context.drawImage(this.keyUp, 14, 55);\n    } else if (this.attackFrames > 0 ) {\n      this.drawAttack();\n      this.attackFrames -= 1;\n    }\n    this.drawStats();\n  }\n\n  drawAttack() {\n    // console.log(this.attackFrames);\n    if (this.attackFrames > 3)\n    {\n      this.context.drawImage(this.heroPrepImage, this.x, this.y);\n      this.context.drawImage(this.keyDown, 14, 55);\n    } else {\n      this.context.drawImage(this.heroAttackImage, this.x, this.y);\n      this.context.drawImage(this.keyDown, 14, 55);\n    }\n    \n  }\n\n  drawStats() {\n    const width = this.context.canvas.width;\n    const height = this.context.canvas.height;\n    const attackStat = `ATK ${this.attackPower}`;\n    const criticalStat = `CRIT ${this.critChance}%`;\n    this.context.font = \"10px Arial\";\n    this.context.fillStyle = 'white';\n    this.context.fillText(attackStat, 135, 20);\n    this.context.fillText(criticalStat, 135, 35);\n  }\n}\n\nmodule.exports = Party;\n\n\n//# sourceURL=webpack:///./src/party.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Player {\n  constructor() {\n    this.freeCurrency = 0;\n    this.premiumCurrency = 0;\n    this.passiveIncome = 1;\n\n    \n    setInterval(() => this.income(), 1000);\n  }\n\n  tap(value) {\n    // this.freeCurrency += value;\n    // console.log(`FREE CURRENCY ${this.freeCurrency}`);\n  }\n\n  income() {\n    this.freeCurrency += this.passiveIncome;\n  }\n\n  // upgradeTap(value) {\n  //   this.tapPower += value;\n  //   console.log(`${value} added to tap power (${this.tapPower})`);\n  // }\n\n  upgradeIncome(value) {\n    this.passiveIncome += value;\n    console.log(`${value} added to income (${this.passiveIncome})`);\n  }\n\n  addPremiumCurrency(value) {\n    this.premiumCurrency += value;\n  }\n\n  update(context) {\n    this.draw(context);\n  }\n\n  drawTapPower(context) {\n    const width = context.canvas.width;\n    const height = context.canvas.height;\n    context.clearRect(0, 0, width, height);\n    const freeCurrency = `${this.freeCurrency}`;\n    const passiveIncome = `Income: ${this.passiveIncome}`;\n\n    context.font = \"15px Arial\";\n    context.fillStyle = 'white';\n    context.fillText(freeCurrency, 30, 22);\n    // context.fillText(passiveIncome, 10, 60);\n    const freeCurrencyIcon = new Image();\n    freeCurrencyIcon.src = \"../assets/images/misc/gold-coin.png\";\n    context.drawImage(freeCurrencyIcon, 0, 0);\n  }\n\n\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/player.js?");

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

eval("const Tap = {\n  tapMethods(options) {\n    const tapHeroA = document.getElementById('party-member-canvas-a');\n    const tapHeroB = document.getElementById('party-member-canvas-b');\n    const tapHeroC = document.getElementById('party-member-canvas-c');\n    const tapHeroD = document.getElementById('party-member-canvas-d');\n\n    const player = options.player;\n    const heroA = options.heroA;\n    const heroB = options.heroB;\n    const heroC = options.heroC;\n    const heroD = options.heroD;\n    const boss = options.boss;\n    \n    tapHeroA.addEventListener('click', (e) => {\n      console.log(\"SDJFKLSD\")\n      player.tap(heroA.fetchPower());\n      heroA.heroAttackAnimation();\n      boss.takeDamage(heroA);\n    });\n\n    tapHeroB.addEventListener('click', (e) => {\n      player.tap(heroB.fetchPower());\n      heroB.heroAttackAnimation();\n      boss.takeDamage(heroB);\n    });\n\n    tapHeroC.addEventListener('click', (e) => {\n      player.tap(heroC.fetchPower());\n      heroC.heroAttackAnimation();\n      boss.takeDamage(heroC);\n    });\n\n    tapHeroD.addEventListener('click', (e) => {\n      player.tap(heroD.fetchPower());\n      heroD.heroAttackAnimation();\n      boss.takeDamage(heroD);\n    });\n\n  }\n\n  \n}\n\nmodule.exports = Tap;\n\n//# sourceURL=webpack:///./src/tap.js?");

/***/ })

/******/ });