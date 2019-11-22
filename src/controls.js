const Game = require('./game');
const DongDong = require('./bosses/dongdong');
const Alishar = require('./bosses/alishar');
const Lootbox = require('./bosses/lootbox');

class Controls {
  constructor(game) {
    this.game = game;
    this.bindKeyHandlers();
    let bossLayerIndex;
  }

  bindKeyHandlers() {
    this.game.gameCanvas.addEventListener('keydown', (e) => this.keyboardTap(e));
    this.game.gameCanvas.addEventListener('keyup', (e) => this.keyboardTapRelease(e));
  }

  keyboardTap(e) {
    if (e.repeat) { return }
    switch (e.key) {
      case 'a':
        this.game.heroA.heroAttackAnimation();
        this.game.boss.takeDamage(this.game.heroA);
        break;
      case 's':
        this.game.heroB.heroAttackAnimation();
        this.game.boss.takeDamage(this.game.heroB);
        break;
      case 'd':
        this.game.heroC.heroAttackAnimation();
        this.game.boss.takeDamage(this.game.heroC);
        break;
      case 'f':
        this.game.heroD.heroAttackAnimation();
        this.game.boss.takeDamage(this.game.heroD);
        break;
      case 'h':
        return this.game.menu.toggleMenu();
      case 'z':
        return this.game.heroA.upgradeStr();
      case 'x':
        return this.game.heroB.upgradeStr();
      case 'c':
        return this.game.heroC.upgradeStr();
      case 'v':
        return this.game.heroD.upgradeStr();
      //debug keys
      case 'p':
        return console.log(this.game.boss);
      case 'j':
        // this.game.bossDeath();
        this.game.boss = new DongDong(this.game, this.game.options.frontBoss);
        break;
      case 'k':
        // this.game.bossDeath();
        return this.game.boss = new Alishar(this.game, this.game.options.frontBoss);
      case 'l':
        // this.game.boss Death();
        return this.game.boss = new Lootbox(this.game, this.game.options.frontBoss);

      case 'q':
        // document.getElementById("limit-break-canvas").style.zIndex = "9999";
        document.getElementById("limit-break-canvas").style.zIndex = "9";
        this.game.callLimitBreak("rage");
        break;
      case 'w':
        let bossLayerIndex = parseInt(document.getElementById("boss-layer-c-canvas").style.zIndex);
        document.getElementById("limit-break-canvas").style.zIndex = bossLayerIndex;
        this.game.callLimitBreak("drizzle");
        break
      case 'e':
        document.getElementById("limit-break-canvas").style.zIndex = 1544;
        this.game.callLimitBreak("omni");
        break
      case 'r':

        document.getElementById("limit-break-canvas").style.zIndex = 1544;
        this.game.callLimitBreak("sun");
        break
      
        
    }
  }

  keyboardTapRelease(e) {
    switch (e.key) {
      case 'a':
        this.game.heroA.heroIdle();
        break;
      case 's':
        this.game.heroB.heroIdle();
        break;
      case 'd':
        this.game.heroC.heroIdle();
        break;
      case 'f':
        this.game.heroD.heroIdle();
        break;
    }
  }
}

module.exports = Controls;