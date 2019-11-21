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

class DongDong {



  constructor(game, bossCanvas) {
    // console.log(bossCanvas);
    // console.log(game);
    // console.log(bossCanvas);
    this.hitPoints = 2000;
    this.x = 500;
    this.y = -30;
    this.bossFrames = 0;
    this.canvas = bossCanvas;
    this.canvasWidth = 768;
    this.frameRate = 5;
    this.game = game;
    this.speed = 4;
    this.image = new Image();
    this.image.src = '../dist/assets/images/characters/bosses/dongdong/dong-run-sprite-sheet-left-big.png';
    this.width = dongDongSizes.RUN_LEFT_WIDTH;
    this.height = dongDongSizes.RUN_LEFT_HEIGHT;

    document.getElementById("boss-layer-c-canvas").style.zIndex = "4"; 

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
    } else {
      this.hitPoints -= partyMember.attackPower;
    }
    // debug death
    
    // console.log(this.hitPoints);
  }

  death() {
    
    this.deathStatus = true;
    // temporary death

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
    console.log(this.deathFrames);
    this.deathFrames -= 1;
    document.getElementById("boss-layer-c-canvas").style.zIndex = "6";
    this.image.src = '../dist/assets/images/characters/bosses/dongdong/dong-dong-dead.png';
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
    if (this.deathStatus) {
      this.y = -54;
      
      // if dead and x position is returning from moving -> right
      if (this.x >= -120) {
        // console.log(this.x)
        this.frame = 0;
        document.getElementById("boss-layer-c-canvas").style.zIndex = "6";
        this.image.src = '../dist/assets/images/characters/bosses/dongdong/dong-dong-dead.png';
        this.width = dongDongSizes.DEAD_WIDTH;
        this.height = dongDongSizes.DEAD_HEIGHT;
        this.speed = 3;
        // up 
      } else {
        
        this.speed = 0;
        this.deathAnimation();
      }
    } else if (this.phase === 2 ) {

      if (this.x >= 120) {
        this.x -= 2;
      }
      
      this.y = -200;
      this.phaseFrames += 1;
      this.width = dongDongSizes.PHASE_WIDTH;
      this.height = dongDongSizes.PHASE_HEIGHT;
      this.image.src = '../dist/assets/images/characters/bosses/dongdong/dong-dong-confront.png';
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
      this.image.src = '../dist/assets/images/characters/bosses/dongdong/dong-run-sprite-sheet-left-big.png';
      document.getElementById("boss-layer-c-canvas").style.zIndex = "5";
      this.y = -40; 
      this.phase += 1
      if (this.hitPoints <= 0) {
        this.frameRate = 0;
        this.death();
      }
      this.speed = -(this.speed);
    } else if (this.x <= -this.width) {
      this.width = dongDongSizes.RUN_RIGHT_WIDTH;
      this.height = dongDongSizes.RUN_RIGHT_HEIGHT;
      this.x = -300;
      this.y = 0;
      
      this.speed = -(this.speed);
      this.image.src = '../dist/assets/images/characters/bosses/dongdong/dong-run-sprite-sheet-right-hills.png';
      document.getElementById("boss-layer-c-canvas").style.zIndex = "3"; 
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

module.exports = DongDong;
