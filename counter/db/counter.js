const path = require("path");
const fs = require("fs");

const DB_FILE = process.env.DB_PATH
  ? path.join(process.env.DB_PATH, "counter.json")
  : null;

let counter = {};

if (DB_FILE) {
  if (!fs.existsSync(DB_FILE)) {
    writeToFile(DB_FILE, counter);
  }
  counter = JSON.parse(fs.readFileSync(DB_FILE));
}

function writeToFile(file, data) {
  if (file) {
    fs.writeFileSync(file, JSON.stringify(data), { flag: "w" });
  }
}

module.exports = {
  all: () => counter,
  get: (id) => counter[id] || 0,
  incr: (id) => {
    const newCount = (counter[id] || 0) + 1;
    counter[id] = newCount;
    writeToFile(DB_FILE, counter);
    return newCount;
  },
};
