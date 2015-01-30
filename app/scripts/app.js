'use strict';

/**
 * @ngdoc overview
 * @name MuzMemApp
 * @description
 * # MuzMemApp
 *
 * Main module of the application.
 */



 angular
 .module('MuzMemApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
  ])
 .config(function ( $routeProvider) {    
    $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/game/:genreId?', {
      templateUrl: 'views/game.html',
      controller: 'GameCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  });
