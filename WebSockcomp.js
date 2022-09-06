const go = require('./GraphObject');
const checkaccountdb = require('./CheckAccountdb');
const insertaccountdb = require('./InsertAccountdb');
const insertgoarrdb = require('./InsertGoarrdb');
const deleteaccountdb = require('./DeleteAccountdb');
const deleteagoarrdb = require('./DeleteGoarrdb');
const checkgoarrdb = require('./CheckGoarrdb');
const countgoarrdb = require('./CountGoarrdb');
const updateaccountdb = require('./UpdateAccountdb');
const updategoarrdb = require('./UpdateGoarrdb');
const removeallgoarr = require('./RemoveAllGoarr');
const checktimestampdb = require('./CheckTimestampdb');
const singleton = require('./Singleton');
const single = singleton.getInstance();


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
accountmess = "no";
accountexist = "";
accountid = "";
balanceval = "";
resultcounting = NaN;
goarrstamp = 0;
justindel = "no";
deletedgoarr = [];
// closing = "";

constructor(){
  this.counter = ++WebSockcomp.counterwsc ;
};

stopinterval(){
 console.log('inside stopinterval');
  for(let c = 0; c < this.goarr.length; c++){
    this.goarr[c].stopnow();
}
for(let x = 0; x < this.goarr.length; x++){
   this.goarr[x] = null;
}
    if(this.deadoralive === "alive"){
      this.deadoralive = "dead";
   
}
// Even if this detected here and can be access, but Object.getPrototypeOf still 
// return empty for setTimeout

// Timeout object return from setInterval has been assign to each wsc objects because wsc 
// only created when new connection happen, through refresh, reconnect
// browser

}

ping(ws) {
      let pingthis = this;
   if(this.deadoralive === "dead"){
     clearTimeout(pingthis.longertime);
      clearTimeout(this.timeoutId);
     return "true";
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
             pingthis.longertime = setTimeout(function(){ pingthis.stopinterval() }, 30000);
}); 
}

  this.timoutId = setTimeout(() => {
        pingthis.ping(ws);
      }, 10000);
}};

async removetimestamp(argrem){
try {
 let indexforts = NaN;
 let resgoarr = await checkgoarrdb.checkgoarraccount(this.accountid);
    console.log('isi dari resgoarr removetimestamp' + resgoarr.length);
     if(resgoarr){
// resgoarr just to get on which index in goarr db this expired timestamp reside
console.log('inside removetimestamp');
       for(let v = 0; v < resgoarr.length; v++){
         if(resgoarr[v].chainname === argrem.chain && resgoarr[v].dexname === argrem.dex &&
  resgoarr[v].tokenname2tok === argrem.tokenname2 && resgoarr[v].tokenname1tok === argrem.tokenname1 &&
  resgoarr[v].priceinnow === argrem.pricein){
         await updategoarrdb.updatedbgoarr(resgoarr[v].chainname, resgoarr[v].dexname,
  resgoarr[v].tokenname1tok, resgoarr[v].tokenname2tok, resgoarr[v].priceinnow); 
         indexforts = v;
    }   
}
}
this.goarr[indexforts].threemonthstamp = "";
let safetygoarr = this.goarr[indexforts];
// do recycletoback 
this.goarr.push(safetygoarr);
this.goarr[indexforts].stopnow();
this.goarr.splice(indexforts, 1);
// deletegoarr array will be send to client to mark which timestamp on 
// allpricetime.current array need to be remove 
this.deletedgoarr.push(indexforts);

 let resultaddress = await checktimestampdb.checkdbtimestamp(this.accountid); 

  let arraystamp =  resultaddress.stampthreemonth;
           arraystamp.splice(indexforts, 1);
    if(arraystamp.length !== 0){
  const resultinsert = await updateaccountdb.updatedbaccount(this.accountid, arraystamp);
}
    else{
              await deleteaccountdb.deletedbaccount(this.accountid);
}
}
catch(error){
  console.log(error);
}

}

async populategraph(ws){
try{
   for(let b = 0; b < this.goarr.length; b++){
        this.goarr[b].stopnow();
        this.goarr[b] = null;
}

  this.goarr.length = 0;
 let resultgoarr = await checkgoarrdb.checkgoarraccount(this.accountid);
   if(resultgoarr){
      for(let u = 0; u < resultgoarr.length; u++){
  let goinst = new go(
resultgoarr[u].chainname, 
resultgoarr[u].dexname,
resultgoarr[u].priceinnow, 
resultgoarr[u].tokenname1tok,
resultgoarr[u].tokenaddress1addr, 
resultgoarr[u].digittoken1num,
resultgoarr[u].tokenname2tok,
resultgoarr[u].tokenaddress2addr, 
resultgoarr[u].digittoken2num,
resultgoarr[u].milisecondselapsetime,
resultgoarr[u].currenttstime,
resultgoarr[u].ntimestime,
resultgoarr[u].stampthreemonth
);

this.goarr.push(goinst);

goinst.rungraphobj(ws);
           }     
}
}
catch(error){
console.log(error);
}
}

async calculatetot(argtot){
try{
// must checktimestampdb, cause checkaccountdb not design with stampthreemonth
 let resultaddr = await checktimestampdb.checkdbtimestamp(this.accountid); 
  console.log('isi dari resultaddr' + resultaddr);
  console.log('isi dari argtot' + JSON.stringify(argtot));

  let arraystamp =  resultaddr.stampthreemonth;
     let threemonthnow =  arraystamp[argtot.idgraph];         
     let threemonthnownew = threemonthnow + (argtot.extendorder * 90 * 24 * 3600 * 1000);
 //    let threemonthnownew = threemonthnow + (argtot.extendorder * 300 * 1000);

    arraystamp.splice(argtot.idgraph, 1);
         arraystamp.push(threemonthnownew);

          await updateaccountdb.updatedbaccount(this.accountid, arraystamp);
          await this.refilltimestamp();                                                    
}
catch(error){
console.log(error);
}
}

async txnumberbeginadd(arg1){
try { 
let resultaddr = await checktimestampdb.checkdbtimestamp(this.accountid);
  console.log('isi dari resultaddr' + resultaddr);
 let arraystamp;
if(resultaddr !== "notfind"){ 
   arraystamp =  resultaddr.stampthreemonth;
}
if(arraystamp.length !== 0){
 let timeafterthreemonth = new Date().getTime() + ( 90 * 24 * 3600 * 1000 );  
// let timeafterthreemonth = new Date().getTime() + ( 300 * 1000 );  
   let resultcounting = arg1.orderedvaladd;
   console.log('hasil result counting' + resultcounting);
    console.log('hasil dari timeafterthreemonth' + timeafterthreemonth);
  for( let c = 0; c <  resultcounting; c++){
   arraystamp.push(timeafterthreemonth);
}

  const resultins = await updateaccountdb.updatedbaccount(this.accountid, arraystamp);
   if(resultins === "successupdate"){
    await this.refilltimestamp();
}
}
}
catch(error){
  console.log(error);
}
}

async txnumberbegin(arg1){
try{ 

 let timeafterthreemonth = new Date().getTime() + ( 90 * 24 * 3600 * 1000 );  
// let timeafterthreemonth = new Date().getTime() + ( 300 * 1000 );  

   let resultcounting = arg1.orderedval;
   console.log('hasil result counting' + resultcounting);
    console.log('hasil dari timeafterthreemonth' + timeafterthreemonth);
    let forstampthreem = [];
  for( let v = 0; v <  resultcounting; v++){
   forstampthreem.push(timeafterthreemonth);
}
 
  const resultins = await insertaccountdb.insertdbaccount(this.accountid, forstampthreem)
   if(resultins === "1inserted"){
   console.log('isi dari resultcounting' + resultcounting);
   this.accountexist = "true";
    await this.refilltimestamp();
}
}
catch(error){
  console.log(error);
}
}
 

async recycletoback(message){
try{
    let resultgoarr = await checkgoarrdb.checkgoarraccount(this.accountid);
    let indexdeleted = NaN;
     console.log('this is resultgoarr' + resultgoarr.length);
        for(let j = 0; j < resultgoarr.length; j++){
                if((resultgoarr[j].chainname === message.chain) &&
     (resultgoarr[j].dexname === message.dex) &&
     (resultgoarr[j].tokenname2tok === message.tokenname) &&
    (resultgoarr[j].tokenname1tok === message.tokenanchor) &&
    (resultgoarr[j].priceinnow === message.pricein) &&
    (resultgoarr[j].stampthreemonth === message.threemonthstamp)){
       indexdeleted = j;
    break;
}
}

if(!isNaN(indexdeleted)){
 let resultaddr = await checktimestampdb.checkdbtimestamp(this.accountid);
  let arraystamp =  resultaddr.stampthreemonth;
     
 console.log('inside if recycletoback');  
       // delete array element
      arraystamp.splice(indexdeleted, 1);
//add to the end of arraystamp and reinsert
   arraystamp.push(message.threemonthstamp);
     await  updateaccountdb.updatedbaccount(this.accountid, arraystamp);
   await this.refilltimestamp();
}
}
catch(error){
console.log(error);
}
}


