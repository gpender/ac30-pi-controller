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

app.factory('socket', function ($rootScope) {
    var socket = io.connect();
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {  
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
});


