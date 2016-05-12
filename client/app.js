angular.module('ChefEzy', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'satellizer'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {
    $stateProvider
      .state('app', {
        url: '',
        abstract: true,
        views: {
          'header': {
            templateUrl: 'views/partials/header.html',
            controller: 'HomeCtrl'
          },
          'footer':{
            templateUrl: 'views/partials/footer.html'
          }
        }
      })
      .state('app.organization', {
        url: '',
        abstract: true
      })
      .state('app.organization.community', {
        url: '/community',
        views: {
          'container@': {              
            controller: 'HomeCtrl',
            templateUrl: 'views/community.html'
          }
        }
      })
      .state('app.organization.dashboard', {
        url: '/:organization',
        views: {
          'container@': {              
            controller: 'HomeCtrl',
            templateUrl: 'views/dashboard.html'
          }
        }
      });

    $urlRouterProvider.otherwise('/geekout');
//    $locationProvider.html5Mode({
//      enabled: true,
//      requireBase: false
//    });

  })  
  .run(function ($rootScope) {

  });
