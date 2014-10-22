var play = require('../lib/play').Play();
var fs = require('fs');
var music = [];
var index = 0;
var isPlaying = false;

play.usePlayer('mplayer');

function getMusic(){
	var musicFilesLocation = './music';
	fs.readdir(musicFilesLocation, function(){
		var musicFiles = arguments[1];
		for(var index in  musicFiles){
			music.push(musicFilesLocation + '/' + musicFiles[index]);
		}
	});
}

function incrementIndex(){
	index++;
	if(index > music.length){
		index = 0;
	}
}

function playMusic(){
	isPlaying = true;
	play.sound(music[index], function(){
		incrementIndex();
		playMusic();
	});
}

function stopMusic(){
	play.stop();
	isPlaying = false;
	incrementIndex();
}

getMusic();

module.exports.playMusic = playMusic;
module.exports.stopMusic = stopMusic;
module.exports.isPlaying = function(){
	return isPlaying;
};