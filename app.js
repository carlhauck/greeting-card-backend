const express = require("express");
const bodyParser = require('body-parser');
const db = require(`${process.env.DATABASE_URL}/images`);
var port = process.env.PORT || 3000;
var cors = require('cors');

// const http = require("http").Server(Express);

var app = express();

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.json("Hello world!");
});

// IMAGE ROUTES
app.get("/images", db.getImages);
app.get("/images/:id", db.getImageById);