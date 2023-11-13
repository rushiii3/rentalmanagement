require("dotenv").config();
const express = require('express')
const app = express()
const port = 4000
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const errorHandler = require("./Middleware/ErrorHandler");
const UserRouter = require("./Routes/UserRoutes");
app.use('/api/v2/user',UserRouter);
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
app.use(errorHandler);
module.exports = app;