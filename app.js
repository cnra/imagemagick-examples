const express = require('express');
const ExifImage = require('exif').ExifImage;

const port = 8080;
const app = express();

app.get("/", (req, res) => {
  res.end("hi")
})


app.listen(port);
console.log(`listening on ${port}`);