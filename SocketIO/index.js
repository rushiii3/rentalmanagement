// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const serverLink = "https://rentalmanagement-omega.vercel.app";
const localhostLink = "http://localhost:3000";
const io = socketIO(server, {
  cors: {
    origin:  "http://localhost:3000"
  }
});

const users = {};

io.on('connection', (socket) => {
  // Handle user authentication (replace with your actual authentication logic)
  socket.on('authenticate', (username) => {
    console.log('Received authentication request with username:', username);
    users[username] = socket;
    console.log(`${username} authenticated.`);
  });

  // Handle chat messages
  socket.on('chat-message', (msg, recipientUsername) => {
    console.log(`Message from ${msg.username}: ${msg.message} to ${msg.recipient}`);

    // If recipientUsername is not provided, it means it's a group message
    if (!recipientUsername) {
      // Emit the message to all connected clients (group chat)
      console.log(msg);
      io.emit('group-message', {
        sender: msg.username,
        message: msg.message,
        profile: msg.profile,
        id:msg.id,
        time:msg.time
      });
    } else {
      // Otherwise, it's a one-to-one message
      // Check if the recipient is online
      const recipientSocket = users[recipientUsername];
      if (recipientSocket) {
        // Generate a unique private room name based on usernames
        const roomName = [msg.username, recipientUsername].sort().join('-');
        console.log(roomName);
        // Join the private room
        socket.join(roomName);
        recipientSocket.join(roomName);

        // Emit the message to the private room
        io.to(roomName).emit('private-message', {
          sender: msg.username,
          message: msg.message
        });
      } else {
        console.log(`${recipientUsername} is not online.`);
      }
    }
  });

  socket.on('disconnect', (reason) => {
    console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
    // Remove the user from the users object when they disconnect
    for (const [username, userSocket] of Object.entries(users)) {
      if (userSocket === socket) {
        delete users[username];
        break;
      }
    }
  });
});


const PORT =  3500;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
