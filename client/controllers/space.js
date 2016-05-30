angular.module('ChefEzy')
  .controller('SpaceCtrl', function($scope) {

    $scope.floors = [{
      floorPlan: 'Under Development',
      name: 'Geek',
      floor: '1'
    },
    {
      floorPlan: 'Under Development',
      name: 'Luxury',
      floor: '2'
    }];

  });
