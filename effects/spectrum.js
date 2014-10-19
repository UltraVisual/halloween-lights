var client, FRAME_RATE = 60, interval;

var pixels = [];
var MAX_COLOR = 128;

function createPixels(){
	for(var i = 0; i < 60; i++){
		var red = Math.round(Math.random() * MAX_COLOR);
		var green = Math.round(Math.random() * MAX_COLOR);
		var blue = Math.round(Math.random() * MAX_COLOR);
		pixels.push({
			r: red,
			g: green,
			b: blue
		});
	}
}

function draw() {
	var millis = new Date().getTime();

	for (var index = 0; index < 60; index++) {
		var pixel = pixels[index];
		var t = index * 0.2 + millis * 0.002;
		var red = pixel.r + 96 * Math.sin(t);
		var green = pixel.g + 96 * Math.sin(t + 0.6);
		var blue = pixel.b + 96 * Math.sin(t + 0.3);

		client.setPixel(index, red, green, blue);
	}
	client.writePixels();
}

function start(clt){
	client = clt;
	createPixels();
	interval = setInterval(draw, 1000 / FRAME_RATE);
}

function stop(){
	clearInterval(interval);
}


module.exports.start = start;
module.exports.stop = stop;