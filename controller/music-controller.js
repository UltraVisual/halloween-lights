var play = require('../lib/play').Play();
var music = [
	'./music/SpookMedely1_64kb.mp3',
	'./music/SpookMedely2_64kb.mp3',
	'./music/SpookMedely3_64kb.mp3',
	'./music/SpookMedely4_64kb.mp3',
	'./music/SpookMedely5_64kb.mp3',
	'./music/SpookMedely6_64kb.mp3',
	'./music/SpookMedely7_64kb.mp3'
];
var index = 0;

play.usePlayer('mplayer');

play.on('play', function () {
	console.log('I just started playing!');
});

play.on('error', function () {
	console.log('I can\'t play!');
});

play.on('stop', function () {
	console.log('I stopped playing!');
});

function incrementIndex(){
	index++;
	if(index > music.length){
		index = 0;
	}
}

function playMusic(){
	play.sound(music[index], function(){
		incrementIndex();
		playMusic();
	});
}

function stopMusic(){
	play.stop();
	incrementIndex();
}

module.exports.playMusic = playMusic;
module.exports.stopMusic = stopMusic;