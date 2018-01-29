(function () {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lunchCheck=0;
        $scope.isValid=true;
        $scope.evaluationMessage = "";
        $scope.parsed = [];

        // $scope.inputParser = function () {
        //     var parsed = $scope.lunch ? $scope.lunch.split(',') : [];
        //     $scope.lunchCheck = parsed.length;
        // };
        function inputParser(input) {
            var parsed = input ? input.split(',') : [];
            $scope.lunchCheck = parsed.length;
            $scope.parsed = parsed;
        };

        $scope.getEvaluation = function() {
            inputParser($scope.lunch);
            if ($scope.lunchCheck > 0) {
                if ($scope.lunchCheck < 4) {
                    $scope.evaluationMessage = "Enjoy!";
                    $scope.isValid = true;
                } else {
                    $scope.evaluationMessage = "Too Much!";
                    $scope.isValid = true;
                }
            } else {
                $scope.evaluationMessage = "Pleasea enter data first";
                $scope.isValid = false;
            }
            
        }
    }

})();