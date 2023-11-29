require("dotenv").config();
const express = require('express');
const app = express();const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserRouter = require('./Routes/UserRoutes');

const port = process.env.PORT || 4000;
const MongoURL = process.env.MONGO_URL;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://rentalmanagement-omega.vercel.app/',
  credentials: true,
}));
app.use('/t', (req,res) => {
  res.status(200);
  throw new Error("fake error");
  // res.send("Heyyy");
})
// MongoDB connection
mongoose.connect(MongoURL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.use('/api/v2/user', UserRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({message:err.message, stack:process.env.NODE_ENV === "development" ? err.stack : null,statuscode : statusCode});

});
module.exports = app;
