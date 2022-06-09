const https = require("https");
const http = require("http");
const express = require('express');
const app = express();
const fs = require("fs");
const wss = require("ws");
const WebSocketServer = wss.Server;
const singleton = require('./Singleton');
const single = singleton.getInstance();
const allpolygonquick = [];
const wapolygonquick = [];
const waitallpolyquick = [];
const graphpolygonquick = []

//Masukkan harga awal beli di sini
const pricein = {"WETH": "1697.02", "WMATIC": "0.56484", "UNI": "0.016179", 
"PEAR": "0.000902"}

const priceinjson = JSON.parse(JSON.stringify(pricein));


const { ChainId, Token, Fetcher, Route, TradeType, TokenAmount, Trade } = require('quickswap-sdk')


const USDC = new Token(ChainId.MATIC,
 '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', 6)
const WETH = new Token(ChainId.MATIC,
 '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', 18)



const PolyDoge = new Token(ChainId.MATIC,
 '0x8A953CfE442c5E8855cc6c61b1293FA648BAE472', 18)
const WMATIC = new Token(ChainId.MATIC,
 '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', 18)
const UNI = new Token(ChainId.MATIC,
 '0xb33EaAd8d922B1083446DC23f610c2567fB5180f', 18)
const PEAR = new Token(ChainId.MATIC,
 '0xc8bcb58caEf1bE972C0B638B1dD8B0748Fdc8A44', 18)
const ICE = new Token(ChainId.MATIC,
 '0x4e1581f01046eFDd7a1a2CDB0F82cdd7F71F2E59', 18)
const NALIS = new Token(ChainId.MATIC,
 '0x04f2E3ec0642e501220f32Fcd9E26E77924929A9', 18)


app.use('/', express.static('../pricemongui/build'));


const polygonquickswap = () => {
try{

  
      fetchusdcweth();
      fetchusdcwmatic();
      fetchusdcuni();
      fetchusdcpear();

}
catch(error){
console.error(error)
}};

    single.on('polyquick', function(arg) {
        console.log(waitallpolyquick.length);
     if(arg){
         console.log("masuk arg" + arg);
         waitallpolyquick.push(arg)
           }

         if(waitallpolyquick.length == 4) {
           for(let k=0; k < waitallpolyquick.length; k++){
               if(waitallpolyquick[k] == true){
                forloopgraph(); 
//                forloopwa();

if(waitallpolyquick.length !== 0){
    waitallpolyquick.length = 0;
}

if(graphpolygonquick.length !== 0){
single.emit('sendgraphpolygonquick', '');
}

if(wapolygonquick.length !== 0){
 single.emit('sendwapolygonquick', '');
}

allpolygonquick.length = 0;                 
                     break;
            }
          }
}
});

function forloopgraph() {
  for(let u=0; u < waitallpolyquick.length; u++){
       if(waitallpolyquick[u] == true){
           const minutes = new Date();
           graphpolygonquick.push(allpolygonquick[u]);
           graphpolygonquick.push(minutes.getMinutes());
            }
    }
}

function forloopwa() {
 
 for(let x=0; x < allpolygonquick.length; x++){
            let splitresult = allpolygonquick[x].split(' ');
            switch(splitresult[4]){
              case 'WETH':
   // Replace comparison algorithm here
                if(parseFloat(splitresult[0]) > parseFloat(priceinjson.WETH)){
                    wapolygonquick.push(allpolygonquick[x]); 
	}
		break;

             case 'WMATIC':  
   // Replace comparison algorithm here
	        if(parseFloat(splitresult[0]) > parseFloat(priceinjson.WMATIC)){
                    wapolygonquick.push(allpolygonquick[x]); 
		}
		break;
             case 'UNI':  
   // Replace comparison algorithm here
	        if(parseFloat(splitresult[0]) > parseFloat(priceinjson.UNI)){
                    wapolygonquick.push(allpolygonquick[x]); 
		}
		break;
             case 'PEAR':  
   // Replace comparison algorithm here
	        if(parseFloat(splitresult[0]) > parseFloat(priceinjson.PEAR)){
                    wapolygonquick.push(allpolygonquick[x]); 
		}
		break;

            
        	    default: console.log("error");

}
}
        
}

const fetchusdcweth = async () => {
try {
  const pairusdcweth = await Fetcher.fetchPairData(USDC, WETH)
  const routeWethForUsdc = new Route([pairusdcweth], WETH);
const tradeWethForUsdc = new Trade(routeWethForUsdc, 
 new TokenAmount(WETH, BigInt(1E18)), TradeType.EXACT_INPUT);
  const wethusdc = tradeWethForUsdc.executionPrice.toSignificant(6) +
 " USDC for 1 WETH"
allpolygonquick.push(wethusdc);
if(wethusdc != undefined){
console.log(wethusdc);
single.emit('polyquick', true);
}
else{
single.emit('polyquick', false);

}

}
catch(error){
console.error(error)

}};


