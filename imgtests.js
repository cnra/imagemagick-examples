const express = require("express");
const imagemagick = require("imagemagick");

const util = require("util");
const fs = require("fs");
const identify = util.promisify(imagemagick.identify);

const port = process.env["port"] || 8080;
const app = express();

require('express-async-errors');

app.use("/images", express.static("images"));

app.get("/", async (req, res, next) => {
  throw new Error("mmm vvv");
  var images = fs.readdirSync("./images");
  var imagelinks = images.map(
    (i) =>
      `<a style='border: 1px solid #000; padding: 3px' href="info/${i}">info</a> 
       <a href="images/${i}">${i}</a>`
  );
  res.end(imagelinks.join("<br />"));
});

app.get("/info/:fn", async (req, res) => {
  let fn = req.params["fn"];

  let info = await identify(`./images/${fn}`);

  delete info["channel statistics"];
  delete info["image statistics"];
  delete info["artifacts"];
  if (info["properties"]) delete info["properties"]["date:create"];
  if (info["properties"]) delete info["properties"]["date:modify"];
  if (info["properties"]) delete info["properties"]["date:delete"];
  if (info["properties"]) delete info["properties"]["signature"];
  res.json(info);
});

app.listen(port);
console.log(`listening on ${port}`);
