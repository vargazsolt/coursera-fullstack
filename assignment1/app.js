(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
  $scope.stateOfBeing = "hungry";

  $scope.checkLunch = function () {

    var food = [];
    var uniqueFood = [];

    $scope.message = 'Please enter data first';
    $scope.state = 'warning';

    if ($scope.food === undefined || !$scope.food || 0 === $scope.food.length) {
      return true;
    }

    food = $scope.food.split(',').filter(function(str) { return (str && 0 !== str.replace(/\s+/g, '').length); });
    uniqueFood = food.filter(function(item, pos) {
      return food.indexOf(item) == pos;
    });

    $scope.state = 'success';

    if (uniqueFood.length >= 1 && uniqueFood.length <= 3) {
      $scope.message = 'Enjoy!';
    } else {
      $scope.message = 'Too much!';      
    }
  };
}

})();
