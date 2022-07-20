import React, {useState, useEffect, ReactElement} from 'react';
import TokeninPage from './TokeninPage';
import LineGPage from './LineGPage';
import  './GraphicsView.css'

type props = {
  addg: string;
  returnback: Function;
}   

const GraphicsView: React.FC<props> =({addg, returnback,}: props):
ReactElement => {


const [dataarr, setDataarr] = useState<[]>([]);

const providedata = (arg: []) => {
    let arrreplace = [...dataarr];
    arrreplace = arg;
    setDataarr(arg);
}

const [tokeninpageprop, setTokeninpageprop] = useState<any>({addprop: "no", 
vis: "tokeninpagesh", beforegraph: "yes",  
graphicsviewdiv: "divtokeninpagebottom"});

 
const [addprop, setAddprop] = useState<string>("no");
// pageview will make component wrapped show or hide

console.log("dataarr" + dataarr.length);


const emptydataarr = () => {
  if(dataarr.length !== 0){
     let dataarrnew: [] = [...dataarr];
     dataarrnew.length = 0;
     setDataarr(dataarrnew);
   
     
}
}

const checkdataarr = () => {

if(dataarr.length !== 0){
 let newtokeninpageprop = {addprop: "no", 
vis: "tokeninpagehid",  beforegraph: "no",  
graphicsviewdiv: "divtokeninpagebottom" };
       setTokeninpageprop(newtokeninpageprop);
        returnback(addg);
}
}

    console.log("arg " + dataarr.length);


useEffect(() => {
   checkdataarr();
}, [JSON.stringify(dataarr)]);

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
  <TokeninPage provdatprop={providedata}
    addprop={tokeninpageprop.addprop}  />
</div>
<div className="linegpagegv">
  <LineGPage datalinegpage={dataarr}
emptydata={emptydataarr} />
</div>
</div>
)

}

export default GraphicsView;
