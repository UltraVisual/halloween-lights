var socket = io.connect(location.href), musicPlaying = false;
var musicButton = document.querySelector('.music-button');
var effectButtons = document.querySelectorAll('button[data-effect]');
var speechButtons = document.querySelectorAll('button[data-speech]');
var i;

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

function setListenersForEffectButtons(button, effect) {
	button.addEventListener('click', function () {
		socket.emit('trigger-effect', effect);
	});
}

function setListenersForSpeechButtons(button, speech){
	button.addEventListener('click', function () {
		socket.emit('speak', speech);
	});
}

musicButton.addEventListener('click', function () {
	musicPlaying ? socket.emit('stop-music') : socket.emit('play-music');
});

for (i = 0; i < effectButtons.length; i++) {
	setListenersForEffectButtons(effectButtons[i], effectButtons[i].dataset.effect);
}
for (i = 0; i < speechButtons.length; i++) {
	setListenersForSpeechButtons(speechButtons[i], speechButtons[i].dataset.speech);
}



