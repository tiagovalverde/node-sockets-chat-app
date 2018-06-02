const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and nameroom are required');
        }

        socket.join(params.room);
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to TigChat'));
        socket.broadcast
            .to(params.room)
            .emit('newMessage', generateMessage('Admin', `${params.name} join the room`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        //to everyone
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords => {
        io.emit('newLocationMessage', 
            generateLocationMessage('Admin', coords.latitude, coords.longitude));
    }));

    socket.on('disconnect', () => {
        console.log('User disconnected from server');
    });
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

