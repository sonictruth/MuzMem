'use strict';

/**
 * @ngdoc overview
 * @name muzpuzApp
 * @description
 * # muzpuzApp
 *
 * Main module of the application.
 */

angular.module('caca',[] );


angular
  .module('muzpuzApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ( $routeProvider) {
    // test

    console.log('muzpuzApp', '>>>',$routeProvider);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
