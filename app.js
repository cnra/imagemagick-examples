const express = require('express');
var im = require('imagemagick');

const util = require('util');
const fs = require('fs');

const port = process.env["port"] | 8080;
const app = express();

app.use('/images', express.static('images'))

app.get("/", async (req, res) => {
  var images = fs.readdirSync('./images');
  var imagelinks = images.map(i => `<a href="exif/${i}">exif</a> <a href="images/${i}">${i}</a>`);
  res.end(imagelinks.join("<br />"));
})

app.get("/exif/:fn", async (req, res) => {
  let fn = req.params["fn"];
  im.identify(`./images/${fn}`, function (err, info) {
    if (err) res.end(err.message);
    res.json(info);
  })
});

app.listen(port);
console.log(`listening on ${port}`);