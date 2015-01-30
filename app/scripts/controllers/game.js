/*global $:false, alert: false */
'use strict';

/**
 * @ngdoc function
 * @name MuzMemApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the MuzMemApp
 */

 /*
TODO: 
animations
add modernizer to detect sound add 
mute button
*/

angular.module('MuzMemApp')
.controller('GameCtrl', ['$interval','MusicGenres','$scope','$routeParams','$location','TopSongs',function GameCtrl($interval, MusicGenres, $scope, $routeParams,$location,TopSongs) {


  var boardSize = 16;
  var dimension = Math.sqrt(boardSize);
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
   this.matched = false;
 };

 $scope.genreId = $routeParams.genreId;
 $scope.genreName = 'All'; 
 $scope.chosenSongs = [];

 $('#game-screen').hide();
 $('#game-loader').show();

 $scope.loadingStatus = 'songs info';

 TopSongs.getSongsByGenre( $scope.genreId ).then(function(data){ 
 		// clean up duplicate artists
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

 // set genre title
 var result = $.grep(MusicGenres.genres, function(e){ return e.id === $scope.genreId; });

 if(result.length===1){
   $scope.genreName = result[0].name;
 }


 // buttons
 $scope.goBack = function(){
   audio.pause();
   $location.path('/');
 };


 $scope.startGame = function(){
    	// init
    	$('#game-screen').hide();
    	$('#game-loader').show();
    	var cardDeck = [];
    	var grid = [];
    	card1 = null;	
    	card2 = null;

      $scope.counter = 0;
      $scope.cardFlips = 0;
      $scope.cardsleft = boardSize/2;

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


       for (var row = 0; row < dimension; row++) {
         grid[row] = [];
         for (var col = 0; col < dimension; col++) {
          var card = cardDeck.pop();        		
          this.matched = card.flipped = false;        		
          card.audio = new Audio();
          card.audio.addEventListener('canplaythrough', preloader, false); 
          card.audio.src = card.sound;
          grid[row][col] = card;
        }
      }


      $scope.grid = grid;

      
    };

    $scope.gameOver = function(){
    	  
      $scope.currentTitle = 'Game Over !!!';
      $interval.cancel(intervalId);
    };

    $scope.startTimer = function(){
    	$interval.cancel(intervalId);

    	intervalId= $interval(function(){ // FIXME: better use setTimeout
    		$scope.counter ++;

    	},1000 );




     $scope.clickCard = function(card){             
      if(card.matched || card === card1 || card ===card2){
        return;
      }
      $scope.cardFlips = parseInt($scope.cardFlips)+1;

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
      if(card1.img===card2.img){        
        card1.matched  = card2.matched = true;
        card1 = card2 = null;
        $scope.cardsleft = parseInt($scope.cardsleft)-1;
        if(parseInt($scope.cardsleft) ===0){
            $scope.gameOver();
        }
      }   


    };

    $scope.flipCard = function(card){
      audio.pause();


      if(!card.flipped){
        $scope.currentTitle = card.artist + ' -  ' + card.title  ;          
        audio = card.audio;
        audio.play();
      }
      card.flipped = !card.flipped;       
    


      return card;

    };



      };

    }]);

