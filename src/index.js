const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { PORT } = require("./config/serverConfig");

const v1Router = require("./routes/index");

const setupAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(logger("dev"));
  app.use(express.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", v1Router);
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

setupAndStartServer();
