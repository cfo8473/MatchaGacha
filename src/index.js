
const Game = require("./game.js");

document.addEventListener("DOMContentLoaded", function() {
  const gameCanvas = document.getElementById("game-canvas");
  const context = document.getElementById("game-canvas").getContext('2d');

  // ui contexts
  const menu = document.getElementById('menu-canvas').getContext('2d');

  // artifacts / limit breaks
  const limitBreak = document.getElementById('limit-break-canvas').getContext('2d');

  // environment contexts
  const hill = document.getElementById('hill-canvas').getContext('2d');
  const sky = document.getElementById('sky-canvas').getContext('2d');
  const fuji = document.getElementById('fuji-canvas').getContext('2d');
  const cloudLayerA = document.getElementById('cloud-layer-a-canvas').getContext('2d');
  const cloudLayerC = document.getElementById('cloud-layer-c-canvas').getContext('2d');
  const mountains = document.getElementById('mountains-canvas').getContext('2d');
  const backgroundMountains = document.getElementById('background-mountains-canvas').getContext('2d');

  // party UI contexts
  const partyA = document.getElementById('party-member-canvas-a').getContext('2d');
  const partyB = document.getElementById('party-member-canvas-b').getContext('2d');
  const partyC = document.getElementById('party-member-canvas-c').getContext('2d');
  const partyD = document.getElementById('party-member-canvas-d').getContext('2d');
  const partyGroup = [partyA, partyB, partyC, partyD];

  // enemy contexts
  const bossLayerC = document.getElementById('boss-layer-c-canvas').getContext('2d');
  
  const options = {
    context: context,
    gameCanvas: gameCanvas,
    mountains: mountains,
    backgroundMountains: backgroundMountains,
    frontCloudLayer: cloudLayerA,
    backCloudLayer: cloudLayerC,
    hill: hill,
    sky: sky,
    fuji: fuji,
    frontBoss: bossLayerC,
    partyUI: partyGroup,
    menu: menu,
    limitBreak: limitBreak
    
  };

  const game = new Game(options);

  game.draw();
})