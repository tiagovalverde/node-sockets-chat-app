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

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the TigChat',
        createdAt: new Date().getTime()

    });
    
    socket.broadcast.emit('newMessage', {
        form: 'Admin',
        text: 'New user Joined',
        createdAt: new Date().getTime()
    })
    
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        //to everyone
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

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

