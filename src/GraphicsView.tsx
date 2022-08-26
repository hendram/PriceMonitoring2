import React, {useState, useEffect, ReactElement} from 'react';
import TokeninPage from './TokeninPage';
import LineGPage from './LineGPage';
import  './GraphicsView.css'

type props = {
  wss: WebSocket;
  addg: string;
  initmember: string;
  returnback: Function;
}   

type Listdatain = {
id: number;
chain: string;
dex: string;
pricein: string;
tokenname1: string;
tokenaddress1: string;
digittoken1: string;
tokenname2: string;
tokenaddress2: string;
digittoken2: string;
milisecondselapse: number;
currentts: number;
ntimes: number;
threemonthstamp: string;
initmember: string;
}


// addg props to control when addgraph menu can respon to click again after add new graph, from yesno
// initmember props from formember to make dialog addgraph question not show up first when graph add it
 
const GraphicsView: React.FC<props> =({wss, addg, initmember, returnback,}: props):
ReactElement => {


const [datatok, setDatatok] = useState<Listdatain | null>(null);

const providedata = (arg: Listdatain | null) => {
   let newdatatok = datatok;
       newdatatok = arg;
    setDatatok(newdatatok);

console.log('inside setdatatok');
}

const [tokeninpageprop, setTokeninpageprop] = useState<any>({addprop: "no", 
vis: "tokeninpagesh", beforegraph: "yes",  
graphicsviewdiv: "divtokeninpagebottom"});

 
const [addprop, setAddprop] = useState<string>("no");
// pageview will make component wrapped show or hide


const tokeninpageneedhid = () => {

 let newtokeninpageprop = {addprop: "no", 
vis: "tokeninpagehid",  beforegraph: "no",  
graphicsviewdiv: "divtokeninpagebottom" };
       setTokeninpageprop(newtokeninpageprop);
        returnback(addg);
console.log('masuk tokeninpageneddhid');
}

useEffect(() => {
 if(initmember === "yes"){
    let newtokeninpageprop = {addprop: "no",
vis: "tokeninpagehid", beforegraph: "no", graphicsviewdiv: "divtokeninpagetop" };
    setTokeninpageprop(newtokeninpageprop);
}
}, [initmember]);

useEffect(() => {
if(addg === "yes") {
// beforegraph to add another lock to make sure only addg yes and graph already exist can execute code
    if(tokeninpageprop.beforegraph === "no"){
      let newtokeninpageprop = {addprop: "yes", 
vis: "tokeninpagesh",  beforegraph: "no", 
graphicsviewdiv: "divtokeninpagetop" };
       setTokeninpageprop(newtokeninpageprop);
 }
}}, [addg] );

console.log('isi addg' + addg);
console.log('isi tokeninpagediv' + tokeninpageprop.graphicsviewdiv);
console.log('isi addprop' + tokeninpageprop.addprop);
console.log('isi dari pageview' + tokeninpageprop.vis);

return(
<div className={tokeninpageprop.graphicsviewdiv} >
   <div className={tokeninpageprop.vis}>
  <TokeninPage senddatatoken={providedata} tokeninpagech={tokeninpageneedhid}
    addprop={tokeninpageprop.addprop}  />
</div>
<div className="linegpagegv">
  <LineGPage websock={wss} datalinegpage={datatok} />
</div>
</div>
)

}

export default GraphicsView;
