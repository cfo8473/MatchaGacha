const SIZES = {
  RIGHT_WIDTH: 380,
  RIGHT_HEIGHT: 776,
  LEFT_WIDTH: 528,
  LEFT_HEIGHT: 776,
  CONFRONT_WIDTH: 980,
  CONFRONT_HEIGHT: 1000

}

const DmgText = require('../damage');

class Alishar {
  constructor(game, bossCanvas) {
    this.maxHitPoints = game.level * game.monsterBaseHP;
    this.hitPoints = this.maxHitPoints;
    this.x = 100;
    this.y = -80;
    this.bossFrames = 0;
    this.canvas = bossCanvas;
    this.canvasWidth = 768;
    this.frameRate = 4;
    this.game = game;
    this.speed = -3;
    this.image = new Image();
    this.image.src = '../assets/images/characters/bosses/alishar/alishar-right.png';
    this.width = SIZES.RIGHT_WIDTH,
    this.height = SIZES.RIGHT_HEIGHT

    this.frameUp = true;
    this.phase = 2;
    this.phaseFrames = 0;
    this.step = 0;
    this.frame = 0;
    this.deathStatus = false;
    this.deathFrames = 400;

  }

  takeDamage(partyMember) {
    this.bossFrames = 1;
    if (Math.random() >= (1 - (partyMember.critChance * 0.01))) {
      console.log("CRITICAL!")
      this.hitPoints -= partyMember.attackPower * 2;
      let damageText = new DmgText(this.game, partyMember.attackPower * 2, true);

      this.game.damageTexts.push(damageText);
    } else {
      this.hitPoints -= partyMember.attackPower;
      let damageText = new DmgText(this.game, partyMember.attackPower, false);

      this.game.damageTexts.push(damageText);
    }
    // debug death

    if (this.hitPoints <= 0) {
      this.death();
    }

    // console.log(this.hitPoints);
  }

  takeDamageLimitBreak(heroDamage, critChance) {
    this.hitPoints -= heroDamage;
    let damageText;
    if (Math.random() >= (1 - (critChance * 0.01))) {
      console.log("JKLDFSDS");
      damageText = new DmgText(this.game, (heroDamage * 1.5), true);
    } else {
      damageText = new DmgText(this.game, heroDamage, false);
    }
    this.game.damageTexts.push(damageText);
  }

  death() {

    this.deathStatus = true;
    // temporary death
    this.game.bossDeath();

    this.game.player.freeCurrency += 40000;
  }


  // shift() {
  //   let shiftValue = this.flySpeed;
  //   if (this.y <= 80) {
  //     this.flyUp = true;
  //   }
  //   else if (this.y >= 125) {
  //     this.flyUp = false;
  //   }

  //   if (this.flyUp === true) {
  //     this.y += shiftValue;
  //   } else if (this.flyUp === false) {
  //     this.y -= shiftValue;
  //   }
  // }

  update() {
    // console.log(this.frame);

    this.step += 1;

    if (this.frame > 6 ) {
      this.frameUp = false;
    } else if (this.frame === 0 ) {
      this.frameUp = true;
    }

    if (this.step > this.frameRate) {
      this.step = 0;
      if (this.frameUp) {
        this.frame += 1;
      } else {
        this.frame -= 1;
      }
   
    }


  }

  hpPercentage() {
    let currentHpPercentage = (this.hitPoints / this.maxHitPoints);
    if (currentHpPercentage >= 0) {
      return currentHpPercentage;
    } else
      return 0;
  }
  deathAnimation() {
    // console.log(this.deathFrames);
    this.deathFrames -= 1;
    document.getElementById("boss-layer-c-canvas").style.zIndex = "6";
    this.image.src = '../assets/images/characters/bosses/dongdong/dong-dong-dead.png';
    this.frameRate = 55;
    // console.log(this.x);
    this.width = dongDongSizes.DEAD_WIDTH;
    this.height = dongDongSizes.DEAD_HEIGHT;
    this.y = -54;

    if (this.deathFrames === 0) {
      this.game.bossDeath();

    }

  }

  shift() {
    // console.log(this.x)
    // console.log(this.phaseFrames);
    // console.log(this.phase);
    // console.log(this.deathStatus);
    // console.log(`HP: ${this.hitPoints}`);

    // console.log(this.image.src);
    if (this.phase === 3) {

      if (this.x <= -140) {
        this.x += 1;
      }

      this.y = -300;
      this.phaseFrames += 1;
      this.width = SIZES.CONFRONT_WIDTH;
      this.height = SIZES.CONFRONT_HEIGHT;
      this.image.src = '../assets/images/characters/bosses/alishar/alishar-idle.png';
      document.getElementById("boss-layer-c-canvas").style.zIndex = "8";

      if (this.phaseFrames >= 1160) {
        this.phaseFrames = 0;
        this.phase = 0;
        this.speed = -3;
      } else {
        this.speed = 0;
      }
    } else if (this.x >= (this.canvasWidth)) {

      this.width = SIZES.LEFT_WIDTH;
      this.height = SIZES.LEFT_HEIGHT;
      this.image.src = '../assets/images/characters/bosses/alishar/alishar-left.png';
      document.getElementById("boss-layer-c-canvas").style.zIndex = "3";
      this.y = -150;
      

      this.speed = -(this.speed);
    } else if (this.x <= -this.width -100) {
      this.width = SIZES.RIGHT_WIDTH;
      this.height = SIZES.RIGHT_HEIGHT;
      this.x = -300;
      this.y = -80;
      this.phase += 1
      if (this.phase === 3){
        this.x -= 500;
      }

      this.speed = -(this.speed);
      this.image.src = '../assets/images/characters/bosses/alishar/alishar-right.png';
      document.getElementById("boss-layer-c-canvas").style.zIndex = "2";
    }


    this.x += -(this.speed);


  }


  draw() {
    this.update();
    this.shift();

    // requestAnimationFrame(this.draw);

    // console.log(this.canvas);
    // console.log(this.bossFrames);


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

module.exports = Alishar;
