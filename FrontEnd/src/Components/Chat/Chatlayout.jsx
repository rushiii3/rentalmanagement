import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatLayout = () => {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('https://socketio-rental.onrender.com');

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('message', (data) => {
      setReceivedMessage(data);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', message);
      setMessage('');
    } else {
      console.error('Socket connection not available');
    }
  };

  return (
    <div>
      <h1>Socket.IO Example</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
      <p>Received message: {receivedMessage}</p>
    </div>
  );
};

export default ChatLayout;
