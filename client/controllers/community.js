angular.module('ChefEzy')
  .controller('CommunityCtrl', function($scope) {
    //list of members
    $scope.users = [{
      userName: "darshan",
      type: "ORG",
      email: "darshansapaliga009@gmail.com",
      phone: "9920980886",
      plan: [{
        planId: "inception"
      }]
    },{
      userName: "darshanyo",
      type: "MGR",
      email: "darshansapaliga00981@gmail.com",
      phone: "99209",
      plan: [{
        planId: "decisive"
      }]
    },{
      userName: "darshansapa",
      type: "COW",
      email: "darshansapaliga@gmail.com",
      phone: "09830098",
      plan: [{
        planId: "modular"
      }]
    }];

  });
