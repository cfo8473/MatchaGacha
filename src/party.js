class Party {
  

  constructor(options) {
    this.context = options.context;
    this.image = options.idleImage;
    this.height = this.context.canvas.height;
    this.width = this.context.canvas.width;
    this.x = 0;
    this.y = 0;

    // images
    this.heroAttackImage = options.attackImage;
    this.heroPrepImage = options.prepImage;
    this.keyDown = options.heroKeyDown;
    this.keyUp = options.heroKeyUp;
    
    //stats
    this.attackFrames = 0;
    this.attackPower = 1;
    this.critChance = 5;    
    this.attackState = false;
  }

  changeSprite() {
    console.log(this.image);
  }

  fetchPower() {
    return this.attackPower;
  }

  upgradeStr() {
    this.attackPower += 1;
  }

  heroAttackAnimation() {
    this.attackFrames = 8;
    this.attackState = true;
  }

  heroIdle() {
    this.attackState = false;
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    
    if (this.attackFrames === 0) {
      this.context.drawImage(this.image, this.x, this.y);
      this.context.drawImage(this.keyUp, 14, 55);
    } else if (this.attackFrames > 0 ) {
      this.drawAttack();
      this.attackFrames -= 1;
    }
    this.drawStats();
  }

  drawAttack() {
    if (this.attackFrames > 3) {
      this.context.drawImage(this.heroPrepImage, this.x, this.y);
      this.context.drawImage(this.keyDown, 14, 55);
    } else {
      this.context.drawImage(this.heroAttackImage, this.x, this.y);
      this.context.drawImage(this.keyDown, 14, 55);
    }
    
  }

  drawStats() {
    const attackStat = `ATK ${this.attackPower}`;
    const criticalStat = `CRIT ${this.critChance}%`;
    this.context.font = "10px Arial";
    this.context.fillStyle = 'white';
    this.context.fillText(attackStat, 135, 20);
    this.context.fillText(criticalStat, 135, 35);
  }
}

module.exports = Party;