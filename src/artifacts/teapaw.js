const SIZES = {
  CONFRONT_WIDTH: 894,
  CONFRONT_HEIGHT: 885

}

class CaffeineRage {
  constructor(game, limitBreakCanvas) {
    this.x = 0;
    this.y = 10;
    this.canvas = limitBreakCanvas;
    this.canvasWidth = 768;
    this.frameRate = 4;
    this.game = game;
    this.image = new Image();
    this.image.src = './assets/images/limitbreak/teapaw3.png';
    this.width = SIZES.CONFRONT_WIDTH,
      this.height = SIZES.CONFRONT_HEIGHT
    this.frameUp = true;
    this.step = 0;
    this.frame = 0;
    this.phase = 0;
    this.frameUp = true;

  }

  takeDamage(partyMember) {
    this.bossFrames = 1;
    if (Math.random() >= (1 - (partyMember.critChance * 0.01))) {
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

    document.getElementById("sky-canvas").style.filter = "brightness(30%)";
    document.getElementById("mountains-canvas").style.filter = "brightness(30%)";
    document.getElementById("background-mountains-canvas").style.filter = "brightness(30%)";
    document.getElementById("fuji-canvas").style.filter = "brightness(30%)";
    document.getElementById("hill-canvas").style.filter = "brightness(30%)";
    document.getElementById("cloud-layer-c-canvas").style.filter = "brightness(30%)";
    document.getElementById("sky-canvas").style.filter = "blur(7px)";
    document.getElementById("mountains-canvas").style.filter = "blur(7px)";
    document.getElementById("cloud-layer-a-canvas").style.filter = "blur(7px)";
    document.getElementById("background-mountains-canvas").style.filter = "blur(7px)";
    document.getElementById("fuji-canvas").style.filter = "blur(7px)";
    if (this.frame > 10) {
      this.frameUp = false;
    } else if (this.frame === 0) {
      this.frameUp = true;
    }


    if (this.frame > 10) {


      if (this.phase === 4) {
        document.getElementById("sky-canvas").style.filter = "brightness(100%)";
        document.getElementById("mountains-canvas").style.filter = "brightness(100%)";
        document.getElementById("background-mountains-canvas").style.filter = "brightness(100%)";
        document.getElementById("fuji-canvas").style.filter = "brightness(100%)";
        document.getElementById("boss-layer-c-canvas").style.filter = "brightness(100%)";
        document.getElementById("cloud-layer-a-canvas").style.filter = "brightness(100%)";
        document.getElementById("cloud-layer-c-canvas").style.filter = "brightness(100%)";
        document.getElementById("hill-canvas").style.filter = "brightness(100%)";
        this.frame = 0;
        this.game.autoAttackSpeed = 1;
        this.canvas.clearRect(0, 0, 800, 800);
        document.getElementById("limit-break-canvas").style.filter = "blur(0px)";
        this.game.removeLimitBreak();
      } else {
        this.frame = 1;
        this.phase += 1;
      }


    } else if (this.step > this.frameRate) {
      this.step = 0;
      if (this.frameUp) {
        this.frame += 1;
      } else {
        this.frame -= 1;
      }

    }

    if (this.frame >= 0) {
      if (this.frame % 2 === 0) {
        document.getElementById("boss-layer-c-canvas").style.filter = "brightness(300%)";
      } else {
        document.getElementById("boss-layer-c-canvas").style.filter = "brightness(100%)";
      }

      if (this.frame >= 0 && this.frame <= 11) {
        const currentBoss = this.game.boss;
        currentBoss.takeDamageLimitBreak(this.game.heroD.attackPower * 1.5, this.game.heroB.critChance);
        // console.log(this.game.heroB.attackPower);


        // console.log(this.game.autoAttackFrames);
      }

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

module.exports = CaffeineRage;
