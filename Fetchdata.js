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

ws.on('close', function() {
    self = "";
});

ws.on("message", function(message){ 
// Instance of wrap object should not be going inside instance of wrapped object, if not
// then instance of wrapped object cannot be detach                
        self.processmess(message.toString());

      if(self.accountmess === "yes"){
               self.checkaccountexist().then(() => {
             console.log('dalam accountmess');
            if(self.accountexist === "true"){
   }
      else if(self.accountexist === "false"){
    ws.send(JSON.stringify({account: "false"}));
   console.log('sudah kirim ws');
   }
});
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

