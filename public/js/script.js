var socket = io.connect(location.href), musicPlaying = false;
var musicButton = document.querySelector('.music-button');
var buttons = document.querySelectorAll('button[data-effect]');

socket.on('connection-success', function (data) {
	document.querySelector('#status').innerHTML = data.status;
});

socket.on('music-playing', function(){
	musicPlaying = true;
	musicButton.innerHTML = 'Stop Music';
});
socket.on('music-stopped', function(){
	musicPlaying = false;
	musicButton.innerHTML = 'Play Music';
});

for(var i = 0; i < buttons.length; i++){
	setListener(buttons[i], buttons[i].dataset.effect);
}

function setListener(button, effect){
	button.addEventListener('click', function(){
		socket.emit('trigger-effect', { effect: effect });
	});
}

musicButton.addEventListener('click', function(){
	musicPlaying ? socket.emit('stop-music') : socket.emit('play-music');
});
