class DamageText {
  constructor(game, damage) {
    this.game = game;
    this.textFrames = 50;
    this.frame = 0;
    this.x = this.game.boss.x + (this.game.boss.width / 2) + Math.floor((Math.random() * 44) + 1);;
    this.y = this.game.boss.y + (this.game.boss.height / 3) + Math.floor((Math.random() * 44) + 1);;
    this.text = damage;
    console.log(this.text);
  }

  update() {
    this.frame += 1;
    this.y -= 1;
    this.textFrames -= 1;
    

  }

  draw() {
    this.update();
    this.game.context.fillStyle = 'yellow';
    this.game.context.strokeStyle = 'black';

    this.game.context.font = '22pt Verdana';
    this.game.context.fillText(this.text, this.x, this.y);
    this.game.context.strokeText(this.text, this.x, this.y);

    // this.game.context.strokeStyle = "31px Arial";
    // this.game.context.fillText(this.text, this.x, this.y);
    // this.game.context.strokeStyle = "30px Arial";
    // this.game.context.fillText(this.text, this.x, this.y);
  }

}
module.exports = DamageText;