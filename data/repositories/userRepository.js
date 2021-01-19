const User = require("../models/user.js");

class UserRepository {
  async addUser(username) {
    let user = new User({ username });
    await user.save();
    return user;
  }

  async getUsers() {
    return await User.find({}).exec();
  }
}

module.exports = UserRepository;
