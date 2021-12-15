require("dotenv").config();

const http = require("http");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const showForecast = (city) => {
  const { API_KEY } = process.env;
  http
    .get(
      `http://api.weatherstack.com/forecast?access_key=${API_KEY}&query=${city}`,
      (res) => {
        if (res.statusCode !== 200) {
          console.error(res.statusCode);
          return;
        }

        res.setEncoding("utf8");
        let rawData = "";
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
            console.log(parsedData.forecast);
          } catch (e) {
            console.error(e.message);
          }
        });
      }
    )
    .on("error", (e) => {
      console.error(`Got error: ${e.message}`);
    });
};

rl.question("Which city should I get a forecast for? ", (answer) => {
  showForecast(answer);
  rl.close();
});
