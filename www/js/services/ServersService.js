(function() {
  'use strict';
  angular.module('starter.services')
    .factory('Servers', function(dataStorage) {
      var servers = {};
      servers.response = dataStorage.getServers() || [];
      return {
        data: servers,
        update: function(data) {
          servers.response = data;
          dataStorage.saveServers(data);
        },
        get: function(serverId) {
          return _.find(servers.response.data, function(server) {
            return server.id === serverId;
          }) || [];
        },
        clear: function() {
          servers.response = [];
          dataStorage.clearStorageField('servers');
        }
      };
    });
})();
