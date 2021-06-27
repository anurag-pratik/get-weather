const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
require("dotenv").config()

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/", function (req, res) {
  const city = req.body.cityName;

  const key = process.env.API_KEY;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    key +
    "&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode);
    if (response.statusCode == 200) {
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const feel = weatherData.main.feels_like;
        const desc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imgsrc = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.render("result", {
          city: city,
          temp: temp,
          feel: feel,
          desc: desc,
          imgsrc: imgsrc,
        });
      });
    }
    else{
      res.redirect("/");
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);