/*
const fetchusdcpolydoge = async () => {
try {
  const pairusdcpolydoge = await Fetcher.fetchPairData(USDC, PolyDoge)
  return pairusdcpolydoge;
}
catch(error){
console.error(error)
}};

fetchusdcpolydoge().then(function(pairusdcpolydoge){
  const routePolyDogeForUsdc = new Route([pairusdcpolydoge], PolyDoge);
const tradePolyDogeForUsdc = new Trade(routePolyDogeForUsdc, 
 new TokenAmount(PolyDoge, BigInt(1E18)), TradeType.EXACT_INPUT);
  const polydogeusdc = tradePolyDogeForUsdc.executionPrice.toSignificant(6) +
 " USDC for 1 PolyDoge"
alltokenpolygon.push(polydogeusdc);
console.log(polydogeusdc);
});
*/

const fetchusdcwmatic = async () => {
try {
  const pairusdcwmatic = await Fetcher.fetchPairData(USDC, WMATIC)
  const routeWmaticForUsdc = new Route([pairusdcwmatic], WMATIC);
const tradeWmaticForUsdc = new Trade(routeWmaticForUsdc, 
 new TokenAmount(WMATIC, BigInt(1E18)), TradeType.EXACT_INPUT);
  const wmaticusdc = tradeWmaticForUsdc.executionPrice.toSignificant(6) +
 " USDC for 1 WMATIC"
allpolygonquick.push(wmaticusdc);

if(wmaticusdc != undefined){
console.log(wmaticusdc);
single.emit('polyquick', true);
}
else{
single.emit('polyquick', false);

}

}
catch(error){
console.error(error)
}};


const fetchusdcuni = async () => {
try {
  const pairusdcuni = await Fetcher.fetchPairData(USDC, UNI)
  const routeUniForUsdc = new Route([pairusdcuni], UNI);
const tradeUniForUsdc = new Trade(routeUniForUsdc, 
 new TokenAmount(UNI, BigInt(1E18)), TradeType.EXACT_INPUT);
  const uniusdc = tradeUniForUsdc.executionPrice.toSignificant(6) +
 " USDC for 1 UNI"
allpolygonquick.push(uniusdc);
if(uniusdc != undefined){
console.log(uniusdc);
single.emit('polyquick', true);
}
else{
single.emit('polyquick', false);
}

}
catch(error){
console.error(error)
}};

const fetchusdcpear = async () => {
try {
  const pairusdcpear = await Fetcher.fetchPairData(USDC, PEAR)
  const routePearForUsdc = new Route([pairusdcpear], PEAR);
const tradePearForUsdc = new Trade(routePearForUsdc, 
 new TokenAmount(PEAR, BigInt(1E18)), TradeType.EXACT_INPUT);
  const pearusdc = tradePearForUsdc.executionPrice.toSignificant(6) +
 " USDC for 1 PEAR"
allpolygonquick.push(pearusdc);
if(pearusdc != undefined){
console.log(pearusdc);
single.emit('polyquick', true);
}
else{
single.emit('polyquick', false);
}
}
catch(error){
console.error(error)
}};

/*
const fetchusdcice = async () => {
try {
  const pairusdcice = await Fetcher.fetchPairData(USDC, ICE)
  return pairusdcice;
}
catch(error){
console.error(error)
}};

fetchusdcice().then(function(pairusdcice){
  const routeIceForUsdc = new Route([pairusdcice], ICE);
const tradeIceForUsdc = new Trade(routeIceForUsdc, 
 new TokenAmount(ICE, BigInt(1E18)), TradeType.EXACT_INPUT);

  const iceusdc = tradeIceForUsdc.executionPrice.toSignificant(6) +
 " USDC for 1 ICE"
alltokenpolygon.push(iceusdc);
console.log(iceusdc);
});
*/

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
              console.log("server started at port 443");
}); 






let wssx = new WebSocketServer({
        server: server
});




wssx.on("connection", function connection(ws){

console.log("connect ws");



 ws.on("message", function incoming(message) {
      let newmessage = message.toString();
       let barumessage = JSON.parse(newmessage);

if(barumessage.status === "disconnectgui"){
     single.removeListener('sendgraphpolygonquick');
}


if(barumessage.messagenya === "fromgui"){

const grpolyquick = () => {

for(let v=0; v < graphpolygonquick.length; v=v+2){


let graphsend = {"price": graphpolygonquick[v], "time": graphpolygonquick[v+1]};

wssx.clients.forEach(function(client) {
      if (client.readyState === wss.OPEN) {
        client.send(JSON.stringify(graphsend));
}});
};
   
graphpolygonquick.length = 0;
}

let countgraphsingle = single.listenerCount('sendgraphpolygonquick', 
grpolyquick);
console.log("jumlah awal " + countgraphsingle);
if(countgraphsingle < 1){
  
single.on('sendgraphpolygonquick', grpolyquick);
}
}

if(barumessage.messagenya === "fromext"){

setInterval(keepalivefunc, 5000);
setInterval(polygonquickswap, 30000);

single.on("keepaliveevent", function(){
let keep = {"message": "alivenow"};

if(wapolygonquick.length === 0){
wssx.clients.forEach(function(client) {
      if (client.readyState === wss.OPEN) {
        client.send(JSON.stringify(keep));
}});
console.log(JSON.stringify(keep));
}
});



single.on('sendwapolygonquick', function(){

console.log("emitter event trig");

for(let z=0; z <  wapolygonquick.length; z++){


let queuem = {"messagenya": wapolygonquick[z]};

wssx.clients.forEach(function(client) {
      if (client.readyState === wss.OPEN) {
        client.send(JSON.stringify(queuem));
}});
}
   
wapolygonquick.length = 0;
});
}

});

})






