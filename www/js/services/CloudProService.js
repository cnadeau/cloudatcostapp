(function() {
  'use strict';
  angular.module('starter.services')
    .factory('Cloudpro', function(dataStorage) {
      var cloudpro = {};
      cloudpro.response = dataStorage.getCloudpro() || [];
      return {
        data: cloudpro,
        update: function(data) {
          cloudpro.response = data;
          dataStorage.saveCloudpro(data);
        },
        clear: function() {
          cloudpro.response = [];
          dataStorage.clearStorageField('cloudpro');
        }
      };
    });
})();
