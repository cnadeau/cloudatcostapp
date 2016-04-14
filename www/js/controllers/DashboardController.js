(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('DashCtrl', function($scope, $ionicHistory, dataRequestService, dataStorage, Servers, Tasks, Templates) {
      $scope.refresh = function() {
        dataRequestService.getData(function() {
          $ionicHistory.clearHistory();
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      if (!window.localStorage.getItem('appVersion')) {
        dataStorage.updateStorage(function() {
          $scope.refresh();
          window.localStorage.setItem('appVersion', 1);
        });
      }

      $scope.status = false;
      $scope.servers = Servers.data;
      $scope.tasks = Tasks.data;
      $scope.templates = Templates.data;
      $scope.status = dataRequestService.status;
      $scope.chartOptions = { thickness: 10, mode: 'gauge', total: 100 };
    });
})();
