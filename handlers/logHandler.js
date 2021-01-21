class LogHandler {
  constructor(repository) {
    this.repository = repository;
  }

  async addLog(req, res) {
    let body = req.body;
    let log = await this.repository.addLog(body);
    res.json({
      _id: log._id,
      username: log.user.username,
      description: log.description,
      duration: log.duration,
      date: log.date.toDateString(),
    });
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

module.exports = LogHandler;
