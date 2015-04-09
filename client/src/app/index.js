'use strict';

angular.module('archCas', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngRoute', 'ngMaterial', 'angular-md5', 'pascalprecht.translate', 'base64'])
  .config(function ($translateProvider, $routeProvider, i18nfrFRConstant, i18nenUSConstant, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('orange', { 'default' : '800'})
      .accentPalette('green');

    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });

    $translateProvider
      .translations('fr', i18nfrFRConstant)
      .translations('en', i18nenUSConstant)
      .preferredLanguage('fr');
  })
;
