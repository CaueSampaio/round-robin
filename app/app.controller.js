angular.
    module('schedulerApp').
    controller('SchedulerController', ['$scope', function ($scope) {

        $scope.clock = 0;
        $scope.processes = [];
        $scope.processor = null;
        $scope.queue = [];
        $scope.done = [];
        $scope.remainingQuantum;
        $scope.memory = [40, 35, 25];
        $scope.memoryAdresses = [
            {
                'Location': 'M1',
                'Space': 50 
            },
            {
                'Location': 'M2',
                'Space': 30
            },
            {
                'Location': 'M3',
                'Space': 20
            }
        ];
        $scope.memoryLeft = $scope.memory[0];

        $scope.defineQuantum = function () {
            $scope.lockQuantum = true;
        }

        $scope.checkWorstFit = function(processTime) {
            let selectedLocation;
            if($scope.checkMemoryAvailable()) {
                selectedLocation = $scope.memoryAdresses.find(function(item) {
                    return item.Space > processTime;
                })
            } else return false
        }

        $scope.checkMemoryAvailable = function() {
            let flag = false;
            flag = $scope.memoryAdresses.some(function(item, index) {
                return item.Space >= $scope.newProcess.time;
            })
            return flag;
        }

        $scope.addProcess = function () {
            let process = {
                arrival: $scope.newProcess.arrival,
                time: $scope.newProcess.time,
                name: 'P ' + ($scope.processes.length + 1),
                location: $scope.checkWorstFit($scope.newProcess.time)
            }
            if (process.time <= $scope.memoryLeft) {
                $scope.processes.push(process);
                $scope.memoryLeft -= process.time;
            }
            $scope.newProcess = {};
        }

        $scope.init = function () {
            $scope.running = true;
        }

        $scope.nextStep = function () {
            if($scope.queue.length > 0 && ($scope.remainingQuantum == 0 || (!!$scope.processor && $scope.processor.time == 0))) {
                queueProcessor();
            }
            $scope.remainingQuantum = $scope.quantum;
            if(!!$scope.processor) {
                const newTime = $scope.clock + $scope.quantum;
            }
            while ($scope.remainingQuantum >= 0 ) {
                if($scope.queue.length > 0) queueProcessor();
                $scope.clock++;
                if(!!$scope.processor) $scope.remainingQuantum--;
                addToQueue();
                if(!!$scope.processor && $scope.processor.time > 0) $scope.processor.time--;
                if (!!$scope.processor && $scope.processor.time == 0) {
                    processorToDone();
                    break
                }
            }
        }

        let addToQueue = function () {
            if(!!$scope.processes && $scope.processes.length > 0)
            $scope.processes.forEach(function (item, index) {
                if ($scope.clock >= item.arrival) {
                    item.queue = Object.assign($scope.clock)
                    $scope.queue.push(item);
                    $scope.processes.splice(index, 1);
                }
            })
        }

        let queueProcessor = function () {
            if ($scope.processor == null && $scope.queue.length > 0) {
                $scope.processor = Object.assign($scope.queue[0]);
                $scope.queue.splice(0, 1);
            } else if (!!$scope.processor && $scope.quantum >= $scope.processor.time) {
                $scope.processor = Object.assign($scope.processor);
            } else if (!!$scope.processor && $scope.queue.length > 0 && $scope.remainingQuantum == 0) {
                $scope.queue.push(Object.assign($scope.processor));
                $scope.processor = Object.assign($scope.queue[0]);
                $scope.queue.splice(0, 1);
            }
        }
        
        let processorToDone = function () {
            debugger
            $scope.processor.done = $scope.clock;
            $scope.done.push(Object.assign($scope.processor));
            $scope.processor = null;
        }
    }])