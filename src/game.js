const Player = require('./player');
const Tap = require('./tap');
const Scroller = require('./scroller');
const Party = require('./party');
const Boss = require('./boss');
const Controls = require('./controls');
const Menu = require('./menu');




//bosses
const DongDong = require('./bosses/dongdong');
const Alishar = require('./bosses/alishar');
// const Rage = require('./bosses/rage');
const Lion = require('./bosses/lion');
const Lootbox = require('./bosses/lootbox');

//limit breaks
const TeaDrizzle = require('./artifacts/teadrizzle');
const CaffeineRage = require('./artifacts/caffeinerage');
const Omnibag = require('./artifacts/omnibag');
const TeaSun = require('./artifacts/teasun');
const TeaPaw = require('./artifacts/teapaw');


class Game {
  constructor(options)  {
    this.options = options;
    this.context = options.context;
    this.gameCanvas = options.gameCanvas;
    this.gameCanvas.setAttribute("tabindex", 0);
    const { partyUI } = options;
    this.level = 1;
    this.monsterBaseHP = 1000;
    this.damageTexts = [];
    this.limitBreak = null;

    this.autoAttackSpeed = 1;
    this.menu = new Menu(this, options.menu);
    
    this.player = new Player();

    this.controls = new Controls(this);

    this.draw = this.draw.bind(this);

    this.drawBackground(options);
    this.drawParty(partyUI[0], partyUI[1], partyUI[2], partyUI[3]);

    // this.initializeBosses(options);
  
    // this.randomBoss(options);
    this.boss = new DongDong(this, options.frontBoss);
    

    Tap.tapMethods({
      player: this.player,
      heroA: this.heroA,
      heroB: this.heroB,
      heroC: this.heroC,
      heroD: this.heroD,
      boss: this.bossLayerC
    });


    // limiting frame rate
    this.fps = 60;
    this.now;
    this.then = Date.now();
    this.interval = 1000/this.fps;
    this.delta;
  }

  randomBoss(options) {
    let random = Math.floor((Math.random() * 3) + 1);
    this.level += 1;
    if (this.level % 5 === 0 ) {
      this.monsterBaseHP * 1.20;
    }

    switch (random) {
      case 1:
        document.getElementById("boss-layer-c-canvas").style.zIndex = "5"; 
        this.boss = new DongDong(this, options.frontBoss);
        break
      case 2:
        document.getElementById("boss-layer-c-canvas").style.zIndex = "2";
        this.boss = new Alishar(this, options.frontBoss);
        break
      // case 3:
      //   document.getElementById("boss-layer-c-canvas").style.zIndex = "9";
      //   this.boss = new Rage(this, options.frontBoss);
      //   break
      case 3:
        document.getElementById("boss-layer-c-canvas").style.zIndex = "8";
        this.boss = new Lootbox(this, options.frontBoss);
        break
    }
  }

  initializeBosses(options) {
    this.dongdong = new DongDong(this, options.frontBoss);
    this.alishar = new Alishar(this, options.frontBoss);
  }

  callLimitBreak(limitBreakName) {
    document.getElementById("limit-break-canvas").style.width = `768`;
    if (this.limitBreak === null ) {
      switch (limitBreakName) {
        case 'rage':
          if (this.heroA.limitBreakFrames === 40) {
            this.heroA.limitBreakFrames = 0;
            this.limitBreak = new CaffeineRage(this, this.options.limitBreak);
          }
          
          break;
        case 'drizzle':
          if (this.heroB.limitBreakFrames === 40) {
            this.heroB.limitBreakFrames = 0;
            this.limitBreak = new TeaDrizzle(this, this.options.limitBreak);
          }
          break;
        case 'omni':
          if (this.heroC.limitBreakFrames === 40) {
            this.heroC.limitBreakFrames = 0;
            this.limitBreak = new Omnibag(this, this.options.limitBreak);
          }
          break;
        case 'sun':
          if (this.heroD.limitBreakFrames === 40) {
            this.heroD.limitBreakFrames = 0;
            this.limitBreak = new TeaPaw(this, this.options.limitBreak);
          }
          
          break;
      }
    }
   

  }

