
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

socket.on('newLocationMessage', function(message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>')

    li.text(`${message.from}`);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);

});

// sends new message
$( "#message-form" ).submit(function( event ) {
    event.preventDefault();
    var messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('')
    })
});

let locationButton = $('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported for your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location ...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location!')
    });
});