angular.module('ChefEzy')
  .controller('BillingCtrl', function($scope) {

    //list of plans
    $scope.plans = [{
      plan: "$10",
      active: true,
      amenities: {
        coffee: "30",
        seats: "5",
        printpaper: "50"
      }
    },{
      plan: "$20",
      active: true,
      amenities: {
        coffee: "50",
        seats: "10",
        printpaper: "70"
      }
    },{
      plan: "$50",
      active: true,
      amenities: {
        coffee: "100",
        seats: "50",
        printpaper: "150"
      }
    }]

    //list of invoices
    $scope.invoices = [{
      invoiceNo: "1",
      to: "Bit brothers",
      status: "paid",
      issueDate: "23rd april",
      paidDate: "24th april",
      total: "$10"
    },{
      invoiceNo: "2",
      to: "Darshan",
      status: "unpaid",
      issueDate: "23rd april",
      total: "$10"
    },{
      invoiceNo: "3",
      status: "paid",
      issueDate: "23rd april",
      paidDate: "24th april",
      total: "$10"
    }];

  });
