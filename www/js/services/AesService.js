(function() {
  'use strict';
  angular.module('starter.services')
    .factory('AES', function() {
      var passphrase = 'SECRET_PASS_PHRASE';

      var iterationCount = 1;
      var keySize = 128;
      var iv = '6edmJL==2c3#2@t6HMeWNLu{NY6z4U';
      var salt = 'v?BBKmLuPcxEaETj=Ujx3/Tm6{8uY9zwXm2GfsGdHT6WHtEH]84k+8n26kj9}EWX[AFQLi]U63J)mPme';

      var aesUtil = new AesUtil(keySize, iterationCount);

      var decryptLegacy = function(text) {
        var aesUtilLegacy = new AesUtil(keySize, 1000);
        return aesUtilLegacy.decrypt(salt, iv, passphrase, text);
      };

      return {
        encrypt: function(text) {
          return aesUtil.encrypt(salt, iv, passphrase, text);
        },
        decrypt: function(text) {
          try {
            if (!localStorage.getItem('appVersion')) {
              return decryptLegacy(text);
            }
            return aesUtil.decrypt(salt, iv, passphrase, text);
          } catch (e) {
            return decryptLegacy(text);
          }
        }
      };
    });
})();
