const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");

const passport = require("passport");
const path = require("path");
const users=require("./routes/api/user")

const app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//db configuration
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo connection successful"))
  .catch((err) => console.log("err"));

mongoose.set("useFindAndModify",false)
mongoose.Promise=global.Promise

app.use(passport.initialize())
require("./middleware/passport")(passport)
app.use("/api/users",users)
app.use("/api/posts",require("./routes/api/post"))

if(process.env.NODE_ENV==="production"){
  app.use(express.static("client/build"))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","build","index.html"))
  })
}

// app.get("/", (req, res) => {
//   res.send("hello");
// });
// app.post("/user", (req, res) => {
//   console.log(req.body);
//   res.send(req.body);
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server port ${PORT}`);
});
