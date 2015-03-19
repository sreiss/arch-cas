'use strict'
angular.module('archCas')
  .directive('archCas', function (archCasService, $mdToast, $translate, $window) {
    return {
      restrict: 'E',
      templateUrl: 'components/cas/arch-cas.html',
      controller: function($scope) {

        console.log('arch-cas.directive.js');
      }
    };
  });
