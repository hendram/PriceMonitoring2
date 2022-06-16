const BSCPancake = require('./BSCPancake');
const PolygonQuick = require('./PolygonQuick');



class FetchToken1Token2 {


static allpolygonquick = [];
static wapolygonquick = [];
static waitallpolygonquick = [];
static graphpolygonquick = [];
static priceinpolygonquick = [];

static allbscpancake = [];
static wabscpancake = [];
static waitallbscpancake = [];
static graphbscpancake = [];
static priceinbscpancake = [];

static countpolygon = 0;
static countbsc = 0;

static single;

constructor(chain, dex, tokenname1, tokenname2, tokenadd1, tokenadd2, digit1, 
digit2, pricein, single){
    this.chain = chain;
    this.dex = dex;
    this.tokenname1 = tokenname1;
    this.tokenname2 = tokenname2;
    this.tokenadd1 = tokenadd1;
    this.tokenadd2 = tokenadd2;
    this.digit1 = digit1;
    this.digit2 = digit2;
    this.pricein = pricein;
    FetchToken1Token2.single = single;
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

static callsingleon(){

let listenercount = FetchToken1Token2.single.listenerCount('graphwasignal',
FetchToken1Token2.onlyonearg);
   if(listenercount < 1){
    FetchToken1Token2.single.on('graphwasignal', 
FetchToken1Token2.onlyonearg);
}
}

static onlyonearg = (arg) => {
           if(arg === "polygonquick"){
      FetchToken1Token2.countpolygon = 0;
   FetchToken1Token2.arg1arg2(arg, FetchToken1Token2.graphpolygonquick,
FetchToken1Token2.wapolygonquick, FetchToken1Token2.allpolygonquick,
FetchToken1Token2.priceinpolygonquick);      
}
     else if(arg === "bscpancake") {
      FetchToken1Token2.countbsc = 0;
    FetchToken1Token2.arg1arg2(arg, FetchToken1Token2.graphbscpancake, 
FetchToken1Token2.wabscpancake, FetchToken1Token2.allbscpancake,
FetchToken1Token2.priceinbscpancake);      
}
}


static arg1arg2(arg, graph, wa, all, pricein) {       
     console.log("ini length dari all" + all.length);
           for(let k=0; k < all.length; k++){
               if(all[k] !== undefined){
                FetchToken1Token2.forloopgraph(graph, all[k]); 
                FetchToken1Token2.forloopwa(wa, k, pricein, all);
}
}
if(graph.length !== 0){
console.log("ini length dari graph " + graph.length);
if(graph === FetchToken1Token2.graphpolygonquick){
FetchToken1Token2.single.emit('sendgraph', graph);
}
else if(graph === FetchToken1Token2.graphbscpancake){
FetchToken1Token2.single.emit('sendgraph', graph);
}
}

if(wa.length !== 0){
FetchToken1Token2.single.emit('sendwa', wa);
}

all.length = 0;
   }
          

static forloopgraph(graph, allk) {
           const minutes = new Date();
           graph.push(allk);
           graph.push(minutes.getMinutes());
            }


static forloopwa(wa, index, pricein, all) {
         
        let splitresult = all[index].split(' ');
          if(parseFloat(splitresult[0]) > parseFloat(pricein[index])){
             wa.push(all[index]);
}
}

fetchtok1tok2 = async (chain, dex, tokenname1, tokenname2,tokenadd1, tokenadd2, 
digit1, digit2) => {

let token1token2 = undefined;
console.log("chain" + chain);
console.log("dex" + dex);

if(chain === "polygon" && dex === "quickswap"){
   token1token2 = new PolygonQuick(tokenadd1, tokenadd2, digit1, digit2);
}
if(chain === "bsc" && dex === "pancakeswap"){
   token1token2 = new BSCPancake(tokenadd1, tokenadd2, digit1, digit2);
}

   const taketoken1token2 =  await token1token2.fetchToken1Token2();
   const resulttoken1token2 = taketoken1token2.replace("Token1", tokenname1); 
   const result2token1token2 =  resulttoken1token2.replace("Token2", 
tokenname2);

if(chain === "polygon" && dex === "quickswap"){
FetchToken1Token2.priceinpolygonquick.push(this.pricein);
FetchToken1Token2.allpolygonquick.push(result2token1token2)
}
else if(chain === "bsc" && dex === "pancakeswap"){
FetchToken1Token2.priceinbscpancake.push(this.pricein);
FetchToken1Token2.allbscpancake.push(result2token1token2)
}
   console.log(result2token1token2);
   console.log(FetchToken1Token2.countpolygon);
if(chain === "polygon" && dex === "quickswap"){
if(FetchToken1Token2.countpolygon == FetchToken1Token2.allpolygonquick.length){
 FetchToken1Token2.callsingleon();
FetchToken1Token2.single.emit('graphwasignal', 'polygonquick');
}
}

else if(chain === "bsc" && dex === "pancakeswap"){
if(FetchToken1Token2.countbsc == FetchToken1Token2.allbscpancake.length){
 FetchToken1Token2.callsingleon();

FetchToken1Token2.single.emit('graphwasignal', 'bscpancake');
}
}
}
 

}

module.exports = FetchToken1Token2;
