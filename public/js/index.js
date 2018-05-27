let socket = io(); //initiate a request fe to be

socket.on('connect', () => {
    console.log('Connected to the server');

    socket.emit('createEmail', {
        to: 'jonas@benfica.com',
        text: 'Nao deu po penta poooo'
    });

    socket.emit('createMessage', {
        to: 'jonas10',
        text: 'Wakanda Forever'
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newEmail', (email) => {
    console.log('New Email', email);
});

socket.on('newMessage', (message) => {
    console.log('New message', message);
});
