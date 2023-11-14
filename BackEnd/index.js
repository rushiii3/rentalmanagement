require("dotenv").config();
const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorHandler = require('./Middleware/ErrorHandler');
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

// Socket.IO setup
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'https://rentalmanagement-omega.vercel.app/'
  }
});
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (data) => {
    console.log('Message from client:', data);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// MongoDB connection
mongoose.connect(MongoURL)
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.use('/api/v2/user', UserRouter);
app.use(errorHandler);

module.exports = app;
