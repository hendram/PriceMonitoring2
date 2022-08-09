const singleton = require('./Singleton');
const single = singleton.getInstance();
const wss = require("ws");
const WebSocketServer = wss.Server;
// Cannot using circular require, for example require websockcomp on fetchdata and vice versa
const wsc = require ('./WebSockcomp');

// Careful when using extends as every parent class will be instantiated once
class Fetchdata {
static selfstorage = [];
static keepindex = [];
countgraphsingle = NaN;

constructor(){
}


getInstance(servernow){
 return new WebSocketServer({server: servernow})
}


 onnya(objectb) {
     let thisbound = this;
objectb.on("connection", function(ws){
  // Cannot use this inside event listener, because this will point to event listener object
   let self = new wsc;
   Fetchdata.selfstorage.push(self);
   //Every new connection will trigger this deadoralive checking
       for(let y = 0; y < Fetchdata.selfstorage.length; y++){
      if(Fetchdata.selfstorage[y].deadoralive === "dead"){
            Fetchdata.selfstorage[y] = "";
             Fetchdata.keepindex.push(y);
       }
    }
   for(let k = 0; k < Fetchdata.keepindex.length; k++){
            Fetchdata.selfstorage.splice(Fetchdata.keepindex[k], 1);
}
  Fetchdata.keepindex.length = 0;     

  console.log(self.counter);   
   self.ping(ws);

ws.on("message", function(message){ 
                
        let waitret = self.processmess(message.toString(), ws);
       if(waitret){
// just using derefrence than delete to remove object refrence cause delete on works on object properties 
// without let, var or const
               self = "";
               }

 });


thisbound.graphaccept = (arg) => {
let graphsend = {"price": arg[0], 
"time": arg[1]};
ws.send(JSON.stringify(graphsend));
}

thisbound.countgraphsingle = single.listenerCount('sendgraph', 
thisbound.graphaccept);
if(thisbound.countgraphsingle < 1){
  
single.on('sendgraph', thisbound.graphaccept);
}

 })
}



}

module.exports = Fetchdata;

