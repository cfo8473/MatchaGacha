const Player = require('./player');
const Tap = require('./tap');
const Scroller = require('./scroller');
const Party = require('./party');
const Boss = require('./boss');
const Controls = require('./controls');
const Menu = require('./menu');

class Game {
  constructor(options)  {
    this.context = options.context;
    this.gameCanvas = options.gameCanvas;
    this.gameCanvas.setAttribute("tabindex", 0);
    const { partyUI } = options;

    this.menu = new Menu(this, options.menu);
    
    this.player = new Player();

    this.controls = new Controls(this);

    this.draw = this.draw.bind(this);

    this.drawBackground(options);
    this.drawParty(partyUI[0], partyUI[1], partyUI[2], partyUI[3]);

    Tap.tapMethods({
      player: this.player,
      heroA: this.heroA,
      heroB: this.heroB,
      heroC: this.heroC,
      heroD: this.heroD,
      boss: this.bossLayerC
    });
  }

  drawBackground(options) {
    const hill = new Image();
    const sky = new Image();
    const mountains = new Image();
    const backgroundMountains = new Image();
    const cloudLayerA = new Image();
    const cloudLayerC = new Image();

    const bossLayerC = new Image();
    console.log(hill);
  
    hill.src = "../assets/images/layers/hill.png";
    sky.src = "../assets/images/layers/sky_fc.png";
    mountains.src = '../assets/images/layers/grassy_mountains_fc.png';
    backgroundMountains.src = '../assets/images/layers/far_mountains_fc.png';
    cloudLayerA.src = '../assets/images/layers/clouds_front_fc.png';
    cloudLayerC.src = '../assets/images/layers/clouds_mid_fc.png';
    bossLayerC.src = '../assets/images/characters/bosses/mana-beast-idle.png';
  
    this.hill = new Scroller(options.hill, hill, -8, 768, 0);
    this.sky = new Scroller(options.sky, sky, -5, 768, 0);
    this.mountains = new Scroller(options.mountains, mountains, -15, 768, 0.2);
    this.backgroundMountains = new Scroller(options.backgroundMountains, backgroundMountains, -15, 768, 0.3);
    this.cloudLayerA = new Scroller(options.frontCloudLayer, cloudLayerA, 0, 768, 0.2);
    this.cloudLayerC = new Scroller(options.backCloudLayer, cloudLayerC, -10, 768, 0.6)
    this.bossLayerC = new Boss(options.frontBoss, bossLayerC, 110, 768, 0.2, this.player)
  }

  drawParty(partyA, partyB, partyC, partyD) {
    const heroIdleA = new Image();
    const heroIdleB = new Image();
    const heroIdleC = new Image();
    const heroIdleD = new Image();
    heroIdleA.src = "../assets/images/characters/hero/lufia-a-idle.png";
    heroIdleB.src = "../assets/images/characters/hero/lufia-b-idle.png";
    heroIdleC.src = "../assets/images/characters/hero/lufia-c-idle.png";
    heroIdleD.src = "../assets/images/characters/hero/lufia-d-idle.png";

    const heroPrepA = new Image();
    const heroPrepB = new Image();
    const heroPrepC = new Image();
    const heroPrepD = new Image();
    heroPrepA.src = "../assets/images/characters/hero/lufia-a-prep.png";
    heroPrepB.src = "../assets/images/characters/hero/lufia-b-prep.png";
    heroPrepC.src = "../assets/images/characters/hero/lufia-c-prep.png";
    heroPrepD.src = "../assets/images/characters/hero/lufia-d-prep.png";

    const heroAttackA = new Image();
    const heroAttackB = new Image();
    const heroAttackC = new Image();
    const heroAttackD = new Image();
    heroAttackA.src = "../assets/images/characters/hero/lufia-a-attack.png";
    heroAttackB.src = "../assets/images/characters/hero/lufia-b-attack.png";
    heroAttackC.src = "../assets/images/characters/hero/lufia-c-attack.png";
    heroAttackD.src = "../assets/images/characters/hero/lufia-d-attack.png";

    const heroKeyDownA = new Image();
    const heroKeyDownB = new Image();
    const heroKeyDownC = new Image();
    const heroKeyDownD = new Image();
    heroKeyDownA.src = "../assets/images/keys/a-down.png";
    heroKeyDownB.src = "../assets/images/keys/s-down.png";
    heroKeyDownC.src = "../assets/images/keys/d-down.png";
    heroKeyDownD.src = "../assets/images/keys/f-down.png";

    const heroKeyUpA = new Image();
    const heroKeyUpB = new Image();
    const heroKeyUpC = new Image();
    const heroKeyUpD = new Image();
    heroKeyUpA.src = "../assets/images/keys/a-up.png";
    heroKeyUpB.src = "../assets/images/keys/s-up.png";
    heroKeyUpC.src = "../assets/images/keys/d-up.png";
    heroKeyUpD.src = "../assets/images/keys/f-up.png";

    let heroOptionsA = {
      context: partyA,
      idleImage: heroIdleA,
      prepImage: heroPrepA,
      attackImage: heroAttackA,
      heroKeyDown: heroKeyDownA,
      heroKeyUp: heroKeyUpA,
    }

    let heroOptionsB = {
      context: partyB,
      idleImage: heroIdleB,
      prepImage: heroPrepB,
      attackImage: heroAttackB,
      heroKeyDown: heroKeyDownB,
      heroKeyUp: heroKeyUpB,
    }

    let heroOptionsC = {
      context: partyC,
      idleImage: heroIdleC,
      prepImage: heroPrepC,
      attackImage: heroAttackC,
      heroKeyDown: heroKeyDownC,
      heroKeyUp: heroKeyUpC,
    }

    let heroOptionsD = {
      context: partyD,
      idleImage: heroIdleD,
      prepImage: heroPrepD,
      attackImage: heroAttackD,
      heroKeyDown: heroKeyDownD,
      heroKeyUp: heroKeyUpD,
    }
    
    this.heroA = new Party(heroOptionsA);
    this.heroB = new Party(heroOptionsB);
    this.heroC = new Party(heroOptionsC);
    this.heroD = new Party(heroOptionsD);
    this.autoAttackFrames = 200;
  }


  draw() {
    requestAnimationFrame(this.draw);
    this.gameCanvas.focus();
  
    this.autoAttackFrames -= 1;
    //debug auto
    if (this.autoAttackFrames === 150) {
      this.heroA.heroAttackAnimation();
      this.bossLayerC.takeDamage(this.heroA);
    } else if (this.autoAttackFrames === 100) {
      this.heroB.heroAttackAnimation();
      this.bossLayerC.takeDamage(this.heroB);
    } else if (this.autoAttackFrames === 50) {
      this.heroC.heroAttackAnimation();
      this.bossLayerC.takeDamage(this.heroC);
    } else if (this.autoAttackFrames === 0) {
      this.autoAttackFrames = 200;
      this.heroD.heroAttackAnimation();
      this.bossLayerC.takeDamage(this.heroD);
    }

    

    // temporary stat display
    this.player.drawTapPower(this.context);

    // main canvas parallax draw
    this.hill.draw();
    this.sky.draw();
    this.cloudLayerA.draw();
    this.cloudLayerC.draw();
    this.mountains.draw();
    this.backgroundMountains.draw();

    
    
    // party canvas draw
    this.heroA.draw('a');
    this.heroB.draw('b');
    this.heroC.draw('c');
    this.heroD.draw('d');

    // boss draw
    this.bossLayerC.draw();

    //menu
    if (this.menu.open){
      this.menu.draw();
    }
    
  }

}

module.exports = Game;