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


  const game = new Game(
    canvasContext, 
    gameCanvas, 
    mountainsCanvasContext,
    backgroundMountainsCanvasContext,
    cloudLayerContextA,
    cloudLayerContextC,
    hillContext,
    skyContext,
    
  );
  game.draw();
  
  // const gameView = new GameView(game, context);
})