'use strict';

angular.module('archCas').directive('archCasForget', function (archCasForgetService, $mdToast, $translate, $window)
{
  return {
    restrict: 'E',
    templateUrl: 'components/cas-forget/arch-cas-forget.html',
    controller: function($scope, $location, $cookieStore, $base64, $timeout, md5)
    {
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

      $scope.linkLogin = function()
      {
        var params = $location.search();

        if(params.client && params.return)
        {
          $location.url('/?client=' + params.client + '&return=' + params.return);
        }
        else
        {
          $location.url('/');
        }
      }
    }
  };
});
