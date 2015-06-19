'use strict';

angular.module('archCas').factory('archCasService', function(archHttpService, $q, httpConstant)
{
  var apiUrl = httpConstant.apiUrl + '/oauth';

  return {
    saveClient: function()
    {
      var client =
      {
        "name" : httpConstant.clientName,
        "redirect_uri" : httpConstant.clientRedirectUri
      };

      var deferred = $q.defer();

      archHttpService.post(apiUrl + '/client', client).then(function(result)
      {
        deferred.resolve(result);
      })
      .catch(function(err)
      {
        deferred.reject(err.message);
      });

      return deferred.promise;
    },

    login: function(username, password, clientHash)
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
        transformRequest: function(obj)
        {
          var str = [];
          for(var p in obj)
          {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }

          return str.join("&");
        }
      }

      var deferred = $q.defer();

      archHttpService.post(apiUrl + '/token', data, config).then(function(result)
      {
        deferred.resolve(result);
      })
      .catch(function(err)
      {
        deferred.reject(err.message);
      });

      return deferred.promise;
    },

    getUser: function(accesstoken)
    {
      var deferred = $q.defer();

      archHttpService.get(apiUrl + '/accesstoken/' + accesstoken).then(function(accesstoken)
      {
        return accesstoken;
      })
      .then(function(accesstoken)
      {
        archHttpService.get(apiUrl + '/user/' + accesstoken.data.userId).then(function(user)
        {
          deferred.resolve(user);
        })
      })
      .catch(function(err)
      {
        deferred.reject(err.message);
      });

      return deferred.promise;
    }
  };
});
