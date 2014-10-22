var play = require('../lib/play').Play();

play.usePlayer('mplayer');

module.exports.speak = function(speech){
	play.stop();
	play.sound('./speeches/' + speech + '.mp3', function(){
		//de nada
	})
};