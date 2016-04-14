(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('AccountCtrl', function($scope, $state, $ionicPopup, $cordovaBarcodeScanner, dataRequestService, dataStorage, Servers, Tasks, Templates) {
      $scope.currentIP = '';

      $scope.settings = {
        email: dataStorage.getEmail(),
        APIKey: dataStorage.getAPIKey(),
        showAPIKey: false
      };

      $scope.saveData = function() {
        dataStorage.saveEmail($scope.settings.email);
        dataStorage.saveAPIKey($scope.settings.APIKey);
        dataRequestService.getData(function() {});
        $state.transitionTo('tab.dash');
      };
      $scope.deleteData = function() {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Delete Data',
          template: 'Are you sure you want to delete all the data from this device?'
        });
        confirmPopup.then(function(res) {
          if (res) {
            $scope.settings.email = '';
            $scope.settings.APIKey = '';
            $scope.currentIP = '';
            dataRequestService.clear();
            dataStorage.clearStorage();
            Servers.clear();
            Tasks.clear();
            Templates.clear();
            localStorage.clear();

            $ionicPopup.alert({
              title: 'Success',
              template: 'Your account has been deleted from this device'
            });

            window.location.reload(); // Reload entire app to reset views
          }
        });
      };
      $scope.getIP = function() {
        dataRequestService.getCurrentIP(function(data) {
          $scope.currentIP = data;
        });
      };

      $scope.refreshApp = function() {
        window.location.reload(); // Reload entire app to reset views
      };

      $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
          if (imageData.text) {
            // todo: verify input data
            var text = imageData.text.split(',');
            $scope.settings.email = text[1];
            $scope.settings.APIKey = text[0];
            $scope.saveData();
          }
          //console.log('Barcode Format -> ' + imageData.format);
          //console.log('Cancelled -> ' + imageData.cancelled);
        }, function(error) {
          $ionicPopup.alert({
            title: 'Error',
            template: 'There was an error. Please try again.'
          });
          //console.log('An error happened -> ' + error);
        });
      };

    });
})();
