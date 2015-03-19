'use strict'

angular.module('archCas').factory('archCasService', function(archHttpService, $q, httpConstant)
{
  var apiUrl = httpConstant.apiUrl + '/oauth/oauth';

  return {
    saveClient: function(callback)
    {
      var client =
      {
        "name" : httpConstant.clientName,
        "redirect_uri" : httpConstant.clientRedirectUri
      }

      archHttpService.post(apiUrl + '/client', client).then(function(result)
      {
        callback(result);
      });
    },

    login: function(username, password, clientHash, callback)
    {
      var data =
      {
        "grant_type" : "password",
        "username" : username,
        "password" : password
      };

      archHttpService.setHeader('Authorization', 'Basic ' + clientHash);

      archHttpService.post(apiUrl + '/token', data).then(function(result)
      {
        callback(result);
      });
    }
  };
});
