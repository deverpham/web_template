var angular = require('angular');
var app = angular.module('app', [])
        .controller('overview', ['$scope', function($scope) {
          $scope.willHigh = []
          $scope.willLow = []
            this.$onInit = function() {
              $.get('/api/market/aimarket', function(response) {
                 $scope.willHigh = response.message.willHigh;
                 $scope.willLow = response.message.willLow;
                 console.log(response.message)
                 $scope.$apply();
              })
            }
        }])
