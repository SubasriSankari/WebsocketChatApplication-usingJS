var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
});

io.sockets.on('connection', (socket) => {
    console.log('User Online');

    socket.on('codeboard-message', (msg) => {
        console.log('message: ' + msg);
        socket.broadcast.emit('message-from-others', msg);
    });

});

//var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
http.listen(3000, () => {
    console.log('listening on *:' + 3000);
});