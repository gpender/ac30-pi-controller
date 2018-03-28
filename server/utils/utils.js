var hexChar = ["0", "1", "2", "3", "4", "5", "6", "7","8", "9", "A", "B", "C", "D", "E", "F"];

var arrayBufferToString = (buffer) => {
    var str='';
    var length = buffer.length;
    for (var i=0; i < length; i++) {
        if(i == 0){
            str = byteToHex(buffer[i]);
        }
        else{
            str = str + byteToHex(buffer[i]);
        }
    }
    return str;
};

function byteToHex(b) {
    return hexChar[(b >> 4) & 0x0f] + hexChar[b & 0x0f];
}

module.exports = {arrayBufferToString};