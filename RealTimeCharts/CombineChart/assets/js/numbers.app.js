/**
 *
 */

angular.module('numbers.app', ['d3.directives', 'numbers.directives'])
  .controller('NumbersCtrl', ['$scope', function($scope) {
    function createWebSocket() {
     // var host = window.location.hostname;
     var host = '10.12.176.11';
     //  if (host == '') host = '10.118.36.90';
      var uri = 'ws://' + host + ':9292';

      var Socket = "MozWebSocket" in window ? MozWebSocket : WebSocket;
      return new Socket(uri);
    }

    $scope.numbers = {};
    $scope.expression = "{evendistr 25 [0..100]} forever every 1000ms";
    $scope.running = false;

    var socket = null;
    $scope.stop = function() {
      if (socket != null) socket.close();
      socket = null;
      $scope.running = false;
    };

    $scope.executeExpression = function() {
      if (socket != null) socket.close();
      socket = createWebSocket("/");
      socket.onopen = function(e) {
        socket.send($scope.expression);
        $scope.running = true;
      }
      socket.onclose = function(e) { console.log(e); }
      socket.onerror = function(e) { console.log(e); }
      socket.onmessage = function(e) {
        $scope.$apply(function() {
          $scope.numbers = e.data;
        });
      };
    };

  }]);
