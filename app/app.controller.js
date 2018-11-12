angular.
    module('schedulerApp').
    controller('SchedulerController', ['$scope', function($scope) {
        
        $scope.processes = [];
        $scope.addProcess = function() {
            let process = {
                arrival: $scope.newProcess.arrival,
                time: $scope.newProcess.time
            }
            $scope.processes.push(process);
            $scope.newProcess = {};
        }
}])