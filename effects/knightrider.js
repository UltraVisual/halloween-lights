var numParticles = 60;
var particles = [];
var FRAME_RATE = 20;
var interval;
var increase = true;
var client, model, amount = 1;

var RED = [255, 0, 0];
var BLACK = [0, 0, 0];

function createParticles() {
	var color = [255, 0, 0];
	for (var i = 0; i < numParticles; i++) {
		particles[i] = {
			point: [0, 0, 0],
			intensity: 1,
			falloff: 75,
			color: color
		};
	}
}

function draw() {
	var index = 0;
	for (var i = numParticles / 2; i < numParticles; i++) {
		(index < amount) ? particles[i].color = RED : particles[i].color = BLACK;
		index++;
	}

	index = 0;

	for (var j = 0; j < (numParticles / 2) - 1; j++) {
		(index < amount) ? particles[j].color = RED : particles[j].color = BLACK;
		index++;
	}

	if(increase){
		amount++;
		if(amount >= 12){
			increase = false;
		}
	}
	else{
		amount--;
		if(amount == 1){
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
