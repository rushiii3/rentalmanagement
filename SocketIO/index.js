// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'https://rentalmanagement-omega.vercel.app'
  }
});

app.get('/api/send-message', (req, res) => {
     res.status(200).json({ success: true, message: 'Message sent to all clients' });
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

const PORT =  3500;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
