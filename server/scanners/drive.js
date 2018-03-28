const {arrayBufferToString} = require('../utils/utils');

class Drive{
    constructor(message){
        this.message = message;
        this.parseDriveInfo(message);
    }

    parseDriveInfo(message)
    {
        this.identifier = String.fromCharCode.apply(null, message.slice(0,3));
        var tmp = String.fromCharCode.apply(null, message.slice(72,92));
        this.name = tmp.replace(/\0[\s\S]*$/g,'');
        this.macId = arrayBufferToString(message.slice(32,38));
        this.ipAddress = message[56] + '.' + message[57] + '.' + message[58] + '.' + message[59];
        this.fwVersion = message[104] + '.' + message[105] + '.' + message[107] + '.' + message[106];
        this.driveType = "AC30" + String.fromCharCode(message[6]);
    }
    toJSON() {
        return {
            name: this.name,
            macId: this.macId,
            identifier: this.identifier,
            ipAddress: this.ipAddress,
            fwVersion: this.fwVersion,
            driveType: this.driveType
        };
    }
}

module.exports = {Drive};