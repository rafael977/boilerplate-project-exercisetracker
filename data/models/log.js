const { Schema, model } = require("mongoose");

const logSchema = new Schema({
  description: String,
  duration: Number,
  date: Date,
});

const Log = model("Log", logSchema);

module.exports = Log;
