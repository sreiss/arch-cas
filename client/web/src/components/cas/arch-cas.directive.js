'use strict';

angular.module('archCas').directive('archCas', function (archCasService, $mdToast, $translate, $window)
{
    return {
      restrict: 'E',
      templateUrl: 'components/cas/arch-cas.html',
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
            console.log('INIT : Not connected');

            // Get query parameters.
            var paramClientHash = params.client || '';
            var paramClientRedirectUri = params.return || '';

            // If no given, check personal info in cookies.
            if(paramClientHash.length == 0 || paramClientRedirectUri.length == 0)
            {
              console.log('INIT : Params not found in query, check in cookies.');

              var cookieClientId = $cookieStore.get('CAS_clientId') || '';
              var cookieClientSecret = $cookieStore.get('CAS_clientSecret') || '';
              var cookieClientRedirectUri = $cookieStore.get('CAS_clientRedirectUri') || '';

              // If no saved in cookies, save new client.
              if(cookieClientId.length == 0 || cookieClientSecret.length == 0 || cookieClientRedirectUri.length == 0)
              {
                console.log('INIT : Params not found in cookies, save new client.');

                archCasService.saveClient().then(function(result)
                {
                  $cookieStore.put('CAS_clientId', result.data.clientId);
                  $cookieStore.put('CAS_clientSecret', result.data.clientSecret);
                  $cookieStore.put('CAS_clientRedirectUri', result.data.clientRedirectUri);

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

        $scope.login = function()
        {
          // Get query parameters.
          var params = $location.search();
          var clientHash = params.client || '';
          var clientRedirectUriHash = params.return || '';

          // If no given, check personal info in cookies.
          if(!clientHash)
          {
            console.log('LOGIN : Params not found in query, check in cookies.');

            var clientId = $cookieStore.get('CAS_clientId');
            var clientSecret = $cookieStore.get('CAS_clientSecret');
            clientHash = $base64.encode(clientId + ':' + clientSecret);
          }
          else
          {
            console.log('LOGIN : Params found in query.');
          }

          if($scope.username.length > 0 && $scope.password.length > 0)
          {
            archCasService.login($scope.username, md5.createHash($scope.password), clientHash).then(function(token)
            {
              return token;
            })
            .then(function(token)
            {
              var now = new Date();
              now.setSeconds(now.getSeconds() + token.expires_in);
              token.expired_at = now.getTime();

              archCasService.getUser(token.access_token).then(function(user)
              {
                token.user = user.data;
                $cookieStore.put('token', token);

                //Métode pour le cookie
                var tokenParam = btoa(encodeURIComponent(angular.toJson(token)));
                $scope.alreadyLogged = true;
                $scope.$error = {"init" : false, "login" : false};

                if(clientRedirectUriHash)
                {
                  var clientRedirectUri = atob(clientRedirectUriHash);
                  $scope.$success = {"alreadylogin" : false, "login" : false, "loginRedirect" : true};

                  $timeout(function()
                  {
                     window.location.href = clientRedirectUri + '/#/token/' + tokenParam;
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
