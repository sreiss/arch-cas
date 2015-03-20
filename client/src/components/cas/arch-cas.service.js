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
        grant_type : "password",
        username : username,
        password : password
      };

      var config =
      {
        headers :
        {
          "Authorization" : 'Basic ' + clientHash,
          "Content-Type" : "application/x-www-form-urlencoded"
        },
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
      }

      archHttpService.post(apiUrl + '/token', data, config).then(function(result)
      {
        callback(result);
      });
    }
  };
});
