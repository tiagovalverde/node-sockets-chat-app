
let socket = io(); //initiate a request fe to be

socket.on('connect', function () {
    console.log('Connected to the server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// waiting to receive a message
socket.on('newMessage', function  (message) {
    console.log('New message', message);

    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

// sends new message
$( "#message-form" ).submit(function( event ) {
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function () {

    })
  });
