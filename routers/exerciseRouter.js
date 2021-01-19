const express = require("express");
const handlers = require("../handlers");

const router = express.Router();

const userHandler = new handlers.UserHandler();

router.get("/users", userHandler.getUsers);

router.post("/new-user", userHandler.addUser);

module.exports = router;
