 
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

 
const fromuser = [{chain: "polygon", dex: "quickswap", pricein: 10000,
tokenname1: "USDC", tokenaddress1: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
digit1: 6, tokenname2: "WETH", 
tokenaddress2: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', digit2:18},
{chain: "polygon", dex: "quickswap", pricein: 10000,
tokenname1: "USDC", tokenaddress1: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
digit1: 6, tokenname2: "WMATIC", 
tokenaddress2: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', digit2:18},
{chain: "polygon", dex: "quickswap", pricein: 10000, 
tokenname1: "USDC", tokenaddress1: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
digit1:6, tokenname2: "UNI", 
tokenaddress2: '0xb33EaAd8d922B1083446DC23f610c2567fB5180f', digit2: 18},
{chain: "polygon", dex: "quickswap", pricein: 10000, 
tokenname1: "USDC", tokenaddress1: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
digit1:6, tokenname2: "PEAR", 
tokenaddress2:  '0xc8bcb58caEf1bE972C0B638B1dD8B0748Fdc8A44', digit2: 18},
{chain: "bsc", dex: "pancakeswap", pricein: 100, 
tokenname1: "BUSD", tokenaddress1: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
digit1: 18, tokenname2: "WBNB", 
tokenaddress2: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', digit2: 18}]




//Masukkan harga awal beli di sini
/*const pricein = {"WETH": "1697.02", "WMATIC": "0.56484", "UNI": "0.016179", 
"PEAR": "0.000902"}

const priceinjson = JSON.parse(JSON.stringify(pricein));
*/

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

if(barumessage.status === "disconnectgui"){
     single.removeListener('sendgraphpolygonquick');
}


if(barumessage.messagenya === "fromgui"){

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
console.log("jumlah awal " + countgraphsingle);
if(countgraphsingle < 1){
  
single.on('sendgraph', graphaccept);
}
}

if(barumessage.messagenya === "fromext"){

setInterval(keepalivefunc, 5000);
setInterval(runningnow, 30000);

single.on("keepaliveevent", function(){
let keep = {"message": "alivenow"};

wssx.clients.forEach(function(client) {
      if (client.readyState === wss.OPEN) {
        client.send(JSON.stringify(keep));
}});
console.log(JSON.stringify(keep));
});


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

