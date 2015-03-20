'use strict'

angular.module('archCas').directive('archCas', function (archCasService, $mdToast, $translate, $window)
{
    return {
      restrict: 'E',
      templateUrl: 'components/cas/arch-cas.html',
      controller: function($scope, $location, $cookieStore, $base64)
      {
        var init = function()
        {
          // Get query parameters.
          var params = $location.search();
          var paramClientHash = params.clientHash || '';
          var paramClientRedirectUri = params.clientRedirectUri || '';

          // If no given, check personal info in cookies.
          if(paramClientHash.length == 0 || paramClientRedirectUri.length == 0)
          {
            console.log('Params not found in query, check in cookies.');

            var cookieClientId = $cookieStore.get('clientId') || '';
            var cookieClientSecret = $cookieStore.get('clientSecret') || '';
            var cookieClientRedirectUri = $cookieStore.get('clientRedirectUri') || '';

            // If no saved in cookies, save new client.
            if(cookieClientId.length == 0 || cookieClientSecret.length == 0 || cookieClientRedirectUri.length == 0)
            {
              console.log('Params not found in cookies, save new client.');

              archCasService.saveClient(function(result)
              {
                console.log(result.message);

                $cookieStore.put('clientId', result.data.clientId);
                $cookieStore.put('clientSecret', result.data.clientSecret);
                $cookieStore.put('clientRedirectUri', result.data.clientRedirectUri);

                console.log('Params saved in cookies.');
              });
            }
            else
            {
              console.log('Params found in cookies.');
            }
          }
          else
          {
            console.log('Params found in query.');
          }
        }();

        $scope.login = function()
        {
          // Get query parameters.
          var params = $location.search();
          var clientHash = params.clientHash || '';
          var clientRedirectUri = params.clientRedirectUri || '';

          // If no given, check personal info in cookies.
          if(clientHash.length == 0 || clientRedirectUri.length == 0)
          {
            var clientId = $cookieStore.get('clientId');
            var clientSecret = $cookieStore.get('clientSecret');
            clientRedirectUri = $cookieStore.get('clientRedirectUri');

            clientHash = $base64.encode(clientId + ':' + clientSecret);
          }

          archCasService.login($scope.username, $scope.password, clientHash, function(result)
          {
            console.log(result);
          });
        }
      }
    };
  });
