'use strict';

angular.
  module('schedulerApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/scheduler', {
          template: '<scheduler></scheduler>'
        }).
        otherwise('/scheduler');
    }
  ]);
