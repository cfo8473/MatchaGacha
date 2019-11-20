class Menu {
  constructor(game, canvas) {
    this.game = game;
    this.canvas = canvas;
    this.open = false;
    this.menu = new Image();
    this.menu.src = "../assets/images/ui/menu-big.png";
    console.log(canvas);
    console.log(game);
  }

  toggleMenu() {
    this.open = !this.open;

    if (!this.open) {
      this.canvas.clearRect(0,0,888,888);
    }
  }

  draw() {
    this.canvas.clearRect(0, 0, 888, 888);
    this.game.context.font = "50px Arial";
    this.game.context.fillStyle = 'white';
    
    this.canvas.drawImage(this.menu,  83, 40);
  }
}

module.exports = Menu;