var socket = io();


var scanButton = jQuery('#scan-drives');
scanButton.on('click',()=>{
        socket.emit('scanDrives');
    });

socket.on('connect',function(){
    console.log('Socket connected');
    // var params = jQuery.deparam(window.location.search);
    // socket.emit('join',params, function(error){
    //     if(error){
    //         alert(error);
    //         window.location.href='/';
    //     }else{
    //         console.log('Joined Room');
    //     }
    // });
});
socket.on('driveFound',function(drive){
    console.log(drive);
})