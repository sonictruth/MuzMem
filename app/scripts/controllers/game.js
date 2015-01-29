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
    var allCards = [];
    var card1 = null;
    var card2 = null;
    var audio = new Audio();
    

	var shuffle = function shuffle(o){ 
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
	    return o;
	};



  	var Card = function(artist,title,img,sound){
  		 this.artist = artist;
         this.title = title;
         this.img = img;
         this.sound = sound;
         this.flipped = false;
  	};

 	$scope.genreId = $routeParams.genreId;
 	$scope.genreName = 'All'; 
 	$scope.counter = maxTimer ; 	
 	$scope.chosenSongs = [];

 	TopSongs.getSongsByGenre( $scope.genreId ).then(function(data){ 
 		// clean up duplicate 
 		allCards = [];
 		var urls = [];
    	for(var i=0;i< data.length;i++){
    		
			var sng = data[i];
    		var title = sng['im:name'].label;
    		var artist = sng['im:artist'].label;        	
    		var img = sng['im:image'][2].label;
    		var snd = sng.link[1].attributes.href;    		
            
            var found = $.inArray(img, urls) > -1;
            if(!found){
	            urls.push(img);
	    		allCards.push( new Card(artist, title, img, snd) );
    		}
    	} 		
    	console.log(allCards);
 		$scope.startGame();
 	});
 	var result = $.grep(MusicGenres.genres, function(e){ return e.id === $scope.genreId; });


 	if(result.length===1){
 		$scope.genreName = result[0].name;
 	}


 	$scope.startGame = function(){
    	// init
    	var cardDeck = [];
        var grid = [];
        audio.pause();

        // shuffle all 100 songs 
    	shuffle(allCards);

        // current game cards
    	for(var i=0;i< boardSize/2;i++){    		
    		var c = allCards[i];
    		cardDeck.push( c );
    		cardDeck.push( $.extend({}, c) );
    	}

        //create grid
        
        shuffle(cardDeck);
        
        var dim = Math.sqrt(cardDeck.length);

        for (var row = 0; row < dim; row++) {
        	grid[row] = [];
        	for (var col = 0; col < dim; col++) {
        		var card = cardDeck.pop();        		
        		card.flipped = false;        		
        		grid[row][col] = card;
        	}
        }
        
        
        $scope.grid = grid;

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
    

   
   

   $scope.clickCard = function(card){       
       if(card1===null && card2 ===null){
       	  card1 = $scope.flipCard(card);
       }else if(card1!==null && card2 ===null){
       	  card2 = $scope.flipCard(card);
       }else if(card1!==null && card2 !==null){
       	  $scope.flipCard(card1);
       	  $scope.flipCard(card2);       	
       	  card1 = $scope.flipCard(card);
       	  card2 = null;
       }


   };

   $scope.flipCard = function(card){

	   audio.src = card.sound;       
       if(card.flipped){
            audio.pause();
       } else{
            audio.play();
       }
       card.flipped = !card.flipped;       
       return card;
   };


    $scope.goBack = function(){
    		$location.path('/');
    	};
    };

}]);

