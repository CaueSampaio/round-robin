angular.
    module('schedulerApp').
    controller('SchedulerController', ['$scope', function($scope) {
        
        $scope.clock = 0;
        $scope.processes = [];
        $scope.queue = [];
        $scope.memory = [60, 30, 10];
        $scope.memoryLeft = $scope.memory[0];

        $scope.defineQuantum = function() {
            $scope.lockQuantum = true;
        }
        
        $scope.addProcess = function() {
            let process = {
                arrival: $scope.newProcess.arrival,
                time: $scope.newProcess.time,
                name: 'P ' + ($scope.processes.length + 1)
            }
            if(process.time <= $scope.memoryLeft) {
                $scope.processes.push(process);
                $scope.memoryLeft -= process.time; 
            }
            $scope.newProcess = {};
        }

        $scope.init = function() {
            $scope.running = true;
        }

        $scope.nextProcess = function() {
            $scope.clock = $scope.clock + parseInt($scope.quantum);
            $scope.processes.forEach(function(item, index) {
                if($scope.clock >= item.arrival) {
                    $scope.queue.push(item);
                    $scope.processes.splice(index, 1)

                }
            })
        }
}])