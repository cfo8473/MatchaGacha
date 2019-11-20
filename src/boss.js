
class Boss {
  constructor(context, image, startHeight, srcWidth, speed, player) {
    this.context = context;
    this.image = image;
    this.hitPoints = 1000;
    this.x = 0;
    this.y = startHeight;
    this.srcWidth = srcWidth;
    this.flyUp = false;
    this.bossFrames = 0;
    this.speed = speed;
    this.flySpeed = speed;
    this.height = this.context.canvas.height;
    this.width = this.context.canvas.width;
    this.player = player;
    this.hit = false;
    
    
    setInterval(() => this.changeSprite(), 400);
  }

  takeDamage(partyMember) {

    // start frame
    this.bossFrames = 1;
    // this.context.clearRect(0, 0, this.width, this.height);
    // this.context.drawImage(damaged, this.x, this.y);

    if (Math.random() >= (1 - (partyMember.critChance * 0.01))) {
      console.log("CRITICAL!")
      this.hitPoints -= partyMember.attackPower * 2;
    } else {
      this.hitPoints -= partyMember.attackPower;
    }


  
    // debug death
    if ( this.hitPoints <= 0 ) {
      this.death();
    }
  }

  death() {
    // temporary death
    this.hitPoints += 1000;
    this.x = 200;
    this.y = 60;

    this.player.freeCurrency += 40000;
  }

  changeSprite() {
    let random = Math.floor((Math.random() * 3) + 1)-1;
    // console.log(random)

    //condtional for boss dmg
    // console.log(this.bossFrames);

    // if (this.bossFrames > 0) {
    //   return this.image.src = "../assets/images/characters/bosses/mana-beast-idle3-damaged.png";
    // } else {

      switch(random) {
        case 0:
          return this.image.src = "../assets/images/characters/bosses/mana-beast-idle.png";
        case 1:
          return this.image.src = "../assets/images/characters/bosses/mana-beast-idle2.png";
        case 2:
          return this.image.src = "../assets/images/characters/bosses/mana-beast-idle3.png";
      // }
    }
      
    
  }

  shift() {
    // console.log(this.y);
    let shiftValue = this.flySpeed;
    if (this.y <= 80) {
      this.flyUp = true;
    }
     else if (this.y >= 125) {
      //  console.log("TOO FAR")
      //  console.log("this.y");
      //  console.log(shiftValue);
      this.flyUp = false;
    }
    
    if (this.flyUp === true) {
      this.y += shiftValue;
    } else if (this.flyUp === false) {
      this.y -= shiftValue;
    }
  }
  

  draw() {
    // requestAnimationFrame(this.draw);
    
    // console.log(this.bossFrames);
    
    if (this.bossFrames > 0 ) {
      this.image.src = "../assets/images/characters/bosses/mana-beast-idle3-damaged.png";
      if (this.hit) {
        this.y += 4;
        this.hit = !this.hit;
      } else {
        this.y -= 4;
        this.hit = !this.hit;
      }
      this.bossFrames -= 1;
    } else {
      this.shift();
      this.x -= this.speed;
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.drawImage(this.image, this.x, this.y);
      if (this.x >= this.srcWidth - 350) {
        this.speed = -(this.speed)
      }
      else if (this.x <= -25) {
        this.speed = -(this.speed)
      }
    }

    // this.context.font = "20px Arial";
    // this.context.fillStyle = 'red';
    // this.context.fillText("SDFSFD", this.x + 560, this.y + 320);
    
    // this.context.drawImage(this.image, this.x + this.srcWidth, this.y);
    
    const hitPoints = `HP: ${this.hitPoints}`;

    this.context.font = "20px Arial";
    this.context.fillStyle = 'red';
    this.context.strokeStyle = 'white';
    this.context.fillText(hitPoints, this.x+160, this.y+20);
    this.context.strokeText(hitPoints, this.x + 160, this.y + 20);
  }
}

module.exports = Boss;
