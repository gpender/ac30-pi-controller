var app = angular.module('ac30-pi',[]);

app.controller('controller',['$scope','socket','$window',function($scope,socket,window){
    var vm = this;
    vm.guy = 'hello';
    vm.drives=[];
    window.onload= function() { 
        vm.scanDrives();
    };

    socket.on('driveFound',function(drive){
        console.log(drive);
        vm.drives.push(JSON.parse(drive));
    });

    vm.scanDrives = function(){
        vm.drives=[];
        socket.emit('scanDrives');
    };
}]);


