var client, FRAME_RATE = 60, interval;

function draw(){

}

function start(clt){
	client = clt;
	interval = setInterval(draw, 1000 / FRAME_RATE);
}

function stop(){
	clearInterval(interval);
}

module.exports.start = start;
module.exports.stop = stop;