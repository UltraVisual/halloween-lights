var client, interval;

function draw() {
	var millis = new Date().getTime();

	for (var pixel = 0; pixel < 512; pixel++) {
		var t = pixel * 0.2 + millis * 0.002;
		var red = 128 + 96 * Math.sin(t);
		var green = 0;
		var blue = 128 + 96 * Math.sin(t + 0.3);

		client.setPixel(pixel, red, green, blue);
	}
	client.writePixels();
}


module.exports.start = function (cl) {
	client = cl;
	interval = setInterval(draw, 1000 / 30);
};

module.exports.stop = function(){
	clearInterval(interval);
}

