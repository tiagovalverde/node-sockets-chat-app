const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to TigChat'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined TigChat'))
    
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        //to everyone
        io.emit('newMessage', generateMessage(message.from, message.text));

        callback('this is form the server');
        //  // send to evrybody except this socket
        //  socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from server');
    });
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

