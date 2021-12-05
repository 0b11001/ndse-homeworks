class GuessNumberGame {
  number = null;
  isWin = false;

  start() {
    this.isWin = false;
    this.number = Math.floor(100 * Math.random()) + 1;
    return "Загадано число от 1 до 100";
  }

  check(number) {
    if (this.number !== null && !this.isWin) {
      switch (true) {
        case number === this.number:
          this.isWin = true;
          return "Отгадано число " + this.number;
        case number > this.number:
          return "Меньше";
        case number < this.number:
          return "Больше";
      }
    }
  }

  abort() {
    if (this.number !== null && !this.isWin) {
      return "Было загадано число " + this.number;
    }
    return null;
  }
}

module.exports = GuessNumberGame;
