
require('./every/main.js')
const  handingError = require('./service/handingError');
$(document).ready(onPageReady)

function onPageReady() {
    $('#testconnect').click(function() {
        $.get('/api/testconnect', function(data) {
            alert('connect successfully. go to start bot')
        })
        .fail(function(xhr) {
            console.log(xhr.responseText)
            alert(xhr.responseText)
        })
    })
}
var angular = require('angular');
var app = angular.module('app', [])
.controller('app',[ '$scope', function($scope) {
    $scope.password = '';
    $scope.isLock = true;
    $scope.checkPassword = function() {
        $.post('/checkpassword', {
            password: $scope.password
        }, function(data) { 
            $scope.isLock = false;
            $scope.password = '';
            $scope.$apply();
            alert(' unlocked ')
        })
        .fail(err =>  handingError(err))
    }
}])
.directive("showpassword", function() { 
    
    return function linkFn(scope, elem, attrs) {
        scope.$watch(attrs.showpassword, function(newValue) {
            if (newValue) {
                elem.attr("type", "password");
            } else {
                elem.attr("type", "text");
            };
        });
    };

});
