
var angular = require('angular');

const handingError = require('./service/handingError');
var app = angular.module('app', [])
app.controller('app', ['$scope', function($scope) {
    $scope.user = {};
    $scope.login = () => {
        $.post('/login', {
            username: $scope.user.username,
            password: $scope.user.password
        }, (data) => {
            window.location.href='/monitor'
        })
        .fail(err => handingError(err))
    }
}])