'use strict';

angular.module('archCas').directive('archCasForget', function (archCasForgetService, $mdToast, $translate, $window)
{
  return {
    restrict: 'E',
    templateUrl: 'components/cas-forget/arch-cas-forget.html',
    controller: function($scope, $location, $cookieStore, $base64, $timeout, md5)
    {
      var init = function()
      {
        // Get query params.
        var params = $location.search();

        // Delete token.
        if(params.logout)
        {
          $cookieStore.remove('token');
        }

        // Check token in coockies.
        var token = $cookieStore.get('token');

        if(!token || isExpired(token))
        {
        }
        else
        {
          if(params.return)
          {
            window.location.href = atob(params.return) + '/#/token/' + btoa(encodeURIComponent(angular.toJson(token)));
          }
          else
          {
            console.log('INIT : Already connected.');
            $scope.alreadyLogged = true;
            $scope.$error = {"init" : false, "login" : false};
            $scope.$success = {"alreadylogin" : true, "login" : false, "loginRedirect" : false};
          }
        }
      }();

      function isExpired(token)
      {
        var now = new Date();

        if(now.getTime() > token.expired_at)
        {
          $cookieStore.remove('token');
          return true;
        }
        else
        {
          return false;
        }
      }

      $scope.logout = function()
      {
        $cookieStore.remove('token');
        window.location.reload();
      };

      $scope.resetPassword = function()
      {
        if($scope.username.length > 0)
        {
          archCasForgetService.resetPassword($scope.username).then(function(result)
          {
            return result;
          })
          .then(function(result)
          {
            $scope.$error = {"email" : false};
            $scope.$success = {"alreadylogin" : false, "resetPassword" : true};
            $timeout(function()
            {
              var params = $location.search();
              if(params.client && params.return){
                $location.url('/?client=' + params.client + '&return=' + params.return);
              }else{
                $location.url('/');
              }
            }, 2000);
          })
          .catch(function(err)
          {
            $scope.$error = {"email" : true};
            $scope.$success = {"alreadylogin" : false, "resetPassword" : false};
          });
        }
      }
    }
  };
});
