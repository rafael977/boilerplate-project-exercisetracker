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

  async getUserWithLogs(req, res) {
    let { userId, from, to, limit } = req.query;
    if (!userId) {
      res.status(400).json({ error: "UserId is required" });
      return;
    }
    let user = await this.repository.getUserWithLogs(
      userId,
      from,
      to,
      parseInt(limit)
    );

    let resBody = { _id: user._id, username: user.username };

    if (from) {
      resBody.from = new Date(Date.parse(from)).toDateString();
    }
    if (to) {
      resBody.to = new Date(Date.parse(to)).toDateString();
    }
    resBody.count = user.logs.length;
    resBody.log = user.logs.map((log) => ({
      description: log.description,
      duration: log.duration,
      date: log.date.toDateString(),
    }));
    res.json(resBody);
  }
}
module.exports = UserHandler;
