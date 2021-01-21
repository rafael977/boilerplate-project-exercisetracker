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
}

module.exports = LogHandler;
