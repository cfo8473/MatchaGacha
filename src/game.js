const Player = require('./player');
const Tap = require('./tap');
const Scroller = require('./scroller');

class Game {
  constructor(
            context,
            gameCanvas, 
            mountainsContext, 
            backgroundMountainsContext,
            cloudLayerContextA, 
            cloudLayerContextC, 
            hillContext,
            skyContext
            ) 
    {
      this.context = context;
      this.gameCanvas = gameCanvas;
      this.gameCanvas.setAttribute("tabindex", 0);
      
      this.player = new Player();

      this.bindKeyHandlers();
      this.keyboardTap = this.keyboardTap.bind(this);
    
      // Tap.tapMethods(this.player);

      this.draw = this.draw.bind(this);
      this.drawBackground(
        hillContext,
        skyContext,
        mountainsContext,
        backgroundMountainsContext,
        cloudLayerContextA,
        cloudLayerContextC
      );

  }

  bindKeyHandlers() {
    this.gameCanvas.addEventListener('keydown', (e) => this.keyboardTap(e));

  }

  keyboardTap(e) {
    if (e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === 'f') {
      this.player.tap();
    }

    if (e.key === 'r') {
      this.player.upgradeTap(1);
    }

    if (e.key === 't') {
      this.player.upgradeIncome(1);
    }
  }

  drawBackground(
    hillContext,
    skyContext,
    mountainsContext, 
    backgroundMountainsContext,
    cloudLayerContextA,
    cloudLayerContextC,
    ) {

      const hill = new Image();
      const sky = new Image();
      const mountains = new Image();
      const backgroundMountains = new Image();
      const cloudLayerA = new Image();
      const cloudLayerC = new Image();
    
      hill.src = "../assets/images/layers/hill.png";
      sky.src = "../assets/images/layers/sky_fc.png";
      mountains.src = '../assets/images/layers/grassy_mountains_fc.png';
      backgroundMountains.src = '../assets/images/layers/far_mountains_fc.png';
      cloudLayerA.src = '../assets/images/layers/clouds_front_fc.png';
      cloudLayerC.src = '../assets/images/layers/clouds_mid_fc.png';
    
      this.hill = new Scroller(hillContext, hill, -8, 384, 0);
      this.sky = new Scroller(skyContext, sky, -5, 384, 0);
      this.mountains = new Scroller(mountainsContext, mountains, -15, 384, 0.2);
      this.backgroundMountains = new Scroller(backgroundMountainsContext, backgroundMountains, -15, 384, 0.3);
      this.cloudLayerA = new Scroller(cloudLayerContextA, cloudLayerA, 0, 384, 0.2);
      this.cloudLayerC = new Scroller(cloudLayerContextC, cloudLayerC, -10, 384, 0.6)
  }

  draw() {
    requestAnimationFrame(this.draw);
    // temporary stat display
    this.player.drawTapPower(this.context);
    this.hill.draw();
    this.sky.draw();
    this.cloudLayerA.draw();
    this.cloudLayerC.draw();
    this.mountains.draw();
    this.backgroundMountains.draw();
    this.gameCanvas.focus();
  }

}

module.exports = Game;