const BSCPancake = require('./BSCPancake');
const PolygonQuick = require('./PolygonQuick');

class FetchToken1Token2 {

resultfromnode = "";
graphdataformat = [];

constructor(chain, dex, tokenname1, tokenname2, tokenadd1, tokenadd2, digit1, 
digit2, single){
    this.chain = chain;
    this.dex = dex;
    this.tokenname1 = tokenname1;
    this.tokenname2 = tokenname2;
    this.tokenadd1 = tokenadd1;
    this.tokenadd2 = tokenadd2;
    this.digit1 = digit1;
    this.digit2 = digit2;
    this.single = single;
}

runfuncswap = () => {
try{
      this.fetchtok1tok2(this.chain, this.dex, this.tokenname1, 
this.tokenname2, this.tokenadd1,
this.tokenadd2, this.digit1, this.digit2);
}
catch(error){
console.error(error)
}};

graphfunc(resultfromnodein) {
           const timenow = new Date();
           this.graphdataformat.push(resultfromnodein);
            let hours = timenow.getHours();
            let minutes = timenow.getMinutes();
            let seconds = timenow.getSeconds();
            let combhm = hours + ":" + minutes + ":" + seconds;
            this.graphdataformat.push(combhm);
            this.single.emit('sendgraph', this.graphdataformat);
            }

fetchtok1tok2 = async (chain, dex, tokenname1, tokenname2,tokenadd1, tokenadd2, 
digit1, digit2) => {

try{
let token1token2 = undefined;
console.log("chain" + chain);
console.log("dex" + dex);


if(chain === "Polygon" && dex === "Quickswap"){
   token1token2 = new PolygonQuick(tokenadd1, tokenadd2, digit1, digit2);
}
if(chain === "Bsc" && dex === "Pancakeswap"){
   token1token2 = new BSCPancake(tokenadd1, tokenadd2, digit1, digit2);
}

   const taketoken1token2 =  await token1token2.fetchToken1Token2();

   const resulttoken1token2 = taketoken1token2.replace("Token1", tokenname1); 
   const result2token1token2 =  resulttoken1token2.replace("Token2", 
tokenname2);

      this.graphfunc(result2token1token2);

}
catch(error){
console.error(error);
}
} 



}

module.exports = FetchToken1Token2;
