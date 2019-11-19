class Player {
  constructor() {
    this.freeCurrency = 0;
    this.premiumCurrency = 0;
    this.tapPower = 1;
    this.passiveIncome = 1;
    setInterval(() => this.income(), 1000);
  }

  tap() {
    this.freeCurrency += this.tapPower;
    console.log(`FREE CURRENCY ${this.freeCurrency}`);
  }

  income() {
    this.freeCurrency += this.passiveIncome;
  }

  upgradeTap(value) {
    this.tapPower += value;
    console.log(`${value} added to tap power (${this.tapPower})`);
  }

  upgradeIncome(value) {
    this.passiveIncome += value;
    console.log(`${value} added to income (${this.passiveIncome})`);
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

    const freeCurrency = `Currency: ${this.freeCurrency}`;
    const tapPower = `Power: ${this.tapPower}`;
    const passiveIncome = `Income: ${this.passiveIncome}`;
    
    context.font = "15px Arial";
    context.fillStyle = 'white';
    context.fillText(freeCurrency, 10, 20);
    context.fillText(tapPower, 10, 40);
    context.fillText(passiveIncome, 10, 60);
  }


}

module.exports = Player;