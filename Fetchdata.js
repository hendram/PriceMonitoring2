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
   //Every new connection will trigger this deadoralive checking for dead ping 
   // giving more time to derefrence self disconnected cause of no answer to ping so ping func can run
       for(let y = 0; y < Fetchdata.selfstorage.length; y++){
           console.log('isi dari Fetchdata.selfstorage' + Fetchdata.selfstorage.length);
      if(Fetchdata.selfstorage[y].deadoralive === "dead"){
            console.log('inside Fetchdata deadoralive is dead');
            Fetchdata.selfstorage[y] = null;
             Fetchdata.keepindex.push(y);
       }
    }
   for(let k = 0; k < Fetchdata.keepindex.length; k++){
            Fetchdata.selfstorage.splice(Fetchdata.keepindex[k], 1);
}
  Fetchdata.keepindex.length = 0;     


   self.ping(ws);

ws.on("close", function() {
  console.log('inside ws onclose');
   self.stopinterval();   
   self.deadoralive = "dead"
   self = null;
   ws.close();
});


ws.on("message", function(message){ 
// Instance of wrap object should not be going inside instance of wrapped object, if not
// then instance of wrapped object cannot be detach                
        self.processmess(message.toString(), ws).then(() => {

      if(self.accountmess === "yes"){
               self.checkaccountexist().then(() => {
             console.log('dalam accountmess');
            if(self.accountexist === "true" && self.justindel === "no"){
         self.populategraph(ws).then(() => {
             let goarrforsend = [];

              for(let h = 0; h < self.goarr.length; h++){
                  goarrforsend.push({chain: self.goarr[h].chain, dex: self.goarr[h].dex,
    tokenname: self.goarr[h].tokenname2, tokenanchor: self.goarr[h].tokenname1,
 pricein: self.goarr[h].pricein, threemonthstamp: self.goarr[h].threemonthstamp})
}
    ws.send(JSON.stringify({account: "true", accountid: self.accountid, balanceval: self.balanceval}));
   if(goarrforsend.length !== 0){       
   ws.send(JSON.stringify({goarrlist: goarrforsend}));
}
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

thisbound.removefunc = (arg1, arg2, arg3, arg4, arg5) => {
   let messagenya = {threemonthstampexpone: {chain: arg1, dex: arg2, tokenname2: arg3, tokenname1: arg4,
     pricein: arg5}}; 
    self.processmess(JSON.stringify(messagenya), ws).then(() => {
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


thisbound.removego = (arg1, arg2, arg3, arg4, arg5) => {
   let messagenya = {removegom: {chain: arg1, dex: arg2, tokenname2: arg3, tokenname1: arg4,
     pricein: arg5}}; 
    self.processmess(JSON.stringify(messagenya), ws).then(() => {
      ws.send(JSON.stringify(messagenya));
                         
});       
}

thisbound.countremovego = single.listenerCount('removethisgo', 
thisbound.removego);
if(thisbound.countremovego < 1){
  
single.on('removethisgo', thisbound.removego);
}

 }); //ws.onmessage closing 

 })
}



}

module.exports = Fetchdata;

