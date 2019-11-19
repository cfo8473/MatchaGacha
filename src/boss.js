class Boss {
  constructor(context, image, startHeight, srcWidth, speed) {
    this.context = context;
    this.image = image;
    this.x = 0;
    this.y = startHeight;
    this.srcWidth = srcWidth;
    this.flyUp = false;
    this.speed = speed;
    this.flySpeed = speed;
    this.height = this.context.canvas.height;
    this.width = this.context.canvas.width;
    this.flap = false;
    
    setInterval(() => this.changeSprite(), 800);

  }

  changeSprite() {
    let random = Math.floor((Math.random() * 3) + 1)-1;
    // console.log(random)
    switch(random) {
      case 0:
        return this.image.src = "../assets/images/characters/bosses/mana-beast-idle.png";
      case 1:
        return this.image.src = "../assets/images/characters/bosses/mana-beast-idle2.png";
      case 2:
        return this.image.src = "../assets/images/characters/bosses/mana-beast-idle3.png";

    }
      

    this.flap = !this.flap;
    
  }

  shift() {
    // console.log(this.y);
    let shiftValue = this.flySpeed;
    if (this.y <= 80) {
      this.flyUp = true;
    }
     else if (this.y >= 125) {
      //  console.log("TOO FAR")
      //  console.log("this.y");
      //  console.log(shiftValue);
      this.flyUp = false;
    }
    
    if (this.flyUp === true) {
      this.y += shiftValue;
    } else if (this.flyUp === false) {
      this.y -= shiftValue;
    }
  }

  draw() {
    this.shift();
    
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.drawImage(this.image, this.x, this.y);
    // this.context.drawImage(this.image, this.x + this.srcWidth, this.y);
    if (this.x >= this.srcWidth-350) {
      this.speed = -(this.speed)
    } 
    else if (this.x <= -25) {
      this.speed = -(this.speed)
    }
    this.x -= this.speed;
  }
}

module.exports = Boss;
