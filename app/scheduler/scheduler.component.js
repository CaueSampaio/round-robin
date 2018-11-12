'use strict';

// Register `scheduler` component, along with its associated controller and template
angular.
  module('scheduler').
  component('scheduler', {
    templateUrl: '../index.html',
    controller: ['Scheduler',
      function SchedulerController() {
        console.log("Teste")
      }
    ]
  });
