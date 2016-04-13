var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var livereload = require('livereload');
var lessMiddleware = require('less-middleware');
var countries = require('country-list')();

var port = process.argv[2] || 3000;

    // Serve up content from public directory
app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/views'));
app.use(lessMiddleware(__dirname + '/public/styles'));

//STATIC FILES
app.use(express.static(__dirname + '/public'));

app.get('/' , function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});
app.get('/views/list.mst' , function(req, res){
    res.sendFile(path.join(__dirname+'/views/list.mst'));
});
app.get('/views/edit.mst' , function(req, res){
    res.sendFile(path.join(__dirname+'/views/edit.mst'));
});

// API
app.get('/api/getcountries' , function(req, res){
    res.send(countries.getNames());
});

app.use(function(req, res){
    res.sendStatus(404);
});

app.listen(port, function() {
    console.log('Express server listening on port %s.', port);
});


server = livereload.createServer();
server.watch([__dirname + "/public", __dirname + "/views"]);

//for testing 
exports.closeServer = function(){
  server.close();
};