const User = require("./models/user");
const Log = require("./models/log");

class Repository {
  async addUser(username) {
    let user = new User({ username });
    await user.save();

    return user;
  }

  getUsers() {
    return User.find().exec();
  }

  async addLog({ userId, description, duration, date }) {
    if (!date) {
      date = new Date();
    }
    let user = await User.findById(userId).exec();
    if (!user) {
      return new Error("User not  found");
    }
    let log = new Log({ description, duration, date });
    await log.save();
    user.logs.push(log);
    await user.save();

    return user;
  }

  getUserWithLogs(userId, from, to, limit) {
    let dateFilter = {};
    if (from) {
      !("date" in dateFilter) && (dateFilter.date = {});
      dateFilter.date["$gte"] = from;
    }
    if (to) {
      !("date" in dateFilter) && (dateFilter.date = {});
      dateFilter.date["$lte"] = to;
    }
    return User.findById(userId)
      .populate({
        path: "logs",
        match: dateFilter,
        limit: limit,
      })
      .exec();
  }
}

module.exports = Repository;
