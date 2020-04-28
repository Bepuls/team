const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true ,useUnifiedTopology:true})
  .then(() => console.log("Mongo connection successful"))
  .catch((err) => console.log("err"));
app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/user", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});
app.listen(PORT, () => {
  console.log(`server port ${PORT}`);
});
