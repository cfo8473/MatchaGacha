class Party {
  constructor(context, image, startHeight, srcWidth, attackState) {
    this.context = context;
    this.image = image;
    this.x = 0;
    this.y = startHeight;
    this.srcWidth = srcWidth;
    this.attackState = attackState;
    this.height = this.context.canvas.height;
    this.width = this.context.canvas.width;
    this.attackPower = 1;
    this.critChance = 5;
    
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

  draw(heroTag) {
    if (!this.attackState) {
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.drawImage(this.image, this.x, this.y);
    } else {
      this.drawAttack(heroTag);
    }
    this.drawStats();
    
  }

  drawAttack(hero) {
    const heroAttackA = new Image();
    const heroAttackB = new Image();
    const heroAttackC = new Image();
    const heroAttackD = new Image();

    heroAttackA.src = "../assets/images/characters/hero/lufia-a-attack.png";
    heroAttackB.src = "../assets/images/characters/hero/lufia-b-attack.png";
    heroAttackC.src = "../assets/images/characters/hero/lufia-c-attack.png";
    heroAttackD.src = "../assets/images/characters/hero/lufia-d-attack.png";

    if (hero === 'a') {
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.drawImage(heroAttackA, this.x, this.y);
    } else if (hero === 'b') {
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.drawImage(heroAttackB, this.x, this.y);
    } else if (hero === 'c') {
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.drawImage(heroAttackC, this.x, this.y);
    } else if (hero === 'd') {
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.drawImage(heroAttackD, this.x, this.y);
    } 
    
    
    this.attackState = false;
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
