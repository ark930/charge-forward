var express = require('express');
var router = express.Router();

var net = require('net');
var HOST = '0.0.0.0';
var PORT = 8880;
var sockets = [];

router.post('/', function(req, res, next) {
    if (sockets.length > 0) {
        for(var i = 0; i < sockets.length; i++)
        {
            try {
                sockets[i].write(JSON.stringify(req.body));
            } catch (err) {
                console.log(err.message);
            }
        }
        res.send(req.body);
    } else {
        res.status(400).send('Socket not connected');
    }
});

var server = net.createServer();
server.listen(PORT, HOST);
server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    sockets.push(sock);
});

server.on('end', function(sock) {
    console.log('CLOSE: ' + sock.remoteAddress +':'+ sock.remotePort);
    for(var i = 0; i < sockets.length; i++)
    {
        if(sockets[i] == sock)
        {
            sockets[i].splice(i, 1);
        }
    }
});

module.exports = router;