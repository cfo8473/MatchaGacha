const dongDongSizes = {
  RUN_RIGHT_WIDTH: 393,
  RUN_RIGHT_HEIGHT: 342,
  RUN_LEFT_WIDTH: 545,
  RUN_LEFT_HEIGHT: 885,
  PHASE_WIDTH: 761,
  PHASE_HEIGHT: 1200,
  DEAD_WIDTH: 925,
  DEAD_HEIGHT: 1600,
}

const DmgText = require('../damage');

class LootBox {
  constructor(game, bossCanvas) {
    this.maxHitPoints = game.level * game.monsterBaseHP;
    this.hitPoints = this.maxHitPoints;
    this.x = 400;
    this.y = -30;
    this.bossFrames = 0;
    this.canvas = bossCanvas;
    this.canvasWidth = 768;
    this.frameRate = 5;
    this.game = game;
    this.speed = 2;
    this.image = new Image();
    this.image.src = './assets/images/characters/bosses/lootbox/lootbox.png';
    this.width = dongDongSizes.RUN_LEFT_WIDTH;
    this.height = dongDongSizes.RUN_LEFT_HEIGHT;


    this.flyUp = true;
    this.flySpeed = this.speed;
    this.shiftValue = this.speed;
    this.phase = 1;
    this.phaseFrames = 0;
    this.step = 0;
    this.frame = 0;
    this.deathStatus = false;
    this.deathFrames = 400;

  }

  takeDamage(partyMember) {
    this.bossFrames = 1;
    if (Math.random() >= (1 - (partyMember.critChance * 0.01))) {
      this.hitPoints -= partyMember.attackPower * 2;
      let damageText = new DmgText(this.game, partyMember.attackPower * 2, true);

      this.game.damageTexts.push(damageText);
    } else {
      this.hitPoints -= partyMember.attackPower;
      let damageText = new DmgText(this.game, partyMember.attackPower, false);

      this.game.damageTexts.push(damageText);
    }
    if (this.hitPoints <= 0 ) {
      this.death();
    }
    // debug death

    // console.log(this.hitPoints);
  }

  takeDamageLimitBreak(heroDamage, critChance) {
    this.hitPoints -= heroDamage;
    let damageText;
    if (Math.random() >= (1 - (critChance * 0.01))) {
      // console.log("JKLDFSDS");
      damageText = new DmgText(this.game, (heroDamage * 1.5), true);
    } else {
      damageText = new DmgText(this.game, heroDamage, false);
    }
    this.game.damageTexts.push(damageText);

  }

  hpPercentage() {
    let currentHpPercentage = (this.hitPoints / this.maxHitPoints);
    if (currentHpPercentage >= 0) {
      return currentHpPercentage;
    } else
      return 0;
  }

  death() {
    this.game.bossDeath();
    this.deathStatus = true;
    // temporary deaththis.game.bossDeath();

    this.game.player.freeCurrency += 4000;
  }

  update() {

    this.step += 1;

    if (this.step > this.frameRate) {
      this.step = 0;
      this.frame += 1;
    }

    if (this.frame > 7) {
      this.frame = 0;
    }

  }

  deathAnimation() {
    // console.log(this.deathFrames);
    this.deathFrames -= 1;
    document.getElementById("boss-layer-c-canvas").style.zIndex = "6";
    this.image.src = './assets/images/characters/bosses/dongdong/dong-dong-dead.png';
    this.frameRate = 55;
    // console.log(this.x);
    this.width = dongDongSizes.DEAD_WIDTH;
    this.height = dongDongSizes.DEAD_HEIGHT;
    this.y = -54;

    if (this.deathFrames <= 0) {
      this.game.bossDeath();
      this.deathFrames = 0;

    }

  }

  shift() {
    // console.log(this.phase);
    if (this.phase === 2) {
      this.image.src = './assets/images/characters/bosses/lootbox/lootbox-phase.png';
      if (this.phaseFrames <= 400) {
        if (this.x >= 160) {
          this.x -= 1;

        }
        this.phaseFrames += 1;
        this.speed = 0;
        this.y -= 0.5;
      } else {
        this.phase = 0;
        this.speed = 2;
        this.phaseFrames = 0;
      }
      
    } else {
      
      let shiftValue = this.flySpeed;
      if (this.y <= 10) {
        this.flyUp = true;
      }
      else if (this.y >= 85) {
        this.flyUp = false;
      }

      if (this.flyUp === true) {
        this.y += shiftValue;
      } else if (this.flyUp === false) {
        this.y -= shiftValue;
      }

      this.x -= this.speed;
      if (this.x >= 400) {
        this.image.src = './assets/images/characters/bosses/lootbox/lootbox.png';
        this.speed = -(this.speed)
        this.phase += 1;
      }
      else if (this.x <= -25) {
        this.image.src = './assets/images/characters/bosses/lootbox/lootbox-right.png';
        this.speed = -(this.speed)
      }
    }
    
  }



  draw() {
    this.update();
    this.shift();
    this.canvas.clearRect(0, 0, 800, 800);
    this.canvas.save();

    this.canvas.drawImage(
      this.image,
      this.width * this.frame,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.canvas.restore();
  }
}

module.exports = LootBox;
