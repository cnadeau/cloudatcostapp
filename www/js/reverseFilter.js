(function() {
  'use strict';
  angular.module('starter')
    .filter('reverse', function() {
      return function(items) {
        return items.slice().reverse();
      };
    });
})();
