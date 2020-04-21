const SIZES = {
  CONFRONT_WIDTH: 1084,
  CONFRONT_HEIGHT: 885

}

class CaffeineRage {
  constructor(game, limitBreakCanvas) {
    this.x = -180;
    this.y = -340;
    this.canvas = limitBreakCanvas;
    this.canvasWidth = 768;
    this.frameRate = 2;
    this.game = game;
    this.image = new Image();
    this.image.src = './assets/images/limitbreak/rage.png';
    this.width = SIZES.CONFRONT_WIDTH,
      this.height = SIZES.CONFRONT_HEIGHT
    this.frameUp = true;
    this.step = 0;
    this.frame = 5;
    this.phase = 0;

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

  }

  death() {

    this.deathStatus = true;
    // temporary death
    this.game.bossDeath();

    this.game.player.freeCurrency += 40000;
  }

  update() {

    this.step += 1;

    document.getElementById("sky-canvas").style.filter = "brightness(170%)";
    document.getElementById("mountains-canvas").style.filter = "brightness(180%)";
    document.getElementById("background-mountains-canvas").style.filter = "brightness(180%)";
    document.getElementById("fuji-canvas").style.filter = "brightness(170%)";
    document.getElementById("cloud-layer-c-canvas").style.filter = "brightness(151%)";

    if (this.frame > 28) {

      
      if (this.phase === 4) {
        document.getElementById("sky-canvas").style.filter = "brightness(100%)";
        document.getElementById("mountains-canvas").style.filter = "brightness(100%)";
        document.getElementById("background-mountains-canvas").style.filter = "brightness(100%)";
        document.getElementById("fuji-canvas").style.filter = "brightness(100%)";
        document.getElementById("boss-layer-c-canvas").style.filter = "brightness(100%)";
        document.getElementById("cloud-layer-c-canvas").style.filter = "brightness(100%)";
        this.frame = 0;
        this.canvas.clearRect(0, 0, 800, 800);
        document.getElementById("limit-break-canvas").style.filter = "blur(0px)";
        this.game.removeLimitBreak();
      } else {
        this.frame = 12;
        this.phase += 1;
      }
      
      
    } else { 
      if ( this.step > this.frameRate) {
      this.frame += 1;
      this.step = 0
      }
    }

    if (this.frame >= 14) {
      if (this.frame % 2 === 0) {
        document.getElementById("boss-layer-c-canvas").style.filter = "brightness(300%)";
        
      } else {
        document.getElementById("boss-layer-c-canvas").style.filter = "brightness(100%)";
      }

      if (this.frame >= 17 && this.frame <= 20) {
        // hero A hit with x3
        const currentBoss = this.game.boss;
        currentBoss.takeDamageLimitBreak(this.game.heroA.attackPower * 6, this.game.heroA.critChance);
      
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
