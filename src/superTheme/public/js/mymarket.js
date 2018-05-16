const angular = require('angular');
require('./every/main');
const app = angular.module('app', [])
    .controller('mymarket', ['$scope', function($scope) {
        $scope.markets = []
        this.$onInit = function() {
            $.get('/api/market/mymarket', function(response) {
                $scope.markets = response.message;
                $scope.$apply();
                console.log(response.message)
            })
        }
    }])