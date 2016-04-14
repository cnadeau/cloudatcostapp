(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('ServerDetailCtrl', function($scope, $stateParams, $ionicHistory, $ionicPopup, dataRequestService, Servers, Tasks) {
      $scope.server = {};
      $scope.allServers = Servers.data;
      $scope.allTasks = Tasks.data;
      $scope.server.server = _.find($scope.allServers.response.data, function(server) {
        return server.id === $stateParams.serverId;
      });
      $scope.server.tasks = _.sortBy(_.filter($scope.allTasks.response.data, function(task) {
        return task.serverid === $stateParams.serverId;
      }), 'finishtime');

      // Update detail view when new data is available
      $scope.$watch('allServers', function(newVal, oldVal) {
        $scope.server.server = _.find($scope.allServers.response.data, function(server) {
          return server.id === $stateParams.serverId;
        });
        $scope.server.tasks = _.sortBy(_.filter($scope.allTasks.response.data, function(task) {
          return task.serverid === $stateParams.serverId;
        }), 'finishtime');
      }, true);

      $scope.ServerPowerOn = function(serverId) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Power On Server',
          template: 'Are you sure you want to power on this server?'
        });
        confirmPopup.then(function(res) {
          if (res) {
            dataRequestService.powerOperation('poweron', serverId, function(data) {
              $ionicPopup.alert({
                title: 'Power On',
                template: 'Your server will now power on'
              });
            });
          }
        });
      };
      $scope.ServerPowerOff = function(serverId) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Power Off Server',
          template: 'Are you sure you want to shut down this server?'
        });
        confirmPopup.then(function(res) {
          if (res) {
            dataRequestService.powerOperation('poweroff', serverId, function(data) {
              $ionicPopup.alert({
                title: 'Power Off',
                template: 'Your server will now power off'
              });
            });
          }
        });
      };
      $scope.ServerReset = function(serverId) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Restart Server',
          template: 'Are you sure you want to restart this server?'
        });
        confirmPopup.then(function(res) {
          if (res) {
            dataRequestService.powerOperation('reset', serverId, function(data) {
              $ionicPopup.alert({
                title: 'Restart',
                template: 'Your server will now restart'
              });
            });
          }
        });
      };

      $scope.switchRunmode = function(serverId, currentRunmode) {
        var newMode = currentRunmode === 'Safe' ? 'normal' : 'safe';

        var confirmPopup = $ionicPopup.confirm({
          title: 'Switch Runmode',
          template: 'Are you sure you want to the runmode to ' + newMode + '?'
        });
        confirmPopup.then(function(res) {
          if (res) {
            dataRequestService.switchRunmode(newMode, serverId, function(data) {
              $ionicPopup.alert({
                title: 'Switch Runmode',
                template: 'Runmode will be switched'
              });
            });
          }
        });
      };

      $scope.renameServer = function(serverId, currentServerName) {
        $scope.data = {};

        var myPopup = $ionicPopup.show({
          template: '<input type="text" ng-model="data.newServername">',
          title: 'Enter new server name',
          subTitle: 'Your current server name is:<br />' + currentServerName,
          scope: $scope,
          buttons: [
            { text: 'Cancel' }, {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.data.newServername || $scope.data.newServername === currentServerName) {
                  //don't allow the user to close unless he enters something new
                  e.preventDefault();
                } else {
                  dataRequestService.renameServer(serverId, $scope.data.newServername, function(data) {
                    $ionicPopup.alert({
                      title: 'Success!',
                      template: 'Your server name has been changed'
                    });
                  });
                }
              }
            }
          ]
        });
      };

      $scope.modifyDNS = function(serverId, currentHostname) {
        $scope.data = {};

        var myPopup = $ionicPopup.show({
          template: '<input type="text" ng-model="data.newHostname">',
          title: 'Enter new hostname',
          subTitle: 'Your current hostname is:<br />' + currentHostname,
          scope: $scope,
          buttons: [
            { text: 'Cancel' }, {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.data.newHostname || $scope.data.newHostname === currentHostname) {
                  //don't allow the user to close unless he enters something new
                  e.preventDefault();
                } else {
                  dataRequestService.modifyDNS(serverId, $scope.data.newHostname, function(data) {
                    $ionicPopup.alert({
                      title: 'Success!',
                      template: 'Your reverse DNS has been changed'
                    });
                  });
                }
              }
            }
          ]
        });
      };

      $scope.deleteServer = function(serverId) {
        $scope.data = {};
        $scope.deletingServer = false;
        var confirmationText = 'yes';

        var myPopup = $ionicPopup.show({
          template: '<input type="text" ng-model="data.confirmationText">',
          title: 'Are you sure you want to delete this server?',
          subTitle: 'Deleting your server cannot be undone. Please enter "' + confirmationText + '" to confirm:<br />',
          scope: $scope,
          buttons: [
            { text: 'Cancel' }, {
              text: '<b>Delete</b>',
              type: 'button-assertive',
              onTap: function(e) {
                if ($scope.data.confirmationText.toLowerCase() !== confirmationText) {
                  //don't allow the user to close unless he enters something new
                  e.preventDefault();
                } else {
                  $scope.deletingServer = true;
                  dataRequestService.cloudproDeleteServer(serverId, function(data) {
                    $scope.deletingServer = false;
                    $ionicPopup.alert({
                      title: 'Success!',
                      template: 'Server has been deleted.'
                    });

                    // Go back to servers
                    $ionicHistory.goBack(-1);
                    // Refresh servers
                    dataRequestService.getData(function() {});
                  });
                }
              }
            }
          ]
        });
      };

      $scope.getConsole = function(serverId) {
        dataRequestService.getConsole(serverId, function(data) {
          window.open(data.console, '_system', 'location=yes');
        });
      };

      $scope.filterAttributes = function(server) {
        var result = {};
        _.each(server, function(value, key) {
          if (key !== 'chartData') {
            result[key] = value;
          }
        });
        return result;
      };

    });
})();
