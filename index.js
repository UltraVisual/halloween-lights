var express = require('express');
var hbs = require('express-hbs');
var app = express();
var mainController = require('./controller/main-controller');
var effectController = require('./controller/effect-controller');
var musicController = require('./controller/music-controller');
var speechController = require('./controller/speech-controller');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', mainController.init);

app.engine('hbs', hbs.express3({}));

app.use(express.static(process.cwd() + '/public'));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

io.on('connection', addSocketListeners);

function stopMusic(socket) {
	musicController.stopMusic();
	socket.emit('music-stopped');
}

function addSocketListeners(socket) {
	socket.emit('connection-success', { status: 'Connected' });

	socket.on('trigger-effect', function (effect) {
		effectController.triggerEffect(effect)
	});

	socket.on('play-music', function () {
		musicController.playMusic();
		socket.emit('music-playing');
	});

	socket.on('stop-music', function () {
		stopMusic(socket);
	});

	socket.on('speak', function (speech) {
		if(musicController.isPlaying()){
			stopMusic(socket);
		}
		speechController.speak(speech);
	})
}