async refilltimestamp(){
try{
 let resultaddr = await checktimestampdb.checkdbtimestamp(this.accountid);
  console.log('isi dari resultaddr inside refilltimestamp' + resultaddr);
  let arraystamp =  resultaddr.stampthreemonth;


// removing all goarr data from database and removing threemonthstamp properties from all go object first 
        await removeallgoarr.removegoarraccount();
       for(let s = 0; s < this.goarr.length; s++){
                this.goarr[s].threemonthstamp = "";
     }


// add goarr data into database again from goarr array here and updating go threemonthstamp properties
// if x or y has finish, then loop will stop which one first
        console.log('length of goarr' + this.goarr.length);

   for(let x = 0, y = 0; x < arraystamp.length, y < this.goarr.length; x++, y++){
      if((this.goarr[y] === undefined) || (arraystamp[x] === undefined)){
        break;
}
    console.log('inside refilltimestamp' + this.goarr[y].threemonthstamp);
  await insertgoarrdb.insertgoarraccount(this.accountid, this.goarr[y].chain, 
this.goarr[y].dex, 
this.goarr[y].pricein,
 this.goarr[y].tokenname1, 
this.goarr[y].tokenaddress1,
 this.goarr[y].digittoken1, 
this.goarr[y].tokenname2, 
  this.goarr[y].tokenaddress2,
 this.goarr[y].digittoken2, 
this.goarr[y].milisecondselapse,
 this.goarr[y].currentts, 
this.goarr[y].ntimes, 
arraystamp[x]);

this.goarr[y].threemonthstamp = arraystamp[x];
}

this.justindel = "yes";
}
catch(error){
console.log(error);
}
}


async checkaccountexist(){
try { 
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
catch(error){
console.log(error);
}
}

async checkbeforeinsertaccdb(){
  let resultaddr = await checkaccountdb.checkdbaccount(this.accountid).catch(console.dir);
    return resultaddr;
}


async processmess(messagenya, ws){
    this.newmessage = messagenya
       this.barumessage = JSON.parse(this.newmessage);
console.log('isi dari barumessage neh' + JSON.stringify(this.barumessage));

/* remember to using only string for first data as number only recognize after going inside function */

if(this.barumessage.accountaddr){
   this.accountmess = "yes";
   this.balanceval = this.barumessage.balanceval;
 this.accountid = this.barumessage.accountaddr;
}


if(this.barumessage.txnumberextend){
 await this.calculatetot(this.barumessage);
}

if(this.barumessage.txnumber){
     await this.txnumberbegin(this.barumessage);
}

if(this.barumessage.txnumberadd){
    await this.txnumberbeginadd(this.barumessage);
}

if(this.barumessage.threemonthstampexpone){
     await this.removetimestamp(this.barumessage.threemonthstampexpone);
}
 
if(this.barumessage.deleteone){
   let bdo = this.barumessage.deleteone;
 
    let goarrdel = NaN;
    console.log('masuk neh barumessage deleteone' + this.barumessage.deleteone);
     for(let w = 0; w < this.goarr.length; w++){
        if((this.goarr[w].chain === bdo.chain) &&
     (this.goarr[w].dex === bdo.dex) &&
     (this.goarr[w].tokenname2 === bdo.tokenname) &&
    (this.goarr[w].tokenname1 === bdo.tokenanchor) &&
    (this.goarr[w].pricein === bdo.pricein)){
     this.goarr[w].stopnow();
       this.goarr[w] = null;
     goarrdel = w;
} 
}

this.goarr.splice(goarrdel, 1);


if(this.accountexist === "true"){
      await this.recycletoback(bdo);
}

}
  
/*
if(this.barumessage.closedeh){
     this.closing = "yes";
}
*/ 
if(this.barumessage.datanya){
    let dsh = this.barumessage.datanya;

  let goinst =  new go(
dsh.chain, 
dsh.dex,
dsh.pricein, 
dsh.tokenname1,
dsh.tokenaddress1, 
dsh.digittoken1,
dsh.tokenname2,
dsh.tokenaddress2, 
dsh.digittoken2,
dsh.milisecondselapse,
dsh.currentts,
dsh.ntimes,
dsh.threemonthstamp
);

this.goarr.push(goinst);
console.log('inside barumessage datanya');

if(this.accountexist === "true"){
   await this.refilltimestamp();
}

goinst.rungraphobj(ws);


}
}
}

module.exports = WebSockcomp;
