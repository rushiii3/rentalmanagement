require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserRouter = require("./Routes/UserRoutes");
const PropertyRouter = require("./Routes/PropertyRoutes");
const ReviewRouter = require("./Routes/ReviewRoutes");
const PhysicalVisitRouter = require('./Routes/PhysicalVisitRoutes');
const VideoConferenceRouter = require('./Routes/VideoConferenceRoutes');
const PropertyBooking = require('./Routes/BookingRoutes');
const Admin = require("./Routes/AdminRoute");
const Report = require("./Routes/Report");
const port = process.env.PORT || 4000;
const MongoURL = process.env.MONGO_URL;
const production = false;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: `${
      !production
        ? "http://localhost:3000"
        : "https://rentalmanagement-omega.vercel.app"
    }`,
    credentials: true,
  })
);
app.use("/t", (req, res) => {
  res.status(200);
  throw new Error("fake error");
  // res.send("Heyyy");
});
// MongoDB connection
mongoose
  .connect(MongoURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.use("/api/v2/user", UserRouter);
app.use("/api/v2/property", PropertyRouter);
app.use("/api/v2/review", ReviewRouter);
app.use("/api/v2/physical-visit", PhysicalVisitRouter);
app.use("/api/v2/video-conference", VideoConferenceRouter);
app.use("/api/v2/property-booking", PropertyBooking);
app.use("/api/v2/admin", Admin);
app.use("/api/v2/report", Report);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .json({
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
      statuscode: statusCode,
    });
});
module.exports = app;
