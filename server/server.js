const http = require('http');
const express = require('express');
const dgram = require('dgram');
const socketIO = require('socket.io');
const path = require('path');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

var io = socketIO(server);
    
const {scanDrives} = require('./scanners/drive-scanner');
const {driveScanEventEmitter} = require('./scanners/drive-scanner');

driveScanEventEmitter.on('driveFound',(drive)=>{
    io.emit('driveFound',JSON.stringify(drive));
    console.log('event fired drive found' + JSON.stringify(drive));
});

io.on("connection",(socket)=>{
    console.log("Socket connected ", socket.id);
    socket.on('scanDrives',()=>{
        scanDrives();
    });
    socket.on('disconnect',()=>{
        console.log("Socket disconnected");
    })
});

app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})