'use strict';

angular.module('archCas', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngRoute', 'ngMaterial', 'pascalprecht.translate'])
  .config(function ($translateProvider, $routeProvider, i18nfrFRConstant, i18nenUSConstant, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('lime');

    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });

    console.log('app/index.js');

    $translateProvider
      .translations('fr', i18nfrFRConstant)
      .translations('en', i18nenUSConstant)
      .preferredLanguage('fr');
  })
;
