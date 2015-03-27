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
          // Check token in coockies.
          var token = $cookieStore.get('token');

          if(!token)
          {
            console.log('INIT : Not connected');

            // Get query parameters.
            var params = $location.search();
            var paramClientHash = params.clientHash || '';
            var paramClientRedirectUri = params.clientRedirectUri || '';

            // If no given, check personal info in cookies.
            if(paramClientHash.length == 0 || paramClientRedirectUri.length == 0)
            {
              console.log('INIT : Params not found in query, check in cookies.');

              var cookieClientId = $cookieStore.get('clientId') || '';
              var cookieClientSecret = $cookieStore.get('clientSecret') || '';
              var cookieClientRedirectUri = $cookieStore.get('clientRedirectUri') || '';

              // If no saved in cookies, save new client.
              if(cookieClientId.length == 0 || cookieClientSecret.length == 0 || cookieClientRedirectUri.length == 0)
              {
                console.log('INIT : Params not found in cookies, save new client.');

                archCasService.saveClient().then(function(result)
                {
                  $cookieStore.put('clientId', result.data.clientId);
                  $cookieStore.put('clientSecret', result.data.clientSecret);
                  $cookieStore.put('clientRedirectUri', result.data.clientRedirectUri);

                  console.log('INIT : Params saved in cookies.');
                })
                .catch(function(err)
                {
                  $scope.$error = {"init" : true, "login" : false};
                  $scope.$success = {"alreadylogin" : false, "login" : false, "loginRedirect" : false};
                });
              }
              else
              {
                console.log('INIT : Params found in cookies.');
              }
            }
            else
            {
              console.log('INIT : Params found in query.');
            }
          }
          else
          {
            console.log('INIT : Already connected.');

            $scope.alreadyLogged = true;
            $scope.$error = {"init" : false, "login" : false};
            $scope.$success = {"alreadylogin" : true, "login" : false, "loginRedirect" : false};
          }
        }();

        $scope.login = function()
        {
          // Get query parameters.
          var params = $location.search();
          var clientHash = params.clientHash || '';
          var clientRedirectUri = params.clientRedirectUri || '';

          // If no given, check personal info in cookies.
          if(clientHash.length == 0)
          {
            console.log('LOGIN : Params not found in query, check in cookies.');

            var clientId = $cookieStore.get('clientId');
            var clientSecret = $cookieStore.get('clientSecret');
            clientRedirectUri = $cookieStore.get('clientRedirectUri');

            clientHash = $base64.encode(clientId + ':' + clientSecret);
          }
          else
          {
            console.log('LOGIN : Params found in query.');
          }

          if($scope.username.length > 0 && $scope.password.length > 0)
          {
            archCasService.login($scope.username, $scope.password, clientHash).then(function(result)
            {
              $cookieStore.put('token', result);
              $scope.$error = {"init" : false, "login" : false};

              if(clientRedirectUri.length > 0)
              {
                $scope.$success = {"alreadylogin" : false, "login" : false, "loginRedirect" : true};
                window.setTimeout("location=(clientRedirectUri);",2000);
              }
              else
              {
                $scope.$success = {"alreadylogin" : false, "login" : true, "loginRedirect" : false};
              }

              console.log(result);
            },
            function(err)
            {
              $scope.$error = {"init" : false, "login" : true};
              $scope.$success = {"alreadylogin" : false, "login" : false, "loginRedirect" : false};
            });
          }
        }
      }
    };
  });
