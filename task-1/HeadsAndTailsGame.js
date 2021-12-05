class HeadsAndTailsGame {
  number = 0;

  start() {
    this.number = (Math.floor(10 * Math.random()) % 2) + 1;
    console.log("1 или 2?");
  }

  check(number) {
    if (this.number) {
      const result = number === this.number;
      console.log(result ? "Верно" : "Неверно");
      this.number = 0;
      return result;
    }
  }

  abort() {
    if (this.number) {
      console.log(this.number);
      this.number = 0;
    }
  }
}

module.exports = HeadsAndTailsGame;
