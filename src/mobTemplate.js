
class mobTemplate {
  constructor(context, image, startHeight, srcWidth, speed, player) {
    this.context = context;
    this.image = image;
    this.hitPoints = 100;
    this.x = 0;
    this.y = startHeight;
    this.srcWidth = srcWidth;
    this.flyUp = false;
    this.mobFrames = 0;
    this.speed = speed;
    this.flySpeed = speed;
    this.height = this.context.canvas.height;
    this.width = this.context.canvas.width;
    this.player = player;
    this.hit = false;


    setInterval(() => this.changeSprite(), 400);
  }

  takeDamage(partyMember) {
    this.mobFrames = 1;
    if (Math.random() >= (1 - (partyMember.critChance * 0.01))) {

      this.hitPoints -= partyMember.attackPower * 2;
    } else {
      this.hitPoints -= partyMember.attackPower;
    }
    if (this.hitPoints <= 0) {
      this.death();
    }
  }

  // debug function to test sprite changes
  acceptSprite(sprite) {
    this.image = sprite;
  }

  takeDamageLimitBreak(heroDamage) {
    this.hitPoints -= heroDamage;
  }

  death() {
    this.hitPoints += 100;
    this.x = 200;
    this.y = 60;

    this.player.freeCurrency += 100;
  }

  shift() {
    let shiftValue = this.flySpeed;
    if (this.y <= 80) {
      this.flyUp = true;
    }
    else if (this.y >= 125) {
      this.flyUp = false;
    }

    if (this.flyUp === true) {
      this.y += shiftValue;
    } else if (this.flyUp === false) {
      this.y -= shiftValue;
    }
  }


  draw() {
    const hitPoints = `HP: ${this.hitPoints}`;

    this.context.font = "20px Arial";
    this.context.fillStyle = 'red';
    this.context.strokeStyle = 'white';
    this.context.fillText(hitPoints, this.x + 160, this.y + 20);
    this.context.strokeText(hitPoints, this.x + 160, this.y + 20);
  }
}

module.exports = mobTemplate;
