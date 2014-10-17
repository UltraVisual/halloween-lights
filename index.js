var express = require('express');
var hbs = require('express-hbs');
var app = express();
var controller = require('./controller/main-controller');
var socketServer = require('http').createServer(app);
var io = require('socket.io')(socketServer);

socketServer.listen(3000);

app.get('/', controller.init);

app.engine('hbs', hbs.express3({}));

app.use(express.static(process.cwd() + '/public'));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

io.on('connection', function (socket) {
	socket.emit('connection-success', { status: 'connected' });
	socket.on('trigger-effect', function (data) {
		controller.triggerEffect(data.effect)
	});
});