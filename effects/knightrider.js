var tinycolor = require('../lib/tinycolor');
var OPC = new require('../lib/opc');
var numParticles = 60;
var particles = [];
var FRAME_RATE = 20;
var interval;
var increase = true;
var client, model;

function createParticles() {
	var particleData = new tinycolor({r: 255, g: 0, b: 0});
	var color = OPC.hsv(particleData.toHsv().h, particleData.toHsv().s, particleData.toHsv().v);
	for (var i = 0; i < numParticles; i++) {
		particles[i] = {
			point: [0, 0, 0],
			intensity: 1,
			falloff: 150,
			color: color
		};
	}
}

function draw() {
	for (var i = 0; i < numParticles; i++) {

		var particle = particles[i];

		if (increase) {
			particle.intensity += 0.1;
			particle.falloff -= 5;
		}
		else {
			particle.intensity -= 0.1;
			particle.falloff += 5;
		}

//		console.log(particle)

		if (particle.intensity > 2) {
			increase = false;
		}

		if (particle.intensity <= 0.1) {
			increase = true;
		}
	}

	client.mapParticles(particles, model);
}

createParticles();

function stop() {
	clearInterval(interval);
}

function start(cl, ml) {
	client = cl;
	model = ml;
	interval = setInterval(draw, 1000 / FRAME_RATE);
}

module.exports.start = start;
module.exports.stop = stop;
