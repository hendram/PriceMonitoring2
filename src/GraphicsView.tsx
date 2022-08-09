import React, {useState, useEffect, ReactElement} from 'react';
import TokeninPage from './TokeninPage';
import LineGPage from './LineGPage';
import  './GraphicsView.css'

type props = {
  addg: string;
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
}

// addg props to control when addgraph menu can respon to click again after add new graph
const GraphicsView: React.FC<props> =({addg, returnback,}: props):
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
if(addg === "yes") {
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
  <LineGPage datalinegpage={datatok} />
</div>
</div>
)

}

export default GraphicsView;
