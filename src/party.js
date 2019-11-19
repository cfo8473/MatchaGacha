const HERO_IMAGES = {
  heroAttackA: "../assets/images/characters/hero/lufia-a-attack.png",
  heroAttackB: "../assets/images/characters/hero/lufia-b-attack.png",
  heroAttackC: "../assets/images/characters/hero/lufia-c-attack.png",
  heroAttackD: "../assets/images/characters/hero/lufia-d-attack.png"
}

class Party {
  

  constructor(context, image, heroAttackImage, startHeight, srcWidth, attackState) {
    this.context = context;
    this.image = image;
    this.heroAttackImage = heroAttackImage;
    
    this.x = 0;
    this.y = startHeight;
    this.srcWidth = srcWidth;
    this.attackState = attackState;
    this.height = this.context.canvas.height;
    this.width = this.context.canvas.width;
    this.attackPower = 1;
    this.critChance = 5;
    console.log(this);
    
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
    this.attackState = true;
    
  }

  heroIdle() {
    this.attackState = false;
  }

  draw(heroTag) {
    if (!this.attackState) {
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.drawImage(this.image, this.x, this.y);
    } else {
      this.drawAttack();
    }
    this.drawStats();
    
  }

  drawAttack() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.drawImage(this.heroAttackImage, this.x, this.y);
  }



  drawStats() {
    const width = this.context.canvas.width;
    const height = this.context.canvas.height;
    this.context.clearRect(55, 0, width, height);

    const attackStat = `ATK ${this.attackPower}`;
    const criticalStat = `CRIT ${this.critChance}%`;

    this.context.font = "10px Arial";
    this.context.fillStyle = 'white';
    this.context.fillText(attackStat, 75, 20);
    this.context.fillText(criticalStat, 75, 35);
  }
}

module.exports = Party;
