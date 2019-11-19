class Scroller {
  constructor(context, image, startHeight, srcWidth, speed) {
    this.context = context;
    this.image = image;
    this.x = 0;
    this.y = startHeight;
    this.srcWidth = srcWidth;
    this.speed = speed;
    this.height = this.context.canvas.height;
    this.width = this.context.canvas.width;

  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.drawImage(this.image, this.x, this.y);
    this.context.drawImage(this.image, this.x + this.srcWidth, this.y);
    if (this.x <= -this.srcWidth) {
      this.x = 0;
    }
    this.x -= this.speed;
  }
}

module.exports = Scroller;
