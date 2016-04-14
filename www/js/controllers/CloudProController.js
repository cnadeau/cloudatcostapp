(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('CloudproCtrl', function($scope, $state, $ionicPopup, $ionicHistory, dataRequestService, Templates, Cloudpro) {

      $scope.refresh = function() {
        dataRequestService.getData(function() {
          $ionicHistory.clearCache();
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      $scope.cloudproResources = {};

      $scope.cloudproResources.options = [{
        name: 'CPU',
        options: [
          { id: 1, label: 1 }
        ]
      }, {
        name: 'RAM',
        options: [
          { id: 512, label: '512 MB' }
        ]
      }, {
        name: 'HD',
        options: [
          { id: 10, label: '10 GB' }
        ]
      }, {
        name: 'Template',
        options: []
      }];

      var updateOptions = function() {
        // TODO keep standard values (from above) if there are no more resources available
        if ($scope.cloudpro.response.hasOwnProperty('data')) {
          $scope.cloudproResources.options[0].options = [];
          for (var x = 1; x <= $scope.cloudpro.response.data.total.cpu_total - $scope.cloudpro.response.data.used.cpu_used; x++) {
            $scope.cloudproResources.options[0].options.push({ id: x, label: x });
          }
          $scope.cloudproResources.options[1].options = [];
          for (x = 1; x <= Math.floor(($scope.cloudpro.response.data.total.ram_total - $scope.cloudpro.response.data.used.ram_used) / 512); x++) {
            $scope.cloudproResources.options[1].options.push({ id: x * 512, label: (x * 512) + ' MB' });
          }
          $scope.cloudproResources.options[2].options = [];
          for (x = 2; x <= Math.floor(($scope.cloudpro.response.data.total.storage_total - $scope.cloudpro.response.data.used.storage_used) / 5); x++) {
            $scope.cloudproResources.options[2].options.push({ id: x * 5, label: (x * 5) + ' GB' });
          }
          $scope.cloudproResources.options[0].newServer = $scope.cloudproResources.options[0].options[0];
          $scope.cloudproResources.options[1].newServer = $scope.cloudproResources.options[1].options[0];
          $scope.cloudproResources.options[2].newServer = $scope.cloudproResources.options[2].options[0];
        }
      };

      $scope.cloudpro = Cloudpro.data;

      // Update detail view when new data is available
      $scope.$watch('cloudpro', function() {
        updateOptions();
      }, true);

      updateOptions();

      var sortedTemplates = _.sortBy(Templates.data.response.data, function(template) {
        return template.name;
      });

      _.each(sortedTemplates, function(data) {
        $scope.cloudproResources.options[3].options.push({ id: data.ce_id, label: data.name });
      });

      $scope.cloudproResources.options[3].newServer = $scope.cloudproResources.options[3].options[0];

      $scope.buildServer = function() {
        $scope.buildingServer = false;
        var confirmPopup = $ionicPopup.confirm({
          title: 'Build new server',
          template: 'Are you sure you want to build a new pro server with the following resources?<br />' +
            'CPU: ' + $scope.cloudproResources.options[0].newServer.id + '<br />' +
            'RAM: ' + $scope.cloudproResources.options[1].newServer.id + ' MB<br />' +
            'HD: ' + $scope.cloudproResources.options[2].newServer.id + ' GB<br />' +
            'Template: ' + $scope.cloudproResources.options[3].newServer.label + '<br />'
        });
        confirmPopup.then(function(res) {
          if (res) {
            $scope.buildingServer = true;
            dataRequestService.cloudproBuildServer($scope.cloudproResources.options[0].newServer.id, $scope.cloudproResources.options[1].newServer.id, $scope.cloudproResources.options[2].newServer.id, $scope.cloudproResources.options[3].newServer.id, function() {
              $scope.buildingServer = false;
              $ionicPopup.alert({
                title: 'Success!',
                template: 'Your server will be built'
              });
              // Refresh servers
              dataRequestService.getData(function() {});
            });
          }
        });
      };
    });
})();