  removeLimitBreak() {
    document.getElementById("limit-break-canvas").style.width = `768`;
    let oldLimitBreak = this.limitBreak;
    oldLimitBreak = null;
    this.limitBreak = null;
  }

  bossDeath() {
    //testing, not DRY
    // delete this.dongdong;
    let oldBoss = this.boss;
    oldBoss = null;
    this.boss = null;

    this.player.freeCurrency += (this.level * 1000);

    this.randomBoss(this.options);
  }

  

  drawBackground(options) {
    const hill = new Image();
    const sky = new Image();
    const fuji = new Image();
    const mountains = new Image();
    const backgroundMountains = new Image();
    const cloudLayerA = new Image();
    const cloudLayerC = new Image();

    const bossLayerC = new Image();
  
    // hill.src = "./assets/images/layers/smallhill.png";
    // dist / assets / images / layers / hill.png
    hill.src = "./assets/images/layers/hill.png";
    sky.src = "./assets/images/layers/sky_fc.png";
    fuji.src = "./assets/images/layers/fuji.png";
    mountains.src = './assets/images/layers/grassy_mountains_fc.png';
    backgroundMountains.src = './assets/images/layers/far_mountains_fc.png';
    cloudLayerA.src = './assets/images/layers/clouds_front_fc.png';
    cloudLayerC.src = './assets/images/layers/clouds_mid_fc.png';
    bossLayerC.src = './assets/images/characters/bosses/mana-beast-idle.png';
  

    this.hill = new Scroller(options.hill, hill, -8, 768, 0);
    this.sky = new Scroller(options.sky, sky, -5, 768, 0);
    this.fuji = new Scroller(options.fuji, fuji, 24, 1468, 0.1);
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
    heroIdleA.src = "./assets/images/characters/hero/lufia-a-idle.png";
    heroIdleB.src = "./assets/images/characters/hero/lufia-b-idle.png";
    heroIdleC.src = "./assets/images/characters/hero/lufia-c-idle.png";
    heroIdleD.src = "./assets/images/characters/hero/lufia-d-idle.png";

    const heroPrepA = new Image();
    const heroPrepB = new Image();
    const heroPrepC = new Image();
    const heroPrepD = new Image();
    heroPrepA.src = "./assets/images/characters/hero/lufia-a-prep.png";
    heroPrepB.src = "./assets/images/characters/hero/lufia-b-prep.png";
    heroPrepC.src = "./assets/images/characters/hero/lufia-c-prep.png";
    heroPrepD.src = "./assets/images/characters/hero/lufia-d-prep.png";

    const heroAttackA = new Image();
    const heroAttackB = new Image();
    const heroAttackC = new Image();
    const heroAttackD = new Image();
    heroAttackA.src = "./assets/images/characters/hero/lufia-a-attack.png";
    heroAttackB.src = "./assets/images/characters/hero/lufia-b-attack.png";
    heroAttackC.src = "./assets/images/characters/hero/lufia-c-attack.png";
    heroAttackD.src = "./assets/images/characters/hero/lufia-d-attack.png";

    const heroKeyDownA = new Image();
    const heroKeyDownB = new Image();
    const heroKeyDownC = new Image();
    const heroKeyDownD = new Image();
    heroKeyDownA.src = "./assets/images/keys/a-down.png";
    heroKeyDownB.src = "./assets/images/keys/s-down.png";
    heroKeyDownC.src = "./assets/images/keys/d-down.png";
    heroKeyDownD.src = "./assets/images/keys/f-down.png";

    const heroKeyUpA = new Image();
    const heroKeyUpB = new Image();
    const heroKeyUpC = new Image();
    const heroKeyUpD = new Image();
    heroKeyUpA.src = "./assets/images/keys/a-up.png";
    heroKeyUpB.src = "./assets/images/keys/s-up.png";
    heroKeyUpC.src = "./assets/images/keys/d-up.png";
    heroKeyUpD.src = "./assets/images/keys/f-up.png";

    const heroLimitUpA = new Image();
    const heroLimitUpB = new Image();
    const heroLimitUpC = new Image();
    const heroLimitUpD = new Image();
    heroLimitUpA.src = "./assets/images/keys/q.png";
    heroLimitUpB.src = "./assets/images/keys/w.png";
    heroLimitUpC.src = "./assets/images/keys/e.png";
    heroLimitUpD.src = "./assets/images/keys/r.png";

    let heroOptionsA = {
      context: partyA,
      idleImage: heroIdleA,
      prepImage: heroPrepA,
      attackImage: heroAttackA,
      heroKeyDown: heroKeyDownA,
      heroKeyUp: heroKeyUpA,
      heroLimitKey: heroLimitUpA,
      limitPos: 70,
    }

    let heroOptionsB = {
      context: partyB,
      idleImage: heroIdleB,
      prepImage: heroPrepB,
      attackImage: heroAttackB,
      heroKeyDown: heroKeyDownB,
      heroKeyUp: heroKeyUpB,
      heroLimitKey: heroLimitUpB,
      limitPos: 250,
    }

    let heroOptionsC = {
      context: partyC,
      idleImage: heroIdleC,
      prepImage: heroPrepC,
      attackImage: heroAttackC,
      heroKeyDown: heroKeyDownC,
      heroKeyUp: heroKeyUpC,
      heroLimitKey: heroLimitUpC,
      limitPos: 440,
    }

    let heroOptionsD = {
      context: partyD,
      idleImage: heroIdleD,
      prepImage: heroPrepD,
      attackImage: heroAttackD,
      heroKeyDown: heroKeyDownD,
      heroKeyUp: heroKeyUpD,
      heroLimitKey: heroLimitUpD,
      limitPos: 650,
    }
    
    this.heroA = new Party(this, heroOptionsA, 180);
    this.heroB = new Party(this, heroOptionsB, 120);
    this.heroC = new Party(this, heroOptionsC, 60);
    this.heroD = new Party(this, heroOptionsD, 0);
    this.autoAttackFrames = 200;
  }


