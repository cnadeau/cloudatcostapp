(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('ServerCtrl', function($scope, $ionicHistory, dataRequestService, Servers) {
      $scope.refresh = function() {
        dataRequestService.getData(function() {
          $ionicHistory.clearCache();
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      $scope.servers = Servers.data;
      $scope.data = {
        searchQuery: ''
      };

      $scope.template_images = [];
      $scope.template_images[74] = 'freebsd';
      $scope.template_images[26] = 'centos';
      $scope.template_images[27] = 'ubuntu';
      $scope.template_images[15] = 'centos';
      $scope.template_images[21] = 'ubuntu';
      $scope.template_images[23] = 'ubuntu';
      $scope.template_images[24] = 'windows-server-2008';
      $scope.template_images[25] = 'windows-server-2012';
      $scope.template_images[15] = 'centos';
      $scope.template_images[14] = 'centos';
      $scope.template_images[13] = 'centos';
      $scope.template_images[10] = 'centos';
      $scope.template_images[3] = 'debian';
      $scope.template_images[9] = 'windows-7';
      $scope.template_images[2] = 'ubuntu';
      $scope.template_images[1] = 'centos';
      $scope.template_images[28] = 'minecraft';
      $scope.template_images[16] = 'ubuntu';
      $scope.template_images[75] = 'docker';

      $scope.getTemplateImage = function(id) {
        if ($scope.template_images[id]) {
          return 'img/' + $scope.template_images[id] + '.png';
        } else {
          //TODO: add unknown image
          return 'img/ubuntu.png';
        }
      };

      $scope.clearSearch = function() {
        $scope.data.searchQuery = '';
      };
    });
})();
