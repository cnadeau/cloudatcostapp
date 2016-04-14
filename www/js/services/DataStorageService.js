(function() {
  'use strict';

   function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    
  angular.module('starter.services')
    .factory('dataStorage', function($window, AES) {
      return {

        saveEmail: function(email) {
          $window.localStorage.setItem('email', AES.encrypt(email));
        },
        saveAPIKey: function(APIKey) {
          $window.localStorage.setItem('APIKey', AES.encrypt(APIKey));
        },
        saveResponseTime: function(responseTime) {
          $window.localStorage.setItem('responseTime', AES.encrypt(responseTime));
        },
        saveServers: function(servers) {
          $window.localStorage.setItem('servers', AES.encrypt(JSON.stringify(servers)));
        },
        saveTasks: function(tasks) {
          $window.localStorage.setItem('tasks', AES.encrypt(JSON.stringify(tasks)));
        },
        saveTemplates: function(templates) {
          $window.localStorage.setItem('templates', AES.encrypt(JSON.stringify(templates)));
        },
        saveCloudpro: function(cloudpro) {
          $window.localStorage.setItem('cloudpro', AES.encrypt(JSON.stringify(cloudpro)));
        },
        getEmail: function() {
          if ($window.localStorage.getItem('email')) {
            return AES.decrypt($window.localStorage.getItem('email'));
          } else {
            return '';
          }
        },
        getAPIKey: function() {
          if ($window.localStorage.getItem('APIKey')) {
            return AES.decrypt($window.localStorage.getItem('APIKey'));
          } else {
            return '';
          }
        },
        getResponseTime: function() {
          if ($window.localStorage.getItem('responseTime')) {
            return AES.decrypt($window.localStorage.getItem('responseTime'));
          } else {
            return '';
          }
        },
        getServers: function() {
          if ($window.localStorage.getItem('servers')) {
            return isJson(AES.decrypt($window.localStorage.getItem('servers'))) ? JSON.parse(AES.decrypt($window.localStorage.getItem('servers'))) : [];
          } else {
            return [];
          }
        },
        getTasks: function() {
          if ($window.localStorage.getItem('tasks')) {
            return isJson(AES.decrypt($window.localStorage.getItem('tasks'))) ? JSON.parse(AES.decrypt($window.localStorage.getItem('tasks'))) : [];
          } else {
            return [];
          }
        },
        getTemplates: function() {
          if ($window.localStorage.getItem('templates')) {
            return isJson(AES.decrypt($window.localStorage.getItem('templates'))) ? JSON.parse(AES.decrypt($window.localStorage.getItem('templates'))) : [];
          } else {
            return [];
          }
        },
        getCloudpro: function() {
          if ($window.localStorage.getItem('cloudpro')) {
            return isJson(AES.decrypt($window.localStorage.getItem('cloudpro'))) ? JSON.parse(AES.decrypt($window.localStorage.getItem('cloudpro'))) : [];
          } else {
            return [];
          }
        },
        clearStorage: function() {
          $window.localStorage.removeItem('email');
          $window.localStorage.removeItem('APIKey');
          $window.localStorage.removeItem('responseTime');
        },
        clearStorageField: function(string) {
          $window.localStorage.removeItem(string);
        },
        updateStorage: function(callback) {
          console.log('Email' + this.getEmail());
          this.saveEmail(this.getEmail());
          this.saveAPIKey(this.getAPIKey());

          localStorage.removeItem('responseTime');
          localStorage.removeItem('servers');
          localStorage.removeItem('tasks');
          localStorage.removeItem('templates');
          localStorage.removeItem('cloudpro');

          callback();
        }
      };
    });
})();
