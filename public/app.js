var app = angular.module('ac30-pi',[]);

app.controller('controller',['$scope',function($scope){
    var socket = io();
    var vm = this;
    vm.guy = 'hello';

    socket.on('driveFound',function(drive){
        console.log(drive);
        vm.guy = drive;
    });

    vm.scanDrives = function(){
        socket.emit('scanDrives');
    };
}])