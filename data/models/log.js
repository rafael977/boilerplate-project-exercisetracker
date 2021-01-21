const { Schema, model } = require("mongoose");
const User = require("./user");

const logSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  description: String,
  duration: Number,
  date: Date,
});

const Log = model("Log", logSchema);

module.exports = Log;
