console.log("Webpack is working!");
const Game = require("./game.js");

document.addEventListener("DOMContentLoaded", function() {
  const gameCanvas = document.getElementById("game-canvas");
  const canvasContext = gameCanvas.getContext("2d");

  const hill = document.getElementById('hill-canvas');
  const hillContext = hill.getContext('2d');

  const sky = document.getElementById('sky-canvas');
  const skyContext = sky.getContext('2d');

  const cloudLayerCanvasA = document.getElementById('cloud-layer-a-canvas');
  const cloudLayerContextA = cloudLayerCanvasA.getContext('2d');

  const cloudLayerCanvasC = document.getElementById('cloud-layer-c-canvas');
  const cloudLayerContextC = cloudLayerCanvasC.getContext('2d');

  const mountainsCanvas = document.getElementById('mountains-canvas');
  const mountainsCanvasContext = mountainsCanvas.getContext('2d');

  const backgroundMountainsCanvas = document.getElementById('background-mountains-canvas');
  const backgroundMountainsCanvasContext = backgroundMountainsCanvas.getContext('2d');

  const partyCanvasA = document.getElementById('party-member-canvas-a');
  const partyCanvasContextA = partyCanvasA.getContext('2d');

  const partyCanvasB = document.getElementById('party-member-canvas-b');
  const partyCanvasContextB = partyCanvasB.getContext('2d');

  const partyCanvasC = document.getElementById('party-member-canvas-c');
  const partyCanvasContextC = partyCanvasC.getContext('2d');

  const partyCanvasD = document.getElementById('party-member-canvas-d');
  const partyCanvasContextD = partyCanvasD.getContext('2d');

  const partyCanvasGroup = [partyCanvasContextA, partyCanvasContextB, partyCanvasContextC, partyCanvasContextD];

  const bossLayerCanvasC = document.getElementById('boss-layer-c-canvas');
  const bossLayerContextC = bossLayerCanvasC.getContext('2d');


  const game = new Game(
    canvasContext, 
    gameCanvas, 
    mountainsCanvasContext,
    backgroundMountainsCanvasContext,
    cloudLayerContextA,
    cloudLayerContextC,
    hillContext,
    skyContext,
    partyCanvasGroup,
    bossLayerContextC
  );
  game.draw();
  
  // const gameView = new GameView(game, context);
})