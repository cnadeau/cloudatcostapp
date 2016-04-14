(function() {
  'use strict';
  angular.module('starter.services')
  .factory('Templates', function(dataStorage) {
    var templates = {};
    templates.response = dataStorage.getTemplates() || [];
    return {
      data: templates,
      update: function(data) {
        templates.response = data;
        dataStorage.saveTemplates(data);
      },
      clear: function() {
        templates.response = [];
        dataStorage.clearStorageField('templates');
      }
    };
  });
})();