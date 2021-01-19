class UserHandler {
  constructor(repository) {
    this.repository = repository;
  }

  async addUser(req, res) {
    let { username } = req.body;
    if (!username) {
      res.status(400).json({ error: "Username is required" });
      return;
    }
    let user = await this.repository.addUser(username);
    res.json({
      username: user.username,
      _id: user._id,
    });
  }

  async getUsers(req, res) {
    let users = await this.repository.getUsers();
    res.json(
      users.map((user) => ({
        username: user.username,
        _id: user._id,
      }))
    );
  }
}
module.exports = UserHandler;
