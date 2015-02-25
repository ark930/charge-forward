var express = require('express');
var router = express.Router();

var net = require('net');
var HOST = '0.0.0.0';
var PORT = 8880;
var socket;

router.post('/', function(req, res, next) {
    if (socket) {
        socket.write(JSON.stringify(req.body));
        res.send(req.body);
    } else {
        res.status(400).send('Socket not connected');
    }
});

var server = net.createServer();
server.listen(PORT, HOST);
server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    socket = sock;
});

module.exports = router;