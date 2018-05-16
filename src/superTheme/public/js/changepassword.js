require('./every/main.js')
const angular = require('angular')
const handingError = require('./service/handingError');
var app  = angular.module('app', [])
    .controller('app', ['$scope', function($scope) {
        $scope.user = {}
        $scope.change = function() {
            $.post('/changepassword', {
                oldpassword: $scope.user.oldpassword,
                newpassword: $scope.user.newpassword
            }, function(data) {
                alert('change password successfully');
            })
            .fail(err => handingError(err))
        }
    }])