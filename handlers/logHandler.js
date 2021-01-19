class LogHandler {
  constructor(repository) {
    this.repository = repository;
  }

  async addLog(req, res) {
    let body = req.body;
    let user = await this.repository.addLog(body);
    res.json(user);
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
    let resBody = { ...user._doc };

    delete resBody.__v;
    resBody.count = resBody.logs.length;
    resBody.logs = resBody.logs.map((log) => {
      delete log.__v;
      return log;
    });
    res.json(resBody);
  }
}

module.exports = LogHandler;
