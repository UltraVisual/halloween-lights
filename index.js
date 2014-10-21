var express = require('express');
var hbs = require('express-hbs');
var app = express();
var controller = require('./controller/main-controller');
var musicController = require('./controller/music-controller');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', controller.init);

app.engine('hbs', hbs.express3({}));

app.use(express.static(process.cwd() + '/public'));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

io.on('connection', addSocketListeners);

function addSocketListeners(socket) {
	socket.emit('connection-success', { status: 'Connected' });

	socket.on('trigger-effect', function (data) {
		controller.triggerEffect(data.effect)
	});

	socket.on('play-music', function () {
		musicController.playMusic();
		socket.emit('music-playing');
	});

	socket.on('stop-music', function () {
		musicController.stopMusic();
		socket.emit('music-stopped');
	})

	socket.on('sound-created', function(sound){
		console.log(sound.left);
	})
}
