var client, model, FRAME_RATE = 20, interval, startMillis, numParticles = 60, particles = [];

function createParticles(){
	for(var i = 0; i < numParticles; i++){
		particles[i] = {
			point: [0, 0, 0],
			intensity: 0.5,
			falloff: 150,
			color: [0, 0, 0]
		};
	}
}

createParticles();

function draw(){
	for (var i = 0; i < numParticles; i++) {
		var direction = -1 + (Math.random() * 2);
		particles[i].point[0] += direction < 0 ? -0.1 : 0.1;
		if(particles[i].point[0] > 1){
			particles[i].point[0] = 1;
		}
		if(particles[i].point[0] < -1){
			particles[i].point[0] = -1;
		}
		particles[i].intensity = Math.random();
		particles[i].falloff = 100 + (Math.random() * 150);
		particles[i].color = [167, 77, 10];
	}

	client.mapParticles(particles, model);
}

function start(clt, mdl){
	startMillis = Date.now();
	client = clt;
	model = mdl;
	interval = setInterval(draw, 1000 / FRAME_RATE);
}

function stop(){
	clearInterval(interval);
}

module.exports.start = start;
module.exports.stop = stop;