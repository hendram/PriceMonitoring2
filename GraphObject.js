const FetchToken1Token2 = require('./FetchToken1Token2');
const singleton = require('./Singleton');
const single = singleton.getInstance();


class GraphObject {
innow = "";
 setrun = "";
ws = "";

   constructor(chain, dex, pricein, tokenname1, tokenaddress1, digittoken1, tokenname2, 
tokenaddress2, digittoken2, milisecondselapse, currentts, ntimes, threemonthstamp){
this.chain = chain; 
this.dex = dex;
this.pricein = pricein; 
this.tokenname1 = tokenname1;
this.tokenaddress1 = tokenaddress1; 
this.digittoken1 = digittoken1;
this.tokenname2 = tokenname2;
this.tokenaddress2 = tokenaddress2; 
this.digittoken2 = digittoken2;
this.milisecondselapse = milisecondselapse;
this.currentts = currentts;
this.ntimes = ntimes;
this.threemonthstamp = threemonthstamp;
}

rungraphobj(ws) {
  let itself = this;
  itself.ws = ws;
// Bind will bind this function inside setInterval to object itself, not spawn into their own context
this.setrun = setInterval(itself.runningnow.bind(this), itself.milisecondselapse);

console.log(this.setrun);

}

stopnow(){
  if(this.setrun !== ""){
  clearInterval(this.setrun);
}
}

threemonthstampchk(tms){
 if(tms !== ""){
   let timenow = new Date().getTime();
  if(tms <= timenow){
   console.log('inside threemonthstamp outdated');
    single.emit('removethists', this.chain, this.dex, this.tokenname2, this.tokenname1,
    this.pricein);
  } 
}

}

async runningnow(){
try{
     this.threemonthstampchk(this.threemonthstamp);

          this.innow = new FetchToken1Token2(this.chain,
this.dex, this.tokenname1, this.tokenname2, 
this.tokenaddress1, this.tokenaddress2, this.digittoken1, 
this.digittoken2, single);
    let runerr = await this.innow.runfuncswap(this.ws);
  console.log('runerr' + runerr);   
     if(runerr !== undefined){
      this.stopnow();
         single.emit('removethisgo', this.chain, this.dex, this.tokenname2, this.tokenname1,
    this.pricein);
    }

}
catch(error){
console.log(error);
}
}


}

module.exports = GraphObject;
