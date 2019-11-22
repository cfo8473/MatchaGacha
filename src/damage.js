class DamageText {
  constructor(game, damage, crit) {
    this.game = game;
    this.textFrames = 50;
    this.frame = 0;
    this.crit = crit;

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

    if (this.crit) {
      this.game.context.fillStyle = 'red';
      this.game.context.strokeStyle = 'black';
      this.game.context.font = '24pt Arial Black';
    } else {
      this.game.context.fillStyle = 'yellow';
      this.game.context.strokeStyle = 'black';
      this.game.context.font = '15pt Arial Black';
    }
    
    
    this.game.context.fillText(this.text, this.x, this.y);
    this.game.context.strokeText(this.text, this.x, this.y);
  }

}
module.exports = DamageText;