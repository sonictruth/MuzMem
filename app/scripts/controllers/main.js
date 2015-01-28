'use strict';

/**
 * @ngdoc function
 * @name muzpuzApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the muzpuzApp
 */
angular.module('muzpuzApp')
  .controller('MainCtrl', function ($scope) {
  	console.log("Z1",$scope);
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
