'use strict';

/**
 * @ngdoc function
 * @name muzpuzApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the muzpuzApp
 */

angular.module('muzpuzApp')
.controller('MainCtrl', ['$scope', 'MusicGenres', '$location', function MainCtrl($scope, MusicGenres,$location){
	$scope.selectedGenre =  MusicGenres.getGenres()[0];
	$scope.musicGenres = MusicGenres.getGenres();


    $scope.startGame = function(){
    	
             $location.path('/game/' + $scope.selectedGenre.id);
    	
    };
	console.log($scope);
}]);
