const go = require('./GraphObject');
const checkaccountdb = require('./CheckAccountdb');
const insertaccountdb = require('./InsertAccountdb');
const insertgoarrdb = require('./InsertGoarrdb');
const deleteaccountdb = require('./DeleteAccountdb');
const deleteagoarrdb = require('./DeleteGoarrdb');
const checkgoarrdb = require('./CheckGoarrdb');
const countgoarrdb = require('./CountGoarrdb');
const updateaccountdb = require('./UpdateAccountdb');
const removeallgoarr = require('./RemoveAllGoarr');
const checktimestampdb = require('./CheckTimestampdb');

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

async populategraph(){
try{
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

goinst.rungraphobj();
/*
this.goarr.push({chain: resultgoarr[u].chainname, dex: resultgoarr[u].dexname, pricein: resultgoarr[u].priceinnow, tokenname1: resultgoarr[u].tokenname1tok,
tokenaddress1: resultgoarr[u].tokenaddress1addr, digittoken1: resultgoarr[u].digittoken1num, tokenname2: resultgoarr[u].tokenname2tok, 
tokenaddress2: resultgoarr[u].tokenaddress2addr, digittoken2: resultgoarr[u].digittoken2num, milisecondselapse: resultgoarr[u].milisecondselapsetime,
currentts: resultgoarr[u].currenttstime, ntimes: resultgoarr[u].ntimestime, threemonthstamp: resultgoarr[u].stampthreemonth}); */
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
//     let threemonthnownew = threemonthnow + (argtot.extendorder * 90 * 24 * 3600 * 1000);
     let threemonthnownew = threemonthnow + (argtot.extendorder * 120 * 1000);

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
// let timeafterthreemonth = arg1.currenttimestadd + ( 90 * 24 * 3600 * 1000 );  
 let timeafterthreemonth = arg1.currenttimestadd + ( 120 * 1000 );  
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

// let timeafterthreemonth = arg1.currenttimest + ( 90 * 24 * 3600 * 1000 );  
 let timeafterthreemonth = arg1.currenttimest + ( 120 * 1000 );  

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
  console.log('isi dari resultaddr' + resultaddr);
  let arraystamp =  resultaddr.stampthreemonth;

        await removeallgoarr.removegoarraccount();

   for(let x = 0, y = 0; x < arraystamp.length, y < this.goarr.length; x++, y++){
      if((this.goarr[y] === undefined) || (arraystamp[x] === undefined)){
        break;
}
    console.log('inside resultcount' + this.goarr[y].tokenname1);
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

this.accountexist = "true";
this.justindel = "yes";
}
catch(error){
console.log(error);
}
}


async checkaccountexist(){
try { let resultaddr = await checkaccountdb.checkdbaccount(this.accountid).catch(console.dir);
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


async processmess(messagenya){
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
       this.goarr[w] = "";
     goarrdel = w;
 }
}
this.goarr.splice(goarrdel, 1);


if(this.accountexist === "true"){
      await this.recycletoback(bdo);
}

}  

 
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

if(this.accountexist === "true"){
   await this.refilltimestamp();
}

goinst.rungraphobj();


}
}
}

module.exports = WebSockcomp;
