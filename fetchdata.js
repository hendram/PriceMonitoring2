 
const https = require("https");
const http = require("http");
const express = require('express');
const app = express();
const fs = require("fs");
const FetchToken1Token2 = require('./FetchToken1Token2');
const wss = require("ws");
const WebSocketServer = wss.Server;
const singleton = require('./Singleton');
const single = singleton.getInstance();

 
const fromuser = [];

app.use('/', express.static('../pricemongui/build'));

function runningnow(){

for(let k=0; k < fromuser.length; k++){
   if(fromuser[k].chain === "polygon"){
    FetchToken1Token2.countpolygon = FetchToken1Token2.countpolygon + 1;
}     
    else if(fromuser[k].chain === "bsc"){
    FetchToken1Token2.countbsc = FetchToken1Token2.countbsc + 1;
}
}


           for(let u = 0; u < fromuser.length; u++){
             let innow = new FetchToken1Token2(fromuser[u].chain,
fromuser[u].dex, fromuser[u].tokenname1, fromuser[u].tokenname2, 
fromuser[u].tokenaddress1, fromuser[u].tokenaddress2, fromuser[u].digit1, 
fromuser[u].digit2, fromuser[u].pricein, single); 
   innow.runfuncswap();
     
}      
}

function arggraph(arg, wssx, wss){
for(let v=0; v < arg.length; v=v+2){
let graphsend = {"price": arg[v], 
"time": arg[v+1]};

wssx.clients.forEach(function(client) {
      if (client.readyState === wss.OPEN) {
        client.send(JSON.stringify(graphsend));
}});
};
}

function argwa(arg, wssx, wss) {
for(let z=0; z <  arg.length; z++){

let queuem = {"messagenya": arg[z]};
wssx.clients.forEach(function(client) {
      if (client.readyState === wss.OPEN) {
        client.send(JSON.stringify(queuem));
}});
}
}

const keepalivefunc = () => {
console.log("keepalivefunc in");  
single.emit('keepaliveevent', '');
   
}

const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
};

var server = https.createServer(options, app);
server.listen(8443, '', function(req, res) {
              console.log("server started at port 8443");
}); 

let wssx = new WebSocketServer({ server: server });

wssx.on("connection", function connection(ws){

console.log("connect ws");

 ws.on("message", function incoming(message) {
      let newmessage = message.toString();
       let barumessage = JSON.parse(newmessage);

if(barumessage.datanya){
   for(let t = 0; t < barumessage.datanya.length; t++){
  let dataToken = {
chain: barumessage.datanya[t].chain, 
dex: barumessage.datanya[t].dex,
pricein: barumessage.datanya[t].pricein, 
tokenname1: barumessage.datanya[t].tokenname1,
tokenaddress1: barumessage.datanya[t].tokenaddress1, 
digit1: barumessage.datanya[t].digittoken1,
tokenname2: barumessage.datanya[t].tokenname2,
tokenaddress2: barumessage.datanya[t].tokenaddress2, 
digit2: barumessage.datanya[t].digittoken2,
}

      fromuser.push(JSON.parse(JSON.stringify(dataToken)));
             }
}

if(barumessage.messagenya === "fromgui"){


setInterval(keepalivefunc, 5000);
setInterval(runningnow, 30000);

const graphaccept = (arg) => {
if(arg === FetchToken1Token2.graphpolygonquick){
   arggraph(arg, wssx, wss);
   arg.length = 0;
}
else if(arg === FetchToken1Token2.graphbscpancake){
 arggraph(arg, wssx, wss);
   arg.length = 0;
}
}

let countgraphsingle = single.listenerCount('sendgraph', 
graphaccept);
if(countgraphsingle < 1){
  
single.on('sendgraph', graphaccept);
}



const keeps = () => {
let keep = {"message": "alivenow"};

wssx.clients.forEach(function(client) {
      if (client.readyState === wss.OPEN) {
        client.send(JSON.stringify(keep));
}});
console.log(JSON.stringify(keep));
};


let countkeepalive = single.listenerCount('keepaliveevent', keeps);
if(countkeepalive < 1){
  
single.on('keepaliveevent', keeps);
}


}

if(barumessage.messagenya === "fromext"){


single.on('sendwa', function(arg){
if(arg === FetchToken1Token2.wapolygonquick){
argwa(arg, wssx, wss);
arg.length = 0;
}
else if(arg === FetchToken1Token2.wabscpancake){
argwa(arg, wssx, wss);
arg.length = 0;
}
   
});
}

});

})

