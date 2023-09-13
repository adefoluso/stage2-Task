const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const app = express();

const { PORT } = require("./config/serverConfig");

const routes = require("./routes/person");

const setupAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(logger("dev"));
  app.use(express.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", routes);
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

setupAndStartServer();
