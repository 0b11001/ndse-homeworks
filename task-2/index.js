#!/usr/bin/env node

const readline = require("readline");
const { stdin: input, stdout: output } = require("process");
const GuessNumberGame = require("./GuessNumberGame");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const game = new GuessNumberGame();

console.log(game.start());

rl.on("line", function (answer) {
  const number = parseInt(answer);
  if (isNaN(number)) {
    console.log("Введите число");
  } else {
    console.log(game.check(number));
    if (game.isWin) {
      process.exit(0);
    }
  }
});

rl.on("close", function () {
  console.log(game.abort());
});
