const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
});

const user = model("User", userSchema);

module.exports = user;
