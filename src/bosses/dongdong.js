const dongDongSizes = {
  RUN_RIGHT_WIDTH: 393,
  RUN_RIGHT_HEIGHT: 342,
  RUN_LEFT_WIDTH: 609,
  RUN_LEFT_HEIGHT: 485,
  PHASE_WIDTH: 761,
  PHASE_HEIGHT: 1200,
  DEAD_WIDTH: 925,
  DEAD_HEIGHT: 1600,
}

const DmgText = require('../damage');

class DongDong {
  constructor(game, bossCanvas) {
    this.maxHitPoints = game.level * game.monsterBaseHP;
    this.hitPoints = this.maxHitPoints;
    this.x = 500;
    this.y = -30;
    this.bossFrames = 0;
    this.canvas = bossCanvas;
    this.canvasWidth = 768;
    this.frameRate = 5;
    this.game = game;
    this.speed = 4;
    this.image = new Image();
    this.image.src = './assets/images/characters/bosses/dongdong/dong-run-sprite-sheet-left-big.png';
    this.width = dongDongSizes.RUN_LEFT_WIDTH;
    this.height = dongDongSizes.RUN_LEFT_HEIGHT;

    

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
      console.log("CRITICAL!")
      this.hitPoints -= partyMember.attackPower * 2;
      let damageText = new DmgText(this.game, partyMember.attackPower * 2, true);

      this.game.damageTexts.push(damageText);
    } else {
      this.hitPoints -= partyMember.attackPower;
      let damageText = new DmgText(this.game, partyMember.attackPower, false);

      this.game.damageTexts.push(damageText);
    }
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

  hpPercentage () {
    let currentHpPercentage = (this.hitPoints / this.maxHitPoints);
    if (currentHpPercentage >= 0) {
      return currentHpPercentage;
    } else 
    return 0;
  }

  death() {
    
    this.deathStatus = true;
    this.game.bossDeath();
    // temporary death
  }

  update () {

    this.step += 1;

    if (this.step > this.frameRate){
      this.step = 0;
      this.frame += 1;
    }

    if (this.frame > 9 ) {
      this.frame = 0 ;
    }

  }

  deathAnimation() {
    this.deathFrames -= 1;
    document.getElementById("boss-layer-c-canvas").style.zIndex = "6";
    this.image.src = './assets/images/characters/bosses/dongdong/dong-dong-dead.png';
    this.frameRate = 55;
    this.width = dongDongSizes.DEAD_WIDTH;
    this.height = dongDongSizes.DEAD_HEIGHT;
    this.y = -54;

    if (this.deathFrames <= 0) {
      this.game.bossDeath();
      this.deathFrames = 0;

    }
   
  }

  shift() {
    if (this.hitPoints <= 0) {
      this.frameRate = 0;
      this.death();
    }

    if (this.phase === 2 ) {

      if (this.x >= 120) {
        this.x -= 2;
      }
      
      this.y = -200;
      this.phaseFrames += 1;
      this.width = dongDongSizes.PHASE_WIDTH;
      this.height = dongDongSizes.PHASE_HEIGHT;
      this.image.src = './assets/images/characters/bosses/dongdong/dong-dong-confront.png';
      document.getElementById("boss-layer-c-canvas").style.zIndex = "8";

      if (this.phaseFrames >= 760) {
        this.phaseFrames = 0;
        this.phase = 0;
        this.speed = 6;
      } else {
        this.speed = 0;
      }
    } else if (this.x >= (this.canvasWidth )) {
      
      this.width = dongDongSizes.RUN_LEFT_WIDTH;
      this.height = dongDongSizes.RUN_LEFT_HEIGHT;
      this.image.src = './assets/images/characters/bosses/dongdong/dong-run-sprite-sheet-left-big.png';
      document.getElementById("boss-layer-c-canvas").style.zIndex = "5";
      this.y = -40; 
      this.phase += 1
      
      this.speed = -(this.speed);
    } else if (this.x <= -this.width) {
      this.width = dongDongSizes.RUN_RIGHT_WIDTH;
      this.height = dongDongSizes.RUN_RIGHT_HEIGHT;
      this.x = -300;
      this.y = 0;
      
      this.speed = -(this.speed);
      this.image.src = './assets/images/characters/bosses/dongdong/dong-run-sprite-sheet-right-hills.png';
      document.getElementById("boss-layer-c-canvas").style.zIndex = "3"; 
    }


    this.x += -(this.speed);
    
    
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

module.exports = DongDong;
