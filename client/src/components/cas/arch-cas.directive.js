'use strict'

angular.module('archCas').directive('archCas', function (archCasService, $mdToast, $translate, $window)
{
    return {
      restrict: 'E',
      templateUrl: 'components/cas/arch-cas.html',
      controller: function($scope, $location, $cookieStore, $base64, $timeout)
      {
        var init = function()
        {
          // Check token in coockies.
          var token = $cookieStore.get('token');

          if(!token || isExpired(token))
          {
            console.log('INIT : Not connected');

            // Get query parameters.
            var params = $location.search();
            var paramClientHash = params.client || '';
            var paramClientRedirectUri = params.return || '';

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

        function isExpired(token)
        {
          var now = new Date();

          if(now.getTime() > token.expired_at)
          {
            return true;
          }
          else
          {
            return false;
          }
        };

        $scope.login = function()
        {
          // Get query parameters.
          var params = $location.search();
          var clientHash = params.client || '';
          var clientRedirectUriHash = params.return || '';

          // If no given, check personal info in cookies.
          if(clientHash.length == 0)
          {
            console.log('LOGIN : Params not found in query, check in cookies.');

            var clientId = $cookieStore.get('clientId');
            var clientSecret = $cookieStore.get('clientSecret');
            clientHash = $base64.encode(clientId + ':' + clientSecret);
          }
          else
          {
            console.log('LOGIN : Params found in query.');
          }

          if($scope.username.length > 0 && $scope.password.length > 0)
          {
            archCasService.login($scope.username, $scope.password, clientHash).then(function(token)
            {
              return token;
            })
            .then(function(token)
            {
              var now = new Date();
              now.setSeconds(now.getSeconds() + token.expires_in);
              token.expired_at = now.getTime();

              archCasService.getUser($scope.username, $scope.password).then(function(user)
              {
                token.user = user.data;

                $cookieStore.put('token', token);
                $scope.$error = {"init" : false, "login" : false};

                if(clientRedirectUriHash)
                {
                  var clientRedirectUri = $base64.decode(clientRedirectUriHash);

                  $scope.$success = {"alreadylogin" : false, "login" : false, "loginRedirect" : true};

                  $timeout(function()
                  {
                    console.log(clientRedirectUri);
                    window.location.href = clientRedirectUri;
                  }, 2000);
                 }
                 else
                 {
                    $scope.$success = {"alreadylogin" : false, "login" : true, "loginRedirect" : false};
                 }
              });
            })
            .catch(function(err)
            {
              $scope.$error = {"init" : false, "login" : true};
              $scope.$success = {"alreadylogin" : false, "login" : false, "loginRedirect" : false};
            });
          }
        }
      }
    };
  });
