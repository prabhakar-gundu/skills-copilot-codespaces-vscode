//Create web server
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

// Create server
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Create port
var port = process.env.PORT || 3000;

// Create array of comments
var comments = [];

// Create server
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle GET request
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Handle POST request
app.post('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Handle PUT request
app.put('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Handle DELETE request
app.delete('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// When user connects, send comments
io.on('connection', function (socket) {
  socket.emit('comments', comments);
  // When user adds a comment
  socket.on('addComment', function (comment) {
    // Add comment to array
    comments.push(comment);
    // Send comments to all users
    io.emit('comments', comments);
  });
  // When user deletes a comment
  socket.on('deleteComment', function (id) {
    // Remove comment from array
    comments.splice(id, 1);
    // Send comments to all users
    io.emit('comments', comments);
  });
});
