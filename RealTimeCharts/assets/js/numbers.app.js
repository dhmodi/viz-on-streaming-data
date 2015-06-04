/**
 * 
 */

angular.module('numbers.app', ['d3.directives', 'numbers.directives'])
  .controller('NumbersCtrl', ['$scope', function($scope) {
    function createWebSocket() {
      var host = window.location.hostname;
      if (host == '') host = '192.168.234.134';
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
