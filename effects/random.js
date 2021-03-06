var fs = require('fs');
var effectsList = [];
var index = 0;
var currentEffect;
var timingInterval;
var client, model;

function start(clt, mdl){
	client = clt;
	model = mdl;
	fs.readdir('./effects', function(){
		var effects = arguments[1];
		for(var index in  effects){
			//noinspection JSUnfilteredForInLoop
			saveEffectIfAcceptable(effects[index]);
		}

		startEffect();
	});
}

function stopCurrentEffect() {
	if (currentEffect) {
		currentEffect.stop();
	}
}

function startEffect(){
	stopCurrentEffect();
	var effect = effectsList[index];
	console.log('Starting effect: ', effect);
	currentEffect = require('../effects/' + effect);
	incrementIndex();
	currentEffect.start(client, model);
	timingInterval = setTimeout(startEffect, 30000);
}

function incrementIndex(){
	index = Math.floor(Math.random() * effectsList.length);
}

function saveEffectIfAcceptable(effect){
	if(effect.indexOf('base') === -1 && effect.indexOf('random') === -1){
		var pathToEffect = effect.replace('.js', '');
		effectsList.push(pathToEffect);
	}
}

function stop(){
	currentEffect.stop();
	clearTimeout(timingInterval);
}

module.exports.start = start;
module.exports.stop = stop;