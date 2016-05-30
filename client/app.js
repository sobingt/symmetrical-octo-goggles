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
        url: '/:organization',
        abstract: true
      })
      /*
       |------------------------------
       | DASHBOARD
       |------------------------------
      */
      .state('app.organization.dashboard', {
        url: '/dashboard',
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
            controller: 'CommunityCtrl',
            templateUrl: 'views/community/community.html'
          }
        }
      })
      .state('app.organization.community.addCompany', {
        url: '/addCompany',
        views: {
          'content@app.organization.community': {
            controller: 'CommunityCtrl',
            templateUrl: 'views/community/addCompany.html'
          }
        }
      })
      .state('app.organization.community.members', {
        url: '/members',
        views: {
          'content@app.organization.community': {
            controller: 'CommunityCtrl',
            templateUrl: 'views/community/members.html'
          }
        }
      })
      .state('app.organization.community.members.profile', {
        url: '/profile',
        views: {
          'container@': {
            controller: 'CommunityCtrl',
            templateUrl: 'views/community/memberProfile.html'
          }
        }
      })
      .state('app.organization.community.members.addMember', {
        url: '/addMember',
        views: {
          'content@app.organization.community': {
            controller: 'CommunityCtrl',
            templateUrl: 'views/community/addMember.html'
          }
        }
      })
      .state('app.organization.community.leads', {
        url: '/leads',
        views: {
          'content@app.organization.community': {
            controller: 'CommunityCtrl',
            templateUrl: 'views/community/leads.html'
          }
        }
      })
      .state('app.organization.community.leads.addLead', {
        url: '/addLead',
        views: {
          'content@app.organization.community': {
            controller: 'CommunityCtrl',
            templateUrl: 'views/community/addLead.html'
          }
        }
      })
      .state('app.organization.community.contacts', {
        url: '/contacts',
        views: {
          'content@app.organization.community': {
            controller: 'CommunityCtrl',
            templateUrl: 'views/community/contacts.html'
          }
        }
      })
      .state('app.organization.community.memberships', {
        url: '/memberships',
        views: {
          'content@app.organization.community': {
            controller: 'CommunityCtrl',
            templateUrl: 'views/community/memberships.html'
          }
        }
      })
      .state('app.organization.community.former', {
        url: '/former',
        views: {
          'content@app.organization.community': {
            controller: 'CommunityCtrl',
            templateUrl: 'views/community/former.html'
          }
        }
      })
      .state('app.organization.community.benefits', {
        url: '/benefits',
        views: {
          'content@app.organization.community': {
            controller: 'CommunityCtrl',
            templateUrl: 'views/community/benefits.html'
          }
        }
      })
      .state('app.organization.community.benefits.addBenefit', {
        url: '/addBenefit',
        views: {
          'content@app.organization.community': {
            controller: 'CommunityCtrl',
            templateUrl: 'views/community/addBenefit.html'
          }
        }
      })
      .state('app.organization.community.checkins', {
        url: '/checkins',
        views: {
          'content@app.organization.community': {
            controller: 'CommunityCtrl',
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
            controller: 'BillingCtrl',
            templateUrl: 'views/billing/billing.html'
          }
        }
      })
      .state('app.organization.billing.addInvoice', {
        url: '/addInvoice',
        views: {
          'content@app.organization.billing': {
            controller: 'BillingCtrl',
            templateUrl: 'views/billing/addInvoice.html'
          }
        }
      })
      .state('app.organization.billing.plans', {
        url: '/plans',
        views: {
          'content@app.organization.billing': {
            controller: 'BillingCtrl',
            templateUrl: 'views/billing/plans.html'
          }
        }
      })
      .state('app.organization.billing.plans.addPlan', {
        url: '/addPlan',
        views: {
          'content@app.organization.billing': {
            controller: 'BillingCtrl',
            templateUrl: 'views/billing/addPlan.html'
          }
        }
      })
      .state('app.organization.billing.rates', {
        url: '/rates',
        views: {
          'content@app.organization.billing': {
            controller: 'BillingCtrl',
            templateUrl: 'views/billing/rates.html'
          }
        }
      })
      .state('app.organization.billing.rates.addRate', {
        url: '/addRate',
        views: {
          'content@app.organization.billing': {
            controller: 'BillingCtrl',
            templateUrl: 'views/billing/addRate.html'
          }
        }
      })
      .state('app.organization.billing.invoices', {
        url: '/invoices',
        views: {
          'content@app.organization.billing': {
            controller: 'BillingCtrl',
            templateUrl: 'views/billing/invoices.html'
          }
        }
      })
      .state('app.organization.billing.invoices.addInvoice', {
        url: '/addInvoice',
        views: {
          'content@app.organization.billing': {
            controller: 'BillingCtrl',
            templateUrl: 'views/billing/addInvoice.html'
          }
        }
      })
      .state('app.organization.billing.invoices.viewInvoice', {
        url: '/viewInvoice',
        views: {
          'content@app.organization.billing': {
            controller: 'BillingCtrl',
            templateUrl: 'views/billing/viewInvoice.html'
          }
        }
      })
      .state('app.organization.billing.invoices.viewInvoice.addPayment', {
        url: '/addPayment',
        views: {
          'content@app.organization.billing': {
            controller: 'BillingCtrl',
            templateUrl: 'views/billing/addPaymentForInvoice.html'
          }
        }
      })
      .state('app.organization.billing.revenue', {
        url: '/revenue',
        views: {
          'content@app.organization.billing': {
            controller: 'BillingCtrl',
            templateUrl: 'views/billing/revenue.html'
          }
        }
      })
      /*
       |------------------------------
       | SPACE
       |------------------------------
      */
      .state('app.organization.space', {
        url: '/space',
        views: {
          'container@': {
            controller: 'SpaceCtrl',
            templateUrl: 'views/space/space.html'
          }
        }
      })
      .state('app.organization.space.addLocations', {
        url: '/addLocations',
        views: {
          'content@app.organization.space': {
            controller: 'SpaceCtrl',
            templateUrl: 'views/space/addLocations.html'
          }
        }
      })
      .state('app.organization.space.meetingRooms', {
        url: '/meeting-rooms',
        views: {
          'content@app.organization.space': {
            controller: 'SpaceCtrl',
            templateUrl: 'views/space/meetingRooms.html'
          }
        }
      })
      .state('app.organization.space.privateOffices', {
        url: '/private-offices',
        views: {
          'content@app.organization.space': {
            controller: 'SpaceCtrl',
            templateUrl: 'views/space/privateOffices.html'
          }
        }
      })
      .state('app.organization.space.desks', {
        url: '/desks',
        views: {
          'content@app.organization.space': {
            controller: 'SpaceCtrl',
            templateUrl: 'views/space/desks.html'
          }
        }
      })
      .state('app.organization.space.furniture', {
        url: '/furniture',
        views: {
          'content@app.organization.space': {
            controller: 'SpaceCtrl',
            templateUrl: 'views/space/furniture.html'
          }
        }
      })
      .state('app.organization.space.occupancy', {
        url: '/occupancy',
        views: {
          'content@app.organization.space': {
            controller: 'SpaceCtrl',
            templateUrl: 'views/space/occupancy.html'
          }
        }
      })
      .state('app.organization.space.analytics', {
        url: '/analytics',
        views: {
          'content@app.organization.space': {
            controller: 'SpaceCtrl',
            templateUrl: 'views/space/analytics.html'
          }
        }
      })
      /*
       |------------------------------
       | CALENDAR
       |------------------------------
      */
      .state('app.organization.calendar', {
        url: '/calendar',
        views: {
          'container@': {
            controller: 'HomeCtrl',
            templateUrl: 'views/calendar.html'
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
            controller: 'SettingsCtrl',
            templateUrl: 'views/settings/settings.html'
          }
        }
      })
      .state('app.organization.settings.admin', {
        url: '/admin',
        views: {
          'content@app.organization.settings': {
            controller: 'SettingsCtrl',
            templateUrl: 'views/settings/admin.html'
          }
        }
      })
      .state('app.organization.settings.admin.addTeammate', {
        url: '/addTeammate',
        views: {
          'content@app.organization.settings': {
            controller: 'SettingsCtrl',
            templateUrl: 'views/settings/addTeammate.html'
          }
        }
      })
      .state('app.organization.settings.integrations', {
        url: '/integrations',
        views: {
          'content@app.organization.settings': {
            controller: 'SettingsCtrl',
            templateUrl: 'views/settings/integrations.html'
          }
        }
      })
      .state('app.organization.settings.templates', {
        url: '/templates',
        views: {
          'content@app.organization.settings': {
            controller: 'SettingsCtrl',
            templateUrl: 'views/settings/templates.html'
          }
        }
      })
      .state('app.organization.settings.community', {
        url: '/community',
        views: {
          'content@app.organization.settings': {
            controller: 'SettingsCtrl',
            templateUrl: 'views/settings/community.html'
          }
        }
      })
      .state('app.organization.settings.community.addProperty', {
        url: '/addProperty',
        views: {
          'content@app.organization.settings': {
            controller: 'SettingsCtrl',
            templateUrl: 'views/settings/addProperty.html'
          }
        }
      })
      .state('app.organization.settings.billing', {
        url: '/billing',
        views: {
          'content@app.organization.settings': {
            controller: 'SettingsCtrl',
            templateUrl: 'views/settings/billing.html'
          }
        }
      })
      .state('app.organization.settings.space', {
        url: '/space',
        views: {
          'content@app.organization.settings': {
            controller: 'SettingsCtrl',
            templateUrl: 'views/settings/space.html'
          }
        }
      })
      .state('app.organization.settings.space.addZoneType', {
        url: '/addZoneType',
        views: {
          'content@app.organization.settings': {
            controller: 'SettingsCtrl',
            templateUrl: 'views/settings/editZoneType.html'
          }
        }
      })
      .state('app.organization.settings.calendar', {
        url: '/calendar',
        views: {
          'content@app.organization.settings': {
            controller: 'SettingsCtrl',
            templateUrl: 'views/settings/calendar.html'
          }
        }
      })
      .state('app.organization.settings.portal', {
        url: '/portal',
        views: {
          'content@app.organization.settings': {
            controller: 'SettingsCtrl',
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