  draw() {
    requestAnimationFrame(this.draw);

    this.gameCanvas.focus();

    this.now = Date.now();
    this.delta = this.now - this.then;

    if ( this.delta > this.interval ) {
      this.player.drawTapPower(this.context);

      // main canvas parallax draw
      this.hill.draw();
      this.sky.draw();
      this.fuji.draw();
      this.cloudLayerA.draw();
      this.cloudLayerC.draw();
      this.mountains.draw();
      this.backgroundMountains.draw();

      if (this.damageTexts.length > 0) {
        this.damageTexts.forEach(dmgText => {
          dmgText.draw();
          if (dmgText.textFrames <= 0) {
            this.damageTexts.shift();
            dmgText = null;
          }
        });
      }

      // party canvas draw
      this.heroA.draw('a');
      this.heroB.draw('b');
      this.heroC.draw('c');
      this.heroD.draw('d');

      // boss draw
      // this.bossLayerC.draw();
      this.boss.draw();

      //artifacts
      if (this.limitBreak) {
        this.limitBreak.draw();
      }

      //menu
      if (this.menu.open) {
        this.menu.draw();
      }

      if (this.boss) {
        const currentHp = this.boss.hpPercentage();
        this.context.strokeStyle = "rgba(0, 0, 0, 0.4)";
        this.context.rect(125, 26, 550, 24);

        //hp bar background
        this.context.fillStyle = "rgba(222, 0, 0, 0.7)";
        this.context.stroke();
        this.context.fillRect(126, 26.5, (549.5 * currentHp), 24);

        this.context.fillStyle = "rgba(0, 0, 0, 0.4)";
        this.context.stroke();
        this.context.fillRect(126 + (549.5 * currentHp), 26.5, (549.5 - (549.5 * currentHp)), 24);

        this.context.font = "15px Arial";
        this.context.fillStyle = "white";
        (this.boss.hitPoints >= 0) ?
          this.context.fillText(`${this.boss.hitPoints} / ${this.boss.maxHitPoints}`, 544, 47) :
          this.context.fillText(`0 / ${this.boss.maxHitPoints}`, 254, 47);


      }

      this.then = this.now - (this.delta % this.interval);

    }
  }

}

module.exports = Game;