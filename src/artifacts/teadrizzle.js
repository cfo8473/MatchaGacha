const SIZES = {
  RIGHT_WIDTH: 826,
  RIGHT_HEIGHT: 1346,
  LEFT_WIDTH: 528,
  LEFT_HEIGHT: 776,
  CONFRONT_WIDTH: 980,
  CONFRONT_HEIGHT: 1000

}

class TeaDrizzle {
  constructor(game, limitBreakCanvas) {
    this.x = 0;
    this.y = -840;
    this.canvas = limitBreakCanvas;
    this.canvasWidth = 768;
    this.frameRate = 2;
    this.game = game;
    this.image = new Image();
    this.image.src = './assets/images/limitbreak/beamlimitbreak.png';
    this.width = SIZES.RIGHT_WIDTH,
    this.height = SIZES.RIGHT_HEIGHT
    this.frameUp = true;
    this.phase = 0;
    this.step = 0;
    this.frame = 5;

  }

  takeDamage(partyMember) {
    this.bossFrames = 1;
    if (Math.random() >= (1 - (partyMember.critChance * 0.01))) {
      console.log("CRITICAL!")
      this.hitPoints -= partyMember.attackPower * 2;
    } else {
      this.hitPoints -= partyMember.attackPower;
    }
    // debug death

    if (this.hitPoints <= 0) {
      this.death();
    }

    // console.log(this.hitPoints);
  }

  death() {

    this.deathStatus = true;
    // temporary death
    this.game.bossDeath();

    this.game.player.freeCurrency += 40000;
  }

  update() {
    // console.log(this.frame);

    this.step += 1;

    document.getElementById("sky-canvas").style.filter = "brightness(20%)";
    document.getElementById("mountains-canvas").style.filter = "brightness(80%)";
    document.getElementById("background-mountains-canvas").style.filter = "brightness(70%)";
    document.getElementById("fuji-canvas").style.filter = "brightness(60%)";

    if (this.frame > 36) {
      if (this.phase === 3) {
        document.getElementById("sky-canvas").style.filter = "brightness(100%)";
        document.getElementById("mountains-canvas").style.filter = "brightness(100%)";
        document.getElementById("background-mountains-canvas").style.filter = "brightness(100%)";
        document.getElementById("fuji-canvas").style.filter = "brightness(100%)";
        document.getElementById("boss-layer-c-canvas").style.filter = "brightness(100%)";
        this.frame = 0;
        this.canvas.clearRect(0, 0, 800, 800);
        this.game.removeLimitBreak();
      } else {
        this.frame = 12;
        this.phase += 1;
      }
    }

    if (this.frame >= 14) {
      if (this.frame % 2 === 0 ) {
        document.getElementById("boss-layer-c-canvas").style.filter = "brightness(300%)";
      } else {
        document.getElementById("boss-layer-c-canvas").style.filter = "brightness(100%)";
      }
    }

    if (this.step > this.frameRate) {
      this.frame += 1;
      this.step = 0
    }

    if (this.frame >= 17 && this.frame <= 36) {
      // console.log(this.frame) 
      // hero A hit with x3
      const currentBoss = this.game.boss;
      currentBoss.takeDamageLimitBreak(this.game.heroB.attackPower * 1.5, this.game.heroB.critChance);
      // console.log(this.game.heroB.attackPower);

    }


  }

  draw() {
    

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
    this.update();
  }
}

module.exports = TeaDrizzle;
