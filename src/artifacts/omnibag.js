const SIZES = {
  CONFRONT_WIDTH: 864,
  CONFRONT_HEIGHT: 666

}

class Omnibag {
  constructor(game, limitBreakCanvas) {
    this.x = -100;
    this.y = -30;
    this.canvas = limitBreakCanvas;
    this.canvasWidth = 768;
    this.frameRate = 1;
    this.game = game;
    this.image = new Image();
    this.image.src = './assets/images/limitbreak/omnibag.png';
    this.canvasList = ["game-canvas", "menu-canvas", "hill-canvas", "sky-canvas", "fuji-canvas", "cloud-layer-a-canvas", "cloud-layer-c-canvas",
      "boss-layer-c-canvas", "mountains-canvas", "background-mountains-canvas"];
    this.width = SIZES.CONFRONT_WIDTH,
    this.height = SIZES.CONFRONT_HEIGHT
    this.frameUp = true;
    this.step = 0;
    this.frame = 0;
    this.phase = 0;
    this.downPhase = 20;
    this.canvasList.forEach((canvas) => {
      document.getElementById(canvas).style.transition = "all 0.8s";

    });
    document.getElementById("boss-layer-c-canvas").style.transition = "all 0.8s";

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

    this.canvasList.forEach( (canvas) => {
      document.getElementById(canvas).style.width = "50%";
      document.getElementById(canvas).style.top = "100px";
      document.getElementById(canvas).style.filter = "blur(2px)";
      document.getElementById(canvas).style.opacity = "0.8";
    });


    if (this.frame > 14) {


      if (this.phase === 8) {
        document.getElementById("sky-canvas").style.filter = "brightness(100%)";
        document.getElementById("mountains-canvas").style.filter = "brightness(100%)";
        document.getElementById("background-mountains-canvas").style.filter = "brightness(100%)";
        document.getElementById("fuji-canvas").style.filter = "brightness(100%)";
        document.getElementById("boss-layer-c-canvas").style.filter = "brightness(100%)";
        document.getElementById("cloud-layer-c-canvas").style.filter = "brightness(100%)";
        
        
        this.canvasList.forEach((canvas) => {
          document.getElementById(canvas).style.width = "100%";
          document.getElementById(canvas).style.top = "0px";
          document.getElementById(canvas).style.opacity = "1";
          document.getElementById(canvas).style.filter = "blur(0px)";
          
        });

        document.getElementById("boss-layer-c-canvas").style.transition = "all 0s";
        document.getElementById("game-canvas").style.top = "-1px";
        this.frame = 0;
        this.canvas.clearRect(0, 0, 800, 800);
        document.getElementById("limit-break-canvas").style.filter = "blur(0px)";
        this.game.removeLimitBreak();
      } else {
        this.frame = 3;
        this.phase += 1;
      }


    } else {
      if (this.step > this.frameRate) {
        this.frame += 1;
        this.step = 0
      }
    }

    if (this.frame >= 8) {
      if (this.frame % 2 === 0) {
        document.getElementById("boss-layer-c-canvas").style.filter = "brightness(300%)";
        this.canvasList.forEach((canvas) => {
          document.getElementById(canvas).style.width = "70%";

          this.canvasList.forEach((canvas) => {
            
            document.getElementById(canvas).style.filter = "brightness(129%)";

          });
      
        });
      } else {
        document.getElementById("boss-layer-c-canvas").style.filter = "brightness(100%)";
        this.canvasList.forEach((canvas) => {
          document.getElementById(canvas).style.width = "50%";
          this.canvasList.forEach((canvas) => {

            document.getElementById(canvas).style.filter = "brightness(59%)";

          });
        });
      }

      if (this.frame >= 8 && this.frame <= 14) {
        const currentBoss = this.game.boss;
        currentBoss.takeDamageLimitBreak(this.game.heroC.attackPower * 3, this.game.heroC.critChance);

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

module.exports = Omnibag;
