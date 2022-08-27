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
        self.processmess(message.toString()).then(() => {

      if(self.accountmess === "yes"){
               self.checkaccountexist().then(() => {
             console.log('dalam accountmess');
            if(self.accountexist === "true" && self.justindel === "no"){
         self.populategraph().then(() => {
             let goarrforsend = [];

              for(let h = 0; h < self.goarr.length; h++){
                  goarrforsend.push({chain: self.goarr[h].chain, dex: self.goarr[h].dex,
    tokenname: self.goarr[h].tokenname2, tokenanchor: self.goarr[h].tokenname1,
 pricein: self.goarr[h].pricein, threemonthstamp: self.goarr[h].threemonthstamp})
}
    ws.send(JSON.stringify({account: "true", accountid: self.accountid, balanceval: self.balanceval}));
          ws.send(JSON.stringify({goarrlist: goarrforsend}));
    });
   }
          else if(self.accountexist === "true" && self.justindel === "yes"){
              let threemonthstamparr = [];
              console.log('inside accountexist true and justindel yes');
               for(let z = 0; z < self.goarr.length; z++){
                   if(self.goarr[z].threemonthstamp){
                         threemonthstamparr.push(self.goarr[z].threemonthstamp);
}           
}
          ws.send(JSON.stringify({threemonthstamplist: threemonthstamparr}));
}
      else if(self.accountexist === "false"){
    ws.send(JSON.stringify({account: "false", accountid: self.accountid, balanceval: self.balanceval}));
   console.log('sudah kirim ws');
   }
});
}
});  // self.processmess closing

thisbound.removefunc = (arg0, arg1, arg2, arg3, arg4, arg5) => {
   let messagenya = {deleteone: {delme: arg0, chain: arg1, dex: arg2, tokenname2: arg3, tokenname1: arg4,
     pricein: arg5}}; 
    self.processmess(JSON.stringify(messagenya)).then(() => {
                let threemonthstamparr = []; 
              for(let z = 0; z < self.goarr.length; z++){
                   if(self.goarr[z].threemonthstamp){
                         threemonthstamparr.push(self.goarr[z].threemonthstamp);
}           
}
      ws.send(JSON.stringify({threemonthstamplist: threemonthstamparr, deletedindex: self.deletedgoarr}));
});       
}


thisbound.countremovefunc = single.listenerCount('removethists', 
thisbound.removefunc);
if(thisbound.countremovefunc < 1){
  
single.on('removethists', thisbound.removefunc);
}

 }); //ws.onmessage closing 


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

