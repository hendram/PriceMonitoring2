
const https = require("https");
const http = require("http");
const express = require('express');
const app = express();
const happ = express();
const fs = require("fs");
const fetchd = require('./Fetchdata');


app.use('/', express.static('../pricemongui/build'));
happ.get('*', function(req, res) {
     res.redirect('https://localhost');
});


const options = {
    key: fs.readFileSync("./server.key"),
    cert: fs.readFileSync("./server.cert"),
};

var server = https.createServer(options, app);
server.listen(443, '', function(req, res) {
              console.log("server started at port 8443");
}); 


const httpServer = http.createServer(happ);
httpServer.listen(80); 

let a = new fetchd();
let b = a.getInstance(server);
let c = a.onnya(b);
