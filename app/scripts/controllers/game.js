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

   	$('#game-screen').hide();
   	$('#game-loader').show();

    $scope.loadingStatus = 'songs info';

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
    	$('#game-screen').hide();
    	$('#game-loader').show();
    	var cardDeck = [];
    	var grid = [];

    	card1 = null;	


    	card2 = null;


    	audio.pause();

        // shuffle all 100 cards 
    	shuffle(allCards);

        // pick current game cards
    	for(var i=0;i< boardSize/2;i++){    		
    		var c = allCards[i];
    		cardDeck.push( c );
    		cardDeck.push( $.extend({}, c) ); // clone
    	}

        //create grid
        
        shuffle(cardDeck);
        
        var dim = Math.sqrt(cardDeck.length);

          
       // preload sounds and img
        var toLoad = boardSize;
        var preloader=function(){ // FIXME: use a safer preloader
        	toLoad -- ;
        	
        	
        	if(toLoad===0){
   		    	
		    	$('#game-loader').hide();
		    	$('#game-screen').fadeIn();

        		$scope.startTimer();		

        	}
        };
        

        for (var row = 0; row < dim; row++) {
        	grid[row] = [];
        	for (var col = 0; col < dim; col++) {
        		var card = cardDeck.pop();        		
        		card.flipped = false;        		
        		card.audio = new Audio();
        		card.audio.addEventListener('canplaythrough', preloader, false); 
        		card.audio.src = card.sound;
        		grid[row][col] = card;
        	}
        }
        
        
        $scope.grid = grid;
 
      
    };

    $scope.gameOver = function(){
    	//alert('Game Over!');
    	$scope.startGame();
    };

    $scope.startTimer = function(){
    	$interval.cancel(intervalId);
    	$scope.counter = maxTimer ;
    	
    	intervalId= $interval(function(){ // FIXME: better use setTimeout
    		$scope.counter --;
    		if($scope.counter<=0){
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

	   
       if(card.flipped){
            card.audio.pause();
       } else{
       	    $scope.currentTitle = card.artist + ' -  ' + card.title  ;
            card.audio.play();
       }
       card.flipped = !card.flipped;       
       return card;
   };


    $scope.goBack = function(){
    		$location.path('/');
    	};
    };

}]);

