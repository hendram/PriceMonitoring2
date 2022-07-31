 
const https = require("https");
const http = require("http");
const express = require('express');
const app = express();
const happ = express();
const fs = require("fs");
const FetchToken1Token2 = require('./FetchToken1Token2');
const wss = require("ws");
const WebSocketServer = wss.Server;
const singleton = require('./Singleton');
const single = singleton.getInstance();

 
const fromuser = [];
let insidefor = "false";
let id = 0;
let lookup = [];

app.use('/', express.static('../pricemongui/build'));
happ.get('*', function(req, res) {
     res.redirect('https://localhost');
});



function runningnow(){
             let datenow = Date.now();

//Comparing length of polygon with countpolygon 
for(let k=0; k < fromuser.length; k++){
// Counting interval time need to run next code
       if(((fromuser[k].milisecondselapse * fromuser[k].ntimes)
+ fromuser[k].currentts) <= datenow){
     console.log('milisecondsel' +fromuser[k].milisecondselapse);
     console.log('ntimes' +fromuser[k].ntimes);
    console.log('currentts' + fromuser[k].currentts);
     console.log('datenow' + datenow);

   if(fromuser[k].chain === "Polygon"){
    FetchToken1Token2.countpolygon = FetchToken1Token2.countpolygon + 1;
}     
    else if(fromuser[k].chain === "Bsc"){
    FetchToken1Token2.countbsc = FetchToken1Token2.countbsc + 1;
}
}
}


           for(let u = 0; u < fromuser.length; u++){

          if(((fromuser[u].milisecondselapse * fromuser[u].ntimes)
+ fromuser[u].currentts) <= datenow){
                 fromuser[u].ntimes = fromuser[u].ntimes + 1;

              innow = new FetchToken1Token2(fromuser[u].chain,
fromuser[u].dex, fromuser[u].tokenname1, fromuser[u].tokenname2, 
fromuser[u].tokenaddress1, fromuser[u].tokenaddress2, fromuser[u].digit1, 
fromuser[u].digit2, fromuser[u].pricein, single);
   innow.runfuncswap();

     }
}      

}


function arggraph(arg, wssx, ws){
for(let v=0; v < arg.length; v=v+2){
let graphsend = {"price": arg[v], 
"time": arg[v+1]};

ws.send(JSON.stringify(graphsend));

};
}

function argwa(arg, wssx, ws) {
for(let z=0; z <  arg.length; z++){

let queuem = {"messagenya": arg[z]};

ws.send(JSON.stringify(queuem));

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
server.listen(443, '', function(req, res) {
              console.log("server started at port 8443");
}); 


const httpServer = http.createServer(happ);
httpServer.listen(80); 

let wssx = new WebSocketServer({ server: server });

wssx.on("connection", function connection(ws){
 
console.log("connect ws");

 ws.on("message", function incoming(message) {
      let newmessage = message.toString();
       let barumessage = JSON.parse(newmessage);


if(barumessage.deleteall){
    fromuser.length = 0;
}

if(barumessage.deleteone){
    console.log('masuk neh barumessage deleteone' + barumessage.deleteone);
    fromuser.splice(barumessage.deleteone, 1);
}

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
milisecondselapse: barumessage.datanya[t].milisecondselapse,
currentts: barumessage.datanya[t].currentts,
ntimes: barumessage.datanya[t].ntimes
}

      fromuser.push(JSON.parse(JSON.stringify(dataToken)));
console.log("print dari fromuser" + dataToken.milisecondselapse);

             }
}

if(barumessage.messagenya === "fromgui"){


setInterval(keepalivefunc, 5000);
setInterval(runningnow, 5000);

const graphaccept = (arg) => {
if(arg === FetchToken1Token2.graphpolygonquick){
   arggraph(arg, wssx, ws);
   console.log('panjang arg' + arg.length);
   arg.length = 0;
}
else if(arg === FetchToken1Token2.graphbscpancake){
 arggraph(arg, wssx, ws);
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

        ws.send(JSON.stringify(keep));
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
argwa(arg, wssx, ws);
arg.length = 0;
}
else if(arg === FetchToken1Token2.wabscpancake){
argwa(arg, wssx, ws);
arg.length = 0;
}
   
});
}

});

})

