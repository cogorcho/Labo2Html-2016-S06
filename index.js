var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var ifile = process.cwd() + '/index.html';

app.get('/', function(req, res){
  res.sendFile(ifile);
});

io.on('connection', function(socket){

  socket.on('login', function(msg) {
      var uspa = JSON.parse(msg);
      io.emit('chat message', uspa.user + ' ha llegado');
  });

  socket.on('welcome message', function(msg) {
      io.emit('chat message', msg + ' ha llegado');
  });

  socket.on('goodbye message', function(msg) {
      io.emit('chat message', msg + ' se ha pirado');
  });

//    socket.on('keypress message', function(msg) {
//        io.emit('chat message', msg );
//    });

  socket.on('chat message', function(msg){
    //for (var h in socket.handshake.headers)
    //    io.emit('chat message', h + ': ' + socket.handshake.headers[h]);
    var omsg = JSON.parse(msg);
    io.emit('chat message', omsg.user + ' dice: ' + omsg.text);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});