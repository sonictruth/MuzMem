'use strict';

/**
 * @ngdoc service
 * @name muzpuzApp.musicGenres
 * @description
 * # musicGenres
 * Service in the muzpuzApp.
 */
 angular.module('muzpuzApp')
 .service('MusicGenres', function () {
    // downloaded from https://rss.itunes.apple.com/data/media-types.json
    this.genres = [{'id':'','name':'all'},{'id':'20','name':'alternative'},{'id':'29','name':'anime'},{'id':'2','name':'blues'},{'id':'1122','name':'brazilian'},{'id':'4','name':'children\'smusic'},{'id':'1232','name':'chinese'},{'id':'22','name':'christian&gospel'},{'id':'5','name':'classical'},{'id':'3','name':'comedy'},{'id':'6','name':'country'},{'id':'17','name':'dance'},{'id':'50000063','name':'disney'},{'id':'25','name':'easylistening'},{'id':'7','name':'electronic'},{'id':'28','name':'enka'},{'id':'50','name':'fitness&workout'},{'id':'50000064','name':'frenchpop'},{'id':'50000068','name':'germanfolk'},{'id':'50000066','name':'germanpop'},{'id':'18','name':'hip-hop/rap'},{'id':'8','name':'holiday'},{'id':'1262','name':'indian'},{'id':'53','name':'instrumental'},{'id':'27','name':'j-pop'},{'id':'11','name':'jazz'},{'id':'51','name':'k-pop'},{'id':'52','name':'karaoke'},{'id':'30','name':'kayokyoku'},{'id':'1243','name':'korean'},{'id':'12','name':'latino'},{'id':'13','name':'newage'},{'id':'9','name':'opera'},{'id':'14','name':'pop'},{'id':'15','name':'r&b/soul'},{'id':'24','name':'reggae'},{'id':'21','name':'rock'},{'id':'10','name':'singer/songwriter'},{'id':'16','name':'soundtrack'},{'id':'50000061','name':'spokenword'},{'id':'23','name':'vocal'},{'id':'19','name':'world'}];


 	this.getGenres = function(){
 		return this.genres;
 	};

 });
