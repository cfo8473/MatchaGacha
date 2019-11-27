class DamageText {
  constructor(game, damage, crit) {
    this.game = game;
    this.textFrames = 100;
    this.frame = 0;
    this.crit = crit;
    this.yellow;
    this.black;
    this.red;

    // console.log(this.game.gameCanvas.clientHeight);
    // console.log(this.game.gameCanvas.clientWidth);
    //minimum maximum blah formula
    this.x = Math.min(Math.max(parseInt(this.game.boss.x + (this.game.boss.width / 2) + Math.floor((Math.random() * (this.game.gameCanvas.clientWidth * 0.10)) + 1)), 0), (this.game.gameCanvas.clientWidth * 0.95));
    this.y = Math.min(Math.max(parseInt(this.game.boss.y + (this.game.boss.height / 4) + Math.floor((Math.random() * 44) + 1)), 200), 400);
    // this.y = 
    this.text = damage;
    // console.log(this.text);
  }

  update() {
    this.frame += 1;
    this.y -= 1;
    this.textFrames -= 1;

    

  }

  draw() {
    this.update();

    this.black = `rgb(0, 0, 0, ${(this.textFrames * 0.01)})`;
    if (this.crit) {
      this.red = `rgb(255, 75, 0, ${(this.textFrames * 0.01)})`;
      this.x += Math.round(Math.random()) * 1 - 1
      // console.log(`${(this.textFrames * 0.01) }`);
      this.game.context.fillStyle = this.red;
      this.game.context.strokeStyle = this.black;
      this.game.context.font = '24pt Arial Black';
    } else {
      this.yellow = `rgb(255, 255, 0, ${(this.textFrames * 0.03)})`;
      this.game.context.fillStyle = this.yellow;
      this.game.context.strokeStyle = this.black;
      this.game.context.font = '15pt Arial Black';
    }
    
    
    this.game.context.fillText(this.text, this.x, this.y);
    this.game.context.strokeText(this.text, this.x, this.y);
  }

}
module.exports = DamageText;