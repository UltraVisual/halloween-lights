var fs = require('fs');
var speeches = [];

function formatLabel(title) {
	return title.charAt(0).toUpperCase() + title.substring(1).replace(/-/g, ' ');
}
function getSpeeches() {
	var speechFilesLocation = './speeches';
	fs.readdir(speechFilesLocation, function () {
		var speechFiles = arguments[1];
		for (var index in  speechFiles) {
			var title = speechFiles[index].replace(/.mp3/g, '');
			speeches.push({
				data: title,
				label: formatLabel(title)
			});
		}
	});
}

getSpeeches();

module.exports = {
	init: function (req, res) {
		res.render('index', { speeches: speeches });
	}
};