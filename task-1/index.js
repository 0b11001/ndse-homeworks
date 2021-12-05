const fs = require("fs");
const readline = require("readline");
const HeadsAndTailsGame = require("./HeadsAndTailsGame");
const { stdin: input, stdout: output, argv, cwd } = require("process");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const logfile = argv[2];
if (!logfile) {
  process.exit(-1);
}

const ws = fs.createWriteStream(
  path.isAbsolute(logfile)
    ? path.normalize(logfile)
    : path.join(cwd(), logfile),
  {
    encoding: "utf-8",
    flags: "a+",
  }
);
ws.on("error", console.error);

const game = new HeadsAndTailsGame();

game.start();

rl.on("line", function (answer) {
  const number = parseInt(answer);
  if (isNaN(number)) {
    console.log("Введите число");
  } else {
    ws.write((game.check(number) ? "1" : "0") + "\n");
    game.start();
  }
});

rl.on("close", function () {
  game.abort();
  ws.close();
});
