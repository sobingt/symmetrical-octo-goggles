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
      /*
       |------------------------------
       | DASHBOARD
       |------------------------------
      */
      .state('app.organization.dashboard', {
        url: '/:organization',
        views: {
          'container@': {
            controller: 'HomeCtrl',
            templateUrl: 'views/dashboard.html'
          }
        }
      })
      /*
       |------------------------------
       | COMMUNITY
       |------------------------------
      */
      .state('app.organization.community', {
        url: '/community',
        views: {
          'container@': {
            controller: 'HomeCtrl',
            templateUrl: 'views/community/community.html'
          }
        }
      })
      .state('app.organization.community.members', {
        url: '/members',
        views: {
          'content@app.organization.community': {
            controller: 'HomeCtrl',
            templateUrl: 'views/community/members.html'
          }
        }
      })
      .state('app.organization.community.leads', {
        url: '/leads',
        views: {
          'content@app.organization.community': {
            controller: 'HomeCtrl',
            templateUrl: 'views/community/leads.html'
          }
        }
      })
      .state('app.organization.community.contacts', {
        url: '/contacts',
        views: {
          'content@app.organization.community': {
            controller: 'HomeCtrl',
            templateUrl: 'views/community/contacts.html'
          }
        }
      })
      .state('app.organization.community.memberships', {
        url: '/memberships',
        views: {
          'content@app.organization.community': {
            controller: 'HomeCtrl',
            templateUrl: 'views/community/memberships.html'
          }
        }
      })
      .state('app.organization.community.former', {
        url: '/former',
        views: {
          'content@app.organization.community': {
            controller: 'HomeCtrl',
            templateUrl: 'views/community/former.html'
          }
        }
      })
      .state('app.organization.community.benefits', {
        url: '/benefits',
        views: {
          'content@app.organization.community': {
            controller: 'HomeCtrl',
            templateUrl: 'views/community/benefits.html'
          }
        }
      })
      .state('app.organization.community.checkins', {
        url: '/checkins',
        views: {
          'content@app.organization.community': {
            controller: 'HomeCtrl',
            templateUrl: 'views/community/checkins.html'
          }
        }
      })
      /*
       |------------------------------
       | BILLING
       |------------------------------
      */
      .state('app.organization.billing', {
        url: '/billing',
        views: {
          'container@': {
            controller: 'HomeCtrl',
            templateUrl: 'views/billing/billing.html'
          }
        }
      })
      .state('app.organization.billing.plans', {
        url: '/plans',
        views: {
          'content': {
            controller: 'HomeCtrl',
            templateUrl: 'views/billing/plans.html'
          }
        }
      })
      .state('app.organization.billing.invoices', {
        url: '/invoices',
        views: {
          'content': {
            controller: 'HomeCtrl',
            templateUrl: 'views/billing/invoices.html'
          }
        }
      })
      .state('app.organization.billing.revenue', {
        url: '/revenue',
        views: {
          'content': {
            controller: 'HomeCtrl',
            templateUrl: 'views/billing/revenue.html'
          }
        }
      })
      /*
       |------------------------------
       | SETTINGS
       |------------------------------
      */
      .state('app.organization.settings', {
        url: '/settings',
        views: {
          'container@': {
            controller: 'HomeCtrl',
            templateUrl: 'views/settings/settings.html'
          }
        }
      })
      .state('app.organization.settings.admin', {
        url: '/admin',
        views: {
          'content@app.organization.settings': {
            controller: 'HomeCtrl',
            templateUrl: 'views/settings/admin.html'
          }
        }
      })
      .state('app.organization.settings.integrations', {
        url: '/integrations',
        views: {
          'content@app.organization.settings': {
            controller: 'HomeCtrl',
            templateUrl: 'views/settings/integrations.html'
          }
        }
      })
      .state('app.organization.settings.templates', {
        url: '/templates',
        views: {
          'content@app.organization.settings': {
            controller: 'HomeCtrl',
            templateUrl: 'views/settings/templates.html'
          }
        }
      })
      .state('app.organization.settings.community', {
        url: '/community',
        views: {
          'content@app.organization.settings': {
            controller: 'HomeCtrl',
            templateUrl: 'views/settings/community.html'
          }
        }
      })
      .state('app.organization.settings.billing', {
        url: '/billing',
        views: {
          'content@app.organization.settings': {
            controller: 'HomeCtrl',
            templateUrl: 'views/settings/billing.html'
          }
        }
      })
      .state('app.organization.settings.space', {
        url: '/space',
        views: {
          'content@app.organization.settings': {
            controller: 'HomeCtrl',
            templateUrl: 'views/settings/space.html'
          }
        }
      })
      .state('app.organization.settings.calendar', {
        url: '/calendar',
        views: {
          'content@app.organization.settings': {
            controller: 'HomeCtrl',
            templateUrl: 'views/settings/calendar.html'
          }
        }
      })
      .state('app.organization.settings.portal', {
        url: '/portal',
        views: {
          'content@app.organization.settings': {
            controller: 'HomeCtrl',
            templateUrl: 'views/settings/portal.html'
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
