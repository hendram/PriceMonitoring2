const FetchToken1Token2 = require('./FetchToken1Token2');
const singleton = require('./Singleton');
const single = singleton.getInstance();


class GraphObject {
innow = "";
 setrun = "";

   constructor(chain, dex, pricein, tokenname1, tokenaddress1, digittoken1, tokenname2, 
tokenaddress2, digittoken2, milisecondselapse, currentts, ntimes){
this.chain = chain; 
this.dex = dex;
this.pricein = pricein; 
this.tokenname1 = tokenname1;
this.tokenaddress1 = tokenaddress1; 
this.digit1 = digittoken1;
this.tokenname2 = tokenname2;
this.tokenaddress2 = tokenaddress2; 
this.digit2 = digittoken2;
this.milisecondselapse = milisecondselapse;
this.currentts = currentts;
this.ntimes = ntimes;
}

rungraphobj() {
  let itself = this;
// Bind will bind this function inside setInterval to object itself, not spawn into their own context
this.setrun = setInterval(itself.runningnow.bind(this), itself.milisecondselapse);

console.log(this.setrun);

}

runningnow(){

          this.innow = new FetchToken1Token2(this.chain,
this.dex, this.tokenname1, this.tokenname2, 
this.tokenaddress1, this.tokenaddress2, this.digit1, 
this.digit2, single);
   this.innow.runfuncswap();

}


}

module.exports = GraphObject;