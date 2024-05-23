const express = require("express");
const app = express();
const sequelize = require("./util/database");

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );
  res.setHeader("Cross-origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-origin-Opener-Policy", "same-origin");
  next();
});

//models
const User = require("./models/user");

// router

const userRoutes = require("./routes/user");

app.use("/user", userRoutes);

const port = 3000;

sequelize
  //   .sync({ force: true })
  .sync()
  .then((result) => {
    app.listen(port);
    console.log("running on port 3000");
  })
  .catch((err) => {
    console.log("can not be connected to database", err);
  });
