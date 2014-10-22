var OPC = new require('../lib/opc');
var model = OPC.loadModel('./layout/strip60.json');
var client = new OPC('localhost', 7890);

var currentEffect;

function stopCurrentEffect() {
	if (currentEffect) {
		currentEffect.stop();
	}
}

function startCurrentEffect(effect) {
	try {
		currentEffect = require('../effects/' + effect);
		currentEffect.start(client, model);
	}
	catch (err) {
		console.log('Error starting effect: ', err);
	}
}

module.exports = {
	triggerEffect: function (effect) {
		stopCurrentEffect();
		startCurrentEffect(effect);
	}
};