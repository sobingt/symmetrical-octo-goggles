angular.module('ChefEzy')
  .controller('HomeCtrl', function($scope) {
    $scope.settings={};
    $scope.settings.billing={};
    $scope.settings.billing.enabled=true;

    // $scope.suppliers = Supplier.query();

  });
