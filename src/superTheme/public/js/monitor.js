const angular = require('angular');
require('./every/main');

var app = angular.module('app',[])
    .controller('app', ['$scope', function($scope) {
        $scope.status = '';
        $scope.displayStatus = false;
        $scope.history = [];
        $scope.control = function() {
            var start = $('#control').attr('data');
            $.post('/api/control', {start: start}, function(data) {
                if(start == 'start') {
                    $('#control').attr('data',' stop');
                    $('#control').text('STOP');
                    $('#control').removeClass('btn-success');
                    $('#control').addClass('btn-danger');
                } else {
                    $('#control').attr('data', 'start');
                    $('#control').text('START');
                    $('#control').removeClass('btn-danger');
                    $('#control').addClass('btn-success');
                }
                $scope.status = data.message;
                $scope.displayStatus = true;
                $scope.$apply();
            })
            .fail(function(response) {
                alert('Error:' + response.responseText);
            })
        }
        var loadHistory = function() {
    
            $.get('/api/history', function(data) {
                $scope.history = data.message;
                $('table').addClass('animated update')
                $scope.$apply();
                setTimeout(function() {
                    $('table').removeClass('animated update')
                    loadHistory();  
                }, 3000)
            })
        }
        loadHistory();
    }])

