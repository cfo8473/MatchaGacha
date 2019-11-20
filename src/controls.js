const Game = require('./game');

class Controls {
  constructor(game) {
    this.game = game;
    this.bindKeyHandlers();
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
        this.game.bossLayerC.takeDamage(this.game.heroA);
        break;
      case 's':
        this.game.heroB.heroAttackAnimation();
        this.game.bossLayerC.takeDamage(this.game.heroB);
        break;
      case 'd':
        this.game.heroC.heroAttackAnimation();
        this.game.bossLayerC.takeDamage(this.game.heroC);
        break;
      case 'f':
        this.game.heroD.heroAttackAnimation();
        this.game.bossLayerC.takeDamage(this.game.heroD);
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