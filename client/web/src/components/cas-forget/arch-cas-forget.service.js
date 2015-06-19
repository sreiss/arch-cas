'use strict';

angular.module('archCas').factory('archCasForgetService', function(archHttpService, $q, httpConstant)
{
  var apiUrl = httpConstant.apiUrl + '/oauth';

  return {
    resetPassword: function(email)
    {
      var data =
      {
        "email" : email
      };

      var deferred = $q.defer();

      archHttpService.post(apiUrl + '/user/forget', data).then(function(result)
      {
        deferred.resolve(result);
      })
      .catch(function(err)
      {
        deferred.reject(err.message);
      });

      return deferred.promise;
    }
  };
});
