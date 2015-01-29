/*global $:false */
'use strict';

/**
 * @ngdoc function
 * @name muzpuzApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the muzpuzApp
 */
 angular.module('muzpuzApp')
 .controller('GameCtrl', ['$interval','MusicGenres','$scope','$routeParams','$location','TopSongs',function GameCtrl($interval, MusicGenres, $scope, $routeParams,$location,TopSongs) {

    var maxTimer = 120;
    var boardSize = 16;
    var intervalId = null;
	var shuffleSongs = function shuffle(o){ 
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
	    return o;
	};

  	var Card = function(title,img,sound){
         this.title = title;
         this.img = img;
         this.sound = sound;
  	};

 	$scope.genreId = $routeParams.genreId;
 	$scope.genreName = 'All'; 
 	$scope.counter = maxTimer ; 	
 	$scope.chosenSongs = [];

 	TopSongs.getSongsByGenre( $scope.genreId ).then(function(data){ 
 		$scope.songs = data; 		
 		$scope.startGame();
 	});
 	var result = $.grep(MusicGenres.genres, function(e){ return e.id === $scope.genreId; });


 	if(result.length===1){
 		$scope.genreName = result[0].name;
 	}


 	$scope.startGame = function(){
    	// init
    	$scope.chosenSongs = [];
      

        shuffleSongs($scope.songs);

        for(var i=0;i<$scope.boardSize;i++){
        	$scope.chosenSongs.push($scope.songs[i]);        	
        }
        
         $scope.startTimer();
        // preload sounds
        
      
    };
    $scope.gameOver = function(){
    	//alert('Game Over!');
    };

    $scope.startTimer = function(){
    	$interval.cancel(intervalId);
    	$scope.counter = maxTimer ;
    	
    	intervalId= $interval(function(){
    		$scope.counter --;
    		if($scope.counter===0){
    			$scope.gameOver();
    		}

    	},1000, $scope.maxTimer );
    



    $scope.goBack = function(){
    		$location.path('/');
    	};
    };

}]);

