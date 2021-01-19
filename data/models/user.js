const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  logs: [{ type: Schema.Types.ObjectId, ref: "Log" }],
});

const user = model("User", userSchema);

module.exports = user;
