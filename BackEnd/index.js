require("dotenv").config();
const express = require('express')
const app = express()
const port = 4000
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const MongoURl = process.env.MONGO_URL;
const mongoose = require("mongoose");
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const errorHandler = require("./Middleware/ErrorHandler");
const UserRouter = require("./Routes/UserRoutes");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
mongoose
  .connect(MongoURl)
  .then(() => {
    console.log("Connected!");
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.use('/api/v2/user',UserRouter);
app.use(errorHandler);
module.exports = app;