var chase = require('../effects/chase');
var redblue = require('../effects/redblue');
var knightrider = require('../effects/knightrider');
var flame = require('../effects/flame');

var OPC = new require('../lib/opc');
var model = OPC.loadModel('./layout/strip60.json');
var client = new OPC('localhost', 7890);

var currenteffect;

function stopCurrentEffect(){
	if(currenteffect){
		currenteffect.stop();
	}
}

var controller = {
	init: function(req, res){
		res.render('index');
	},
	triggerEffect: function(effect){
		switch(effect){
			case 'knightrider':
				stopCurrentEffect();
				knightrider.start(client, model);
				currenteffect = knightrider;
				break;
			case 'redblue':
				stopCurrentEffect();
				redblue.start(client, model);
				currenteffect = redblue;
				break;
			case 'chase':
				stopCurrentEffect();
				chase.start(client, model);
				currenteffect = chase;
				break;
			case 'flame':
				stopCurrentEffect();
				flame.start(client, model);
				currenteffect = flame;
				break;
		}
	}
}

module.exports = controller;