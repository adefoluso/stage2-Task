const express = require("express");
const router = express.Router();

const PersonRoute = require("./person");

router.use("/", PersonRoute);

module.exports = router;
