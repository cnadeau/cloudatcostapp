(function() {
  'use strict';
  angular.module('starter')
    .config(function($stateProvider, $urlRouterProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider

      // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.servers', {
          url: '/servers',
          views: {
            'tab-servers': {
              templateUrl: 'templates/tab-servers.html',
              controller: 'ServerCtrl'
            }
          }
        })
        .state('tab.server-detail', {
          url: '/servers/:serverId',
          views: {
            'tab-servers': {
              templateUrl: 'templates/server-detail.html',
              controller: 'ServerDetailCtrl'
            }
          }
        })

      .state('tab.cloudpro', {
        url: '/cloudpro',
        views: {
          'tab-cloudpro': {
            templateUrl: 'templates/tab-cloudpro.html',
            controller: 'CloudproCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/tab/dash');

    });
})();
