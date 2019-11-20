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
      document.getElementById("menu-canvas").style.zIndex = "1"; 
    } else {
      document.getElementById("menu-canvas").style.zIndex = "4"; 
    }
  }

  draw() {
    this.canvas.clearRect(0, 0, 888, 888);
    this.canvas.font = "50px Arial";
    this.canvas.fillStyle = 'white';
    
    this.canvas.drawImage(this.menu,  83, 40);
    this.canvas.fillText("MONEY", 135, 250);
    this.canvas.fillText("GIVE ME MONEY", 135, 120);
    this.canvas.fillText("PAYPAL BELOW", 120, 300);
    
  }
}

module.exports = Menu;