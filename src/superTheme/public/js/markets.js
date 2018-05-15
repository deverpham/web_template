var angular = require('angular');
var app = angular.module('app', [])
    .controller('btc', ['$scope', function($scope) {
        console.log('gg')
        $scope.data=[]
        this.$onInit = function() {
            setInterval(() => {
                $.get('/api/market/btchighvolume', function(data) {
                    $scope.data = data.message;
                    $scope.$apply();
                })
            }, 2000)
        }
    }])