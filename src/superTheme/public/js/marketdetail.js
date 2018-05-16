var angular = require('angular');
var handingError = require('./service/handingError');
require('./every/main.js');
var app = angular.module('app', [])
    .controller('history', ['$scope', function($scope) {
        $scope.history = []
        this.$onInit = function() {
            $.get('/api/market/' + MARKET_NAME+ '/history', function(response) {
                $scope.history = response.message;

                $scope.$apply();
                console.log(response)
            })
            .fail(err => handingError(err))
        }
    }])
