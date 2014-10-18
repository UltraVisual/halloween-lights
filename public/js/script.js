var socket = io.connect(location.href);

socket.on('connection-success', function (data) {
	document.querySelector('#status').innerHTML = data.status;
});

var krButton = document.querySelector('#krButton');
var pulseButton = document.querySelector('#pulseButton');
var rbButton = document.querySelector('#rbButton');

krButton.addEventListener('click', function(){
	socket.emit('trigger-effect', { effect: 'knightrider' });
});

pulseButton.addEventListener('click', function(){
	socket.emit('trigger-effect', { effect: 'chase' });
});

rbButton.addEventListener('click', function(){
	socket.emit('trigger-effect', { effect: 'redblue' });
});
