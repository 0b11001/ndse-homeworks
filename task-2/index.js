const fs = require("fs");
const path = require("path");
const { argv, cwd } = require("process");

const logfile = argv[2];
if (!logfile) {
  process.exit(-1);
}

const rs = fs.createReadStream(
  path.isAbsolute(logfile)
    ? path.normalize(logfile)
    : path.join(cwd(), logfile),
  {
    encoding: "utf-8",
  }
);

const stats = {
  wins: 0,
  losses: 0,
  ratio: 0,
};

rs.on("data", function (data) {
  const results = data.split("\n").filter(Boolean);
  stats.wins += results.filter((i) => i === "1").length;
  stats.losses += results.filter((i) => i === "0").length;
  stats.ratio = Math.floor((stats.wins / (stats.wins + stats.losses)) * 100);
});

rs.on("close", function () {
  console.log(stats);
});

rs.on("error", console.error);
