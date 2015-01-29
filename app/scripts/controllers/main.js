'use strict';

/**
 * @ngdoc function
 * @name muzpuzApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the muzpuzApp
 */

angular.module('muzpuzApp')
.controller('MainCtrl', ['$scope', 'MusicGenres', function MainCtrl($scope, MusicGenres){
	console.log($scope,MusicGenres);
}]);
