'use strict';

/**
 * @ngdoc service
 * @name muzpuzApp.TopSongs
 * @description
 * # TopSongs
 * Service in the muzpuzApp.
 */
 angular.module('muzpuzApp')
 .factory('TopSongs', ['$http', '$q',function ($http, $q) {
    var songsFactory = {};

 	songsFactory.getSongsByGenre = function(genreId){

		var deferred = $q.defer();
 	   
		var genre = '';
 	    if(genreId !== ''){
 	    	genre = '/genre='+genreId+'';
 	    }
 	    
 	    var rssUrl = 'https://itunes.apple.com/us/rss/topsongs/limit=100'+genre+'/explicit=true/json';
 	     // proxy or CORS...CORS!
 	    $http({
 	    	url: rssUrl,
 	    	method: 'GET'   
 	    })
 	    .success(function(data){
 	    	// prost process data
 	    	var songs = data.feed.entry;
            deferred.resolve(songs);
 	    })
 	    .error(function(){
 	    	deferred.reject('HTTP Error');
 	    });



       return deferred.promise;

 	};
 	return songsFactory;

 }]);
