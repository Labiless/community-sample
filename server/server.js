
const WebSocketServer = require('./WebSocketServer');
const DistServer = require('./DistServer');

const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
//set root
app.use('/', express.static(process.cwd()));
//http server setup
var http = require("http");
var server = http.createServer(app);

WebSocketServer.start(server);
DistServer.start(app);

//start
server.listen(port, function() {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});