const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = {
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
};

const PostSchema = new Schema(post)
module.exports =mongoose.model("posts",PostSchema)