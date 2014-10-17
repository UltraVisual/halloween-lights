/*
 * Model creation script for a single 64-pixel strip
 *
 * 2014 Micah Elizabeth Scott
 * This file is released into the public domain.
 */

var fs = require('fs');

var model = [];
var scale = -4 / 60.0;
var centerX = 59 / 2.0;
var index = 0;

for (var i = 0; i < 60; i++) {
    model[index++] = {
        point: [  (i - centerX) * scale, 0, 0 ]
    };
}

fs.writeFile("./strip60.json", JSON.stringify(model), function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("The file was saved!");
	}
});
