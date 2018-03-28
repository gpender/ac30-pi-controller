const events = require('events');
const dgram = require('dgram');

const DCT_PORT = 64195;
const dctBuf = new Buffer([0x44, 0x43, 0x54, 0x00, 0x03, 0x01, 0x00, 0x00, 0x52, 0x45, 0x51, 0x20, 0x44, 0x65, 0x74, 0x61, 0x69, 0x6c, 0x73, 0x00, 0x00, 0x00, 0x52, 0x01, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00]);
    
const {Drive} = require('./drive');

const dctClient = dgram.createSocket('udp4');
var driveScanEventEmitter = new events.EventEmitter();

dctClient.bind(DCT_PORT, "0.0.0.0",function() {
    dctClient.setBroadcast(true);
});

dctClient.on('listening',()=>{
    console.log('Listening for drive messages');
});

dctClient.on('message', function (message, remote) {
    if(message.length !== dctBuf.length){
        var driveInfo = new Drive(message).toJSON();
        //console.log(driveInfo);
        if(driveInfo.identifier === "DCT")
        {
            // Fire the found drive event 
            driveScanEventEmitter.emit('driveFound',driveInfo);
        }        
    }
});

scanDrives = ()=> {
    dctClient.send(dctBuf,0,dctBuf.length, DCT_PORT, '255.255.255.255', function(err) 
    {});
} 

module.exports = {scanDrives,driveScanEventEmitter};