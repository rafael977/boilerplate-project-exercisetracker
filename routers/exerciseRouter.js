const express = require("express");
const handlers = require("../handlers");
const Repository = require("../data/repository");

const repository = new Repository();
const userHandler = new handlers.UserHandler(repository);
const logHandler = new handlers.LogHandler(repository);

const router = express.Router();

router.get("/users", userHandler.getUsers.bind(userHandler));

router.post("/new-user", userHandler.addUser.bind(userHandler));

router.post("/add", logHandler.addLog.bind(logHandler));

router.get("/log", userHandler.getUserWithLogs.bind(userHandler));

module.exports = router;
