const UserRepository = require("../data/repositories/userRepository");
const userRepository = new UserRepository();

class UserHandler {
  async addUser(req, res) {
    let { username } = req.body;
    let user = await userRepository.addUser(username);
    res.json({
      username: user.username,
      _id: user._id,
    });
  }

  async getUsers(req, res) {
    let users = await userRepository.getUsers();
    res.json(
      users.map((user) => ({
        username: user.username,
        _id: user._id,
      }))
    );
  }
}
module.exports = UserHandler;
