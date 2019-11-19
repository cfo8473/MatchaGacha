class Party {
  constructor(context, image, startHeight, srcWidth) {
    this.context = context;
    this.image = image;
    this.x = 0;
    this.y = startHeight;
    this.srcWidth = srcWidth;
    this.height = this.context.canvas.height;
    this.width = this.context.canvas.width;
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.drawImage(this.image, this.x, this.y);
  }
}

module.exports = Party;
