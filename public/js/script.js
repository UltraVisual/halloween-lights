var socket = io.connect(location.href), musicPlaying = false;
var musicButton = document.querySelector('.music-button');
var buttons = document.querySelectorAll('button[data-effect]');
var speakButton = document.querySelector('.speak-button');
var recorder;

socket.on('connection-success', function (data) {
	document.querySelector('#status').innerHTML = data.status;
});

socket.on('music-playing', function () {
	musicPlaying = true;
	musicButton.innerHTML = 'Stop Music';
});
socket.on('music-stopped', function () {
	musicPlaying = false;
	musicButton.innerHTML = 'Play Music';
});

for (var i = 0; i < buttons.length; i++) {
	setListener(buttons[i], buttons[i].dataset.effect);
}

function convertFloat32ToInt16(buffer) {
	var l = buffer.length;
	var buf = new Int16Array(l);
	while (l--) {
		buf[l] = Math.min(1, buffer[l]) * 0xFFFF;
	}
	return buf.buffer;
}

function setListener(button, effect) {
	button.addEventListener('click', function () {
		socket.emit('trigger-effect', { effect: effect });
	});
}

musicButton.addEventListener('click', function () {
	musicPlaying ? socket.emit('stop-music') : socket.emit('play-music');
});

speakButton.addEventListener('click', function () {
	if (recordmic.isAvailable) {
		if (!recorder) {
			speakButton.innerHTML = "Stop";
			recorder = recordmic({ mono: 'left', volume: 1, onSampleData: function (left) {
				socket.emit('sound-created', convertFloat32ToInt16(left))
			}}, function (err) {
				if (!err) {
					recorder.start();
				}
			});
		} else {
			recorder.stop();
			recorder = undefined;
			speakButton.innerHTML = "Speak";
		}
	}
});


