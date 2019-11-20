const dongDongSizes = {
  RUN_RIGHT_WIDTH: 393,
  RUN_RIGHT_HEIGHT: 342,
  RUN_LEFT_WIDTH: 609,
  RUN_LEFT_HEIGHT: 485,
  PHASE_WIDTH: 761,
  PHASE_HEIGHT: 1200,
}

class DongDong {



  constructor(game, bossCanvas) {
    // console.log(bossCanvas);
    // console.log(game);
    // console.log(bossCanvas);
    this.x = 500;
    this.y = -30;

    this.canvas = bossCanvas;
    this.canvasWidth = 768;
    this.game = game;
    this.size = 6;
    this.pos = {x: 0, y: 0};
    this.speed = 4;
    this.image = new Image();
    this.image.src = '../assets/images/characters/bosses/dongdong/dong-run-sprite-sheet-left-big.png';
    this.width = dongDongSizes.RUN_LEFT_WIDTH;
    this.height = dongDongSizes.RUN_LEFT_HEIGHT;

    document.getElementById("boss-layer-c-canvas").style.zIndex = "4"; 

    this.phase = 1;
    this.phaseFrames = 0;
    this.step = 0;
    this.frame = 0;

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
  }

  // death() {
  //   // temporary death
  //   this.hitPoints += 1000;
  //   this.x = 200;
  //   this.y = 60;

  //   this.player.freeCurrency += 40000;
  // }

  // changeSprite() {
  //   let random = Math.floor((Math.random() * 3) + 1) - 1;

  //   switch (random) {
  //     case 0:
  //       return this.image.src = "../assets/images/characters/bosses/mana-beast-idle.png";
  //     case 1:
  //       return this.image.src = "../assets/images/characters/bosses/mana-beast-idle2.png";
  //     case 2:
  //       return this.image.src = "../assets/images/characters/bosses/mana-beast-idle3.png";
  //   }


  // }

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

    if (this.step > 5){
      this.step = 0;
      this.frame += 1;
      
    }

    if (this.frame > 9) {
      this.frame = 0 ;
      
    }

  }

  shift() {
    // console.log(this.x)
    // console.log(this.phaseFrames);
    // console.log(this.phase);

    if (this.phase === 2 ) {

      if (this.x >= 120) {
        this.x -= 2;
      }
      
      this.y = -200;
      this.phaseFrames += 1;
      this.width = dongDongSizes.PHASE_WIDTH;
      this.height = dongDongSizes.PHASE_HEIGHT;
      this.image.src = '../assets/images/characters/bosses/dongdong/dong-dong-confront.png';
      document.getElementById("boss-layer-c-canvas").style.zIndex = "8";

      if (this.phaseFrames >= 760) {
        this.phaseFrames = 0;
        this.phase = 0;
        this.speed = 6;
      } else {
        this.speed = 0;
      }


    }
    else if (this.x >= (this.canvasWidth )) {
      
      this.width = dongDongSizes.RUN_LEFT_WIDTH;
      this.height = dongDongSizes.RUN_LEFT_HEIGHT;
      this.image.src = '../assets/images/characters/bosses/dongdong/dong-run-sprite-sheet-left-big.png';
      document.getElementById("boss-layer-c-canvas").style.zIndex = "5";
      this.y = -40; 
      this.phase += 1
      this.speed = -(this.speed);
    } 
    else if (this.x <= -this.width) {
      this.width = dongDongSizes.RUN_RIGHT_WIDTH;
      this.height = dongDongSizes.RUN_RIGHT_HEIGHT;
      this.x = -300;
      this.y = 0;
      
      this.speed = -(this.speed);
      this.image.src = '../assets/images/characters/bosses/dongdong/dong-run-sprite-sheet-right-hills.png';
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
