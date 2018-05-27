const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.emit('newEmail', {
        from: 'tiago@test.com',
        text: 'New demo friday',
        createdAt: new Date().toString()
    });
    
    socket.on('createEmail', (newEmail) => {
        console.log('New email', newEmail);
    });

    socket.on('createMessage', (newMessage) => {
        console.log('New message', newMessage);
    });

    socket.emit('newMessage', {
        from: 'tiagov',
        text: 'Hey man. Whats app?',
        createdAt: new Date().toString()
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from server');
    });
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

