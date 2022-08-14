const go = require('./GraphObject');
const checkaccountdb = require('./CheckAccountdb');
const insertaccountdb = require('./InsertAccountdb');

class WebSockcomp {
 newmessage = "";
 barumessage = "";

// static cannot be called from instance ot it's class
static counterwsc = 0;
longertime = "";
timeoutId = "";
pongcount = "";
deadoralive = "alive";
goarr = [];
goarrdel = NaN;
accountmess = "no";
accountexist = "";
accountid = "";

constructor(){
  this.counter = ++WebSockcomp.counterwsc ;
};


closeall(){
for(let x = 0; x < this.goarr.length; x++){
   this.goarr[x] = "";
}
// Even if this detected here and can be access, but Object.getPrototypeOf still return empty
    console.log(this.counter);
// Timeout object return from setInterval has been assign to each wsc objects because wsc only created when new connection happen, through refresh, reconnect
// browser
    console.log('setrun' + this.setrun);
    clearInterval(this.setrun);
    if(this.deadoralive === "alive"){
      this.deadoralive = "dead";
}
console.log(this.deadoralive);
}

ping(ws) {
      let pingthis = this;
   if(this.deadoralive === "dead"){
     clearTimeout(this.timeoutId);
     clearTimeout(pingthis.longertime);
    }
else{

      if(this.timeoutId){
        clearTimeout(this.timeoutId);
        }
      ws.ping('waitreplay', function(){
});

this.pongcount = ws.listenerCount('pong');
if(this.pongcount < 1){

   ws.on('pong', (pongfunc) => {
   console.log('longertime' + pingthis.longertime);
             if(pingthis.longertime){
             clearTimeout(pingthis.longertime);
                }
             pingthis.longertime = setTimeout(function(){ pingthis.closeall() }, 30000);
}); 
}

  this.timoutId = setTimeout(() => {
        pingthis.ping(ws);
      }, 10000);
}};

async checkaccountexist(){
  let resultaddr = await checkaccountdb.checkdbaccount(this.accountid);
console.log('nilain dari resultaddr' + resultaddr);
 if(resultaddr === "find") {
   this.accountexist="true";
}
   else if(resultaddr === "notfind"){
    this.accountexist="false";
     console.log('dalam accountexist false');
}

}

processmess(messagenya){
    this.newmessage = messagenya
       this.barumessage = JSON.parse(this.newmessage);


if(this.barumessage.accountaddr){
   this.accountmess = "yes";
 this.accountid = this.barumessage.accountaddr;
}
 
if(this.barumessage.deleteone){
    console.log('masuk neh barumessage deleteone' + this.barumessage.deleteone);
     for(let w = 0; w < this.goarr.length; w++){
        if((this.goarr[w].chain === this.barumessage.deleteone.chain) &&
     (this.goarr[w].dex = this.barumessage.deleteone.dex) &&
     (this.goarr[w].tokenname2 = this.barumessage.deleteone.tokenname) &&
    (this.goarr[w].tokenname1 = this.barumessage.deleteone.tokenanchor) &&
    (this.goarr[w].pricein = this.barumessage.deleteone.pricein)){
       this.goarr[w] = "";
     this.goarrdel = w;
 }
}
this.goarr.splice(this.goarrdel, 1);

}  
 
if(this.barumessage.datanya){

  let goinst =  new go(
this.barumessage.datanya.chain, 
this.barumessage.datanya.dex,
this.barumessage.datanya.pricein, 
this.barumessage.datanya.tokenname1,
this.barumessage.datanya.tokenaddress1, 
this.barumessage.datanya.digittoken1,
this.barumessage.datanya.tokenname2,
this.barumessage.datanya.tokenaddress2, 
this.barumessage.datanya.digittoken2,
this.barumessage.datanya.milisecondselapse,
this.barumessage.datanya.currentts,
this.barumessage.datanya.ntimes
);

this.goarr.push(goinst);

goinst.rungraphobj();


}
}
}

module.exports = WebSockcomp;
