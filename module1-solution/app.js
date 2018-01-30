(function () {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.isValid=true;
        $scope.evaluationMessage = "";

        function inputParser(input) {
            $scope.lunchCheck = 0;
            if (input) {                
                var parsed = input.split(',');
                //remove spaces between items
                parsed = parsed.map((e) => {
                    return e.replace(/\s/g, '');
                })
                //remove empty options
                .filter((e) => {
                    return e !== '';
                });
                $scope.lunchCheck = parsed.length;
            }
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
                $scope.evaluationMessage = "Please enter data first";
                $scope.isValid = false;
            }
            
        }
    }

})();