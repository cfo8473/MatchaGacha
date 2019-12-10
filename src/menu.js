class Menu {
  constructor(game, canvas) {
    this.game = game;
    this.canvas = canvas;
    this.open = false;
    this.menu = new Image();
    this.menu.src = "./assets/images/ui/menu-blue-big.png";
  }

  toggleMenu() {
    this.open = !this.open;

    if (!this.open) {
      this.canvas.clearRect(0,0,888,888);
      document.getElementById("menu-canvas").style.zIndex = "1"; 
    } else {
      document.getElementById("menu-canvas").style.zIndex = "1001"; 
    }
  }

  draw() {
    this.canvas.clearRect(0, 0, 888, 888);
    this.canvas.font = "50px Arial";
    this.canvas.fillStyle = 'white';
    
    this.canvas.drawImage(this.menu,  83, 40);
    this.canvas.fillText("debug", 135, 250);
   
    
  }
}

module.exports = Menu;