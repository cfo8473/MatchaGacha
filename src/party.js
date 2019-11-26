class Party {
  

  constructor(game, options, attackStart) {
    this.game = game;
    console.log(options)
    this.context = options.context;
    this.image = options.idleImage;
    this.height = this.context.canvas.height;
    this.width = this.context.canvas.width;
    this.goldCost = 1;
    this.x = 0;
    this.y = 0;

    // images
    this.heroAttackImage = options.attackImage;
    this.heroPrepImage = options.prepImage;
    this.keyDown = options.heroKeyDown;
    this.keyUp = options.heroKeyUp;
    
    //stats
    
    this.attackFrames = 0;
    this.attackSpeed = 240;
    this.attackPower = 1;
    this.critChance = 10;    
    this.attackState = false;
    
    //autoattack
    this.frames = attackStart;
    this.step = 0;
    this.autoAttack();

    //limit break
    this.limitBreakFrames = 40;
  }

  changeSprite() {
    console.log(this.image);
  }

  autoAttack() {
    
  }

  update() {
    this.frames += 1;
    if (this.frames >= this.attackSpeed) {
      this.frames = 0;
      this.heroAttackAnimation();
      this.game.boss.takeDamage(this);
    }
  }

  fetchPower() {
    return this.attackPower;
  }

  upgradeStr() {
    if (this.game.player.freeCurrency >= this.goldCost) {
      this.attackPower += 1;
      this.attackSpeed -= 1;
      this.game.player.freeCurrency -= this.goldCost;
      this.goldCost += 5;
    }
    
  }

  heroAttackAnimation() {
    this.attackFrames = 8;
    this.attackState = true;
    if (this.limitBreakFrames < 40) {
      this.limitBreakFrames += 1;
    }
    
  }

  heroIdle() {
    this.attackState = false;
  }

  drawAttackTimer() {
    // this.context.beginPath();
    this.context.strokeStyle = "rgba(0, 0, 0, 0.4)";
    this.context.rect( 130, 20, 50, 10);
    this.context.fillStyle = `rgba(255, ${this.frames}, 0, 0.7)`;
    this.context.fillRect( 130, 20, ((this.frames / this.attackSpeed)*100)/2, 10);

    this.context.fillStyle = `rgba(255, ${this.frames}, 0, 0.7)`;
    this.context.fillRect(130, 20, ((this.frames / this.attackSpeed) * 100) / 2, 10);
  }

  drawLimitBreakTimer() {
    if (this.limitBreakFrames === 40){
      this.context.fillStyle = `rgba(0, ${((this.frames + 180) % 255) + 100}, 0, 1)`;
      this.context.fillRect(70, 20, 50, 10);
    } else {
      this.context.fillStyle = `rgba(155, 155, 155, 1)`;
      this.context.fillRect(70, 20, 50, 10);
      this.context.strokeStyle = "rgba(0, 0, 0, 0.4)";
      this.context.rect(70, 20, 50, 10);
      this.context.fillStyle = `rgba(171, ${this.limitBreakFrames * 20}, 171, 1)`;
      // this.context.stroke();
      this.context.fillRect(70, 20, ((this.limitBreakFrames / 40) * 100) / 2, 10);
    }
    
    
    
  }

  draw() {
    this.update();

    

    this.context.clearRect(0, 0, this.width, this.height);
    this.drawLimitBreakTimer();
    this.drawAttackTimer();
    if (this.attackFrames === 1) {
      document.getElementById("boss-layer-c-canvas").style.filter = "brightness(100%)";
    }
    if (this.attackFrames === 0) {
      this.context.drawImage(this.image, this.x, this.y);
      this.context.drawImage(this.keyUp, 14, 55);
      this.attackState = false;
      
    } else if (this.attackFrames > 0 ) {
      this.drawAttack();
      this.attackFrames -= 1;
    }
    this.drawStats();
  }

  

  drawAttack() {
    if (this.attackFrames > 3) {
      document.getElementById("boss-layer-c-canvas").style.filter = "brightness(120%)";
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
    const upgradeStat = `COST ${this.goldCost}`;
    const speedStat = `SPD ${(this.attackSpeed/100)}`;
    this.context.font = "10px Arial";
    this.context.fillStyle = 'white';
    this.context.fillText(`LIMIT`, 70, 15);
    this.context.fillText(`ATK`, 130, 15);
    // this.context.fillText("DEBUG INFO", 55, 20);
    this.context.fillText(speedStat, 80, 65);
    this.context.fillText(attackStat, 130, 50);
    this.context.fillText(criticalStat, 130, 65);
    this.context.fillText(upgradeStat, 80, 80);
  }
}

module.exports = Party;
