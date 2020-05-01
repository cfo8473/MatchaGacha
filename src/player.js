class Player {
  constructor() {
    this.freeCurrency = 0;
    this.premiumCurrency = 0;
    this.passiveIncome = 1;
    this.tapDamage = 1;
    this.tapFrame = 1;

    
    setInterval(() => this.income(), 1000);
  }

  tap(value) {
    this.freeCurrency += value;
    this.tapFrame += 1;
    if (this.tapFrame >= 5) {
      this.tapFrame = 1;
    }
  }

  income() {
    this.freeCurrency += this.passiveIncome;
  }

  // upgradeTap(value) {
  //   this.tapPower += value;
  // }

  upgradeIncome(value) {
    this.passiveIncome += value;
  }

  addPremiumCurrency(value) {
    this.premiumCurrency += value;
  }

  update(context) {
    this.draw(context);
  }

  drawTapPower(context) {
    const width = context.canvas.width;
    const height = context.canvas.height;
    context.clearRect(0, 0, width, height);
    const freeCurrency = `${this.freeCurrency}`;
    const passiveIncome = `Income: ${this.passiveIncome}`;

    context.font = "15px Arial";
    context.fillStyle = 'white';
    context.fillText(freeCurrency, 30, 22);
    // context.fillText(passiveIncome, 10, 60);
    const freeCurrencyIcon = new Image();
    freeCurrencyIcon.src = "./assets/images/misc/gold-coin.png";
    context.drawImage(freeCurrencyIcon, 0, 0);
  }


}

module.exports = Player;