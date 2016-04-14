(function() {
  'use strict';
  angular.module('starter.services')
    .factory('Tasks', function(dataStorage) {
      var tasks = {};
      tasks.response = dataStorage.getTasks() || [];
      return {
        data: tasks,
        update: function(data) {
          tasks.response = data;
          dataStorage.saveTasks(data);
        },
        get: function(serverId) {
          return _.sortBy(_.filter(tasks.response.data, function(task) {
            return task.serverid === serverId;
          }), 'finishtime') || [];
        },
        clear: function() {
          tasks.response = [];
          dataStorage.clearStorageField('tasks');
        }
      };
    });
})();
