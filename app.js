const express = require('express');
const ExifImage = require('exif').ExifImage;

const fs = require('fs');

const port = 8080;
const app = express();

app.use('/images', express.static('images'))

app.get("/", async (req, res) => {
  var images = fs.readdirSync('./images');
  var imagelinks = images.map(i => `<a href="images/${i}">${i}</a><br>`);
  res.end(imagelinks.join());
})

async function test() {
  var images = await fs.readdirSync('./images');
  console.log(images);
}

test();

app.listen(port);
console.log(`listening on ${port}`);