var startPosition = 0;
var numParticles = 60;
var particles = [];
var amount = 15;
var FRAME_RATE = 30;
var RIGHT = 'right';
var LEFT = 'left';
var interval;

var client, model;

function createParticles(){
	for(var i = 0; i < numParticles; i++){
		particles[i] = {
			point: [0, 0, 0],
			intensity: 1,
			falloff: 150,
			direction: RIGHT,
			color: [0, 0, 0]
		};
	}
}

function draw() {
	for (var i = 0; i < numParticles; i++) {

		var particle = particles[i];

		var red = 0;
		var blue = (i > startPosition && i < startPosition + amount) ? 255 : 0;
		var green = 0;

		if(particle.direction == LEFT){
			particle.point[0] -= 0.1;
		}
		else{
			particle.point[0] += 0.1;
		}

		if(particle.point[0] > 1){
			particle.direction = LEFT
		}
		if(particle.point[0] < -1){
			particle.direction = RIGHT
		}

		particle.color = [red, green, blue];
	}

	client.mapParticles(particles, model);
}

createParticles();

function stop(){
	clearInterval(interval);
}

function start(cl, ml){
	client = cl;
	model = ml;
	interval = setInterval(draw, 1000 / FRAME_RATE);
}

module.exports.start = start;
module.exports.stop = stop;
