'use strict'
angular.module('archCas')
  .factory('archHttpService', function($http, $q) {
    return {
      get: function(url, config) {
        var deferred = $q.defer();
        config = config || {};
        $http.get(url, config)
          .success(function(result) {
            deferred.resolve(result);
          })
          .error(function(err) {
            deferred.reject(err);
          });
        return deferred.promise;
      },

      post: function(url, data, config)
      {
        var deferred = $q.defer();
        config = config || {};
        $http.post(url, data, config)
          .success(function(result) {
            deferred.resolve(result);
          })
          .error(function(err) {
            deferred.reject(err);
          });
        return deferred.promise;
      },
      delete: function(url, config) {
        var deferred = $q.defer();
        config = config || {};
        $http.delete(url, config)
          .success(function(result) {
            deferred.resolve(result);
          })
          .error(function(err) {
            deferred.reject(err);
          });
        return deferred.promise;
      },

      setHeader: function(name, value)
      {
        $http.defaults.headers.common[name] = value;
      },

      unsetHeader: function(name, value)
      {
        delete $http.defaults.headers.commun[name];
      }
    };
  });
