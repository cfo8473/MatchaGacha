const Player = require('./player');
const Tap = require('./tap');
const Scroller = require('./scroller');
const Party = require('./party');
const Boss = require('./boss');

class Game {
  constructor(
            context,
            gameCanvas, 
            mountainsContext, 
            backgroundMountainsContext,
            cloudLayerContextA, 
            cloudLayerContextC, 
            hillContext,
            skyContext,
            partyCanvasGroupContext,
            bossLayerContextC
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
      this.drawPartyFrames = this.drawPartyFrames.bind(this);

      this.drawBackground(
        hillContext,
        skyContext,
        mountainsContext,
        backgroundMountainsContext,
        cloudLayerContextA,
        cloudLayerContextC,
        bossLayerContextC
      );

      this.drawParty(
        partyCanvasGroupContext[0],
        partyCanvasGroupContext[1],
        partyCanvasGroupContext[2],
        partyCanvasGroupContext[3],
      )


  }

  bindKeyHandlers() {
    this.gameCanvas.addEventListener('keydown', (e) => this.keyboardTap(e));
    this.gameCanvas.addEventListener('keyup', (e) => this.keyboardTapRelease(e));

  }

  keyboardTap(e) {
    if (e.repeat) { return }
    switch(e.key) {
      case 'a':
        this.player.tap(this.heroA.fetchPower());
        this.heroA.heroAttackAnimation();
        this.bossLayerC.takeDamage(this.heroA);
        break;
      case 's':
        this.player.tap(this.heroB.fetchPower());
        this.heroB.heroAttackAnimation();
        this.bossLayerC.takeDamage(this.heroB);
        break;
      case 'd':
        this.player.tap(this.heroC.fetchPower());
        this.heroC.heroAttackAnimation();
        this.bossLayerC.takeDamage(this.heroC);
        break;
      case 'f':
        this.player.tap(this.heroD.fetchPower());
        this.heroD.heroAttackAnimation();
        this.bossLayerC.takeDamage(this.heroD);
        break;
      case 'z':
        return this.heroA.upgradeStr();
      case 'x':
        return this.heroB.upgradeStr();
      case 'c':
        return this.heroC.upgradeStr();
      case 'v':
        return this.heroD.upgradeStr();
      }
  }

  keyboardTapRelease(e) {
    if (e.repeat) { return }
    switch (e.key) {
      case 'a':
        // this.heroA.heroIdle();
        break;
      case 's':
        this.heroB.heroIdle();
        break;
      case 'd':
        this.heroC.heroIdle();
        break;
      case 'f':
        this.heroD.heroIdle();
        break;
    }
  }

  drawBackground(
    hillContext,
    skyContext,
    mountainsContext, 
    backgroundMountainsContext,
    cloudLayerContextA,
    cloudLayerContextC,
    bossLayerContextC
    ) {

      const hill = new Image();
      const sky = new Image();
      const mountains = new Image();
      const backgroundMountains = new Image();
      const cloudLayerA = new Image();
      const cloudLayerC = new Image();

      const bossLayerC = new Image();
    
      hill.src = "../assets/images/layers/hill.png";
      sky.src = "../assets/images/layers/sky_fc.png";
      mountains.src = '../assets/images/layers/grassy_mountains_fc.png';
      backgroundMountains.src = '../assets/images/layers/far_mountains_fc.png';
      cloudLayerA.src = '../assets/images/layers/clouds_front_fc.png';
      cloudLayerC.src = '../assets/images/layers/clouds_mid_fc.png';
      bossLayerC.src = '../assets/images/characters/bosses/mana-beast-idle.png';
    
      this.hill = new Scroller(hillContext, hill, -8, 768, 0);
      this.sky = new Scroller(skyContext, sky, -5, 768, 0);
      this.mountains = new Scroller(mountainsContext, mountains, -15, 768, 0.2);
      this.backgroundMountains = new Scroller(backgroundMountainsContext, backgroundMountains, -15, 768, 0.3);
      this.cloudLayerA = new Scroller(cloudLayerContextA, cloudLayerA, 0, 768, 0.2);
      this.cloudLayerC = new Scroller(cloudLayerContextC, cloudLayerC, -10, 768, 0.6)
      this.bossLayerC = new Boss(bossLayerContextC, bossLayerC, 110, 768, 0.2, this.player)
  }

  drawParty(partyAContext, partyBContext, partyCContext, partyDContext) {
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
      context: partyAContext,
      idleImage: heroIdleA,
      prepImage: heroPrepA,
      attackImage: heroAttackA,
      heroKeyDown: heroKeyDownA,
      heroKeyUp: heroKeyUpA,
      startHeight: 5,
      srcWidth: 95
    }

    let heroOptionsB = {
      context: partyBContext,
      idleImage: heroIdleB,
      prepImage: heroPrepB,
      attackImage: heroAttackB,
      heroKeyDown: heroKeyDownB,
      heroKeyUp: heroKeyUpB,
      startHeight: 5,
      srcWidth: 95
    }

    let heroOptionsC = {
      context: partyCContext,
      idleImage: heroIdleC,
      prepImage: heroPrepC,
      attackImage: heroAttackC,
      heroKeyDown: heroKeyDownC,
      heroKeyUp: heroKeyUpC,
      startHeight: 5,
      srcWidth: 95
    }

    let heroOptionsD = {
      context: partyDContext,
      idleImage: heroIdleD,
      prepImage: heroPrepD,
      attackImage: heroAttackD,
      heroKeyDown: heroKeyDownD,
      heroKeyUp: heroKeyUpD,
      startHeight: 5,
      srcWidth: 95
    }
    
    this.heroA = new Party(heroOptionsA);
    this.heroB = new Party(heroOptionsB);
    this.heroC = new Party(heroOptionsC);
    this.heroD = new Party(heroOptionsD);
    this.autoAttackFrames = 200;
  }


  draw() {
    requestAnimationFrame(this.draw);
  
    this.autoAttackFrames -= 1;
    //debug auto
    if (this.autoAttackFrames === 150) {
      this.player.tap(this.heroA.fetchPower());
      this.heroA.heroAttackAnimation();
      this.bossLayerC.takeDamage(this.heroA);
    } else if (this.autoAttackFrames === 100) {
      this.player.tap(this.heroB.fetchPower());
      this.heroB.heroAttackAnimation();
      this.bossLayerC.takeDamage(this.heroB);
    } else if (this.autoAttackFrames === 50) {
      this.player.tap(this.heroC.fetchPower());
      this.heroC.heroAttackAnimation();
      this.bossLayerC.takeDamage(this.heroC);
    } else if (this.autoAttackFrames === 0) {
      this.autoAttackFrames = 200;
      this.player.tap(this.heroD.fetchPower());
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

    // this.heroA.draw();

    this.gameCanvas.focus();
    

    // party canvas draw
    this.heroA.draw('a');
    this.heroB.draw('b');
    this.heroC.draw('c');
    this.heroD.draw('d');

    // boss draw
    this.bossLayerC.draw();




  }

  drawPartyFrames() {
    requestAnimationFrame(this.drawPartyFrames);
    this.heroA.draw('a');
    this.heroB.draw('b');
    this.heroC.draw('c');
    this.heroD.draw('d');
  }

}

module.exports = Game;