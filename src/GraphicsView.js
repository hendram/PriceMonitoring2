import React, {useState, useEffect} from 'react';
import TokeninPage from './TokeninPage';
import LineGPage from './LineGPage';
import  './GraphicsView.css'

const GraphicsView = (props) => {

    

const [dataarr, setDataarr] = useState([]);

const providedata = (arg) => {
    let arrreplace = [...dataarr];
    arrreplace = arg;
    setDataarr(arg);
}

const [tokeninpageprop, setTokeninpageprop] = useState({addprop: "no", 
vis: "tokeninpagesh", /* beforegraph: "yes",*/  
graphicsviewdiv: "divtokeninpagebottom"});

 
const [addprop, setAddprop] = useState("no");
// pageview will make component wrapped show or hide

console.log("dataarr" + dataarr.length);


const emptydataarr = () => {
  if(dataarr.length !== 0){
     let dataarrnew = [...dataarr];
     dataarrnew.length = 0;
     setDataarr(dataarrnew);
   
     
}
}

const checkdataarr = () => {

if(dataarr.length !== 0){
 let newtokeninpageprop = {addprop: "no", 
vis: "tokeninpagehid", /* beforegraph: "no", */ 
graphicsviewdiv: "divtokeninpagebottom" };
       setTokeninpageprop(newtokeninpageprop);
        props.returnback(props.addg);
}
}

    console.log("arg " + dataarr.length);


useEffect(() => {
   checkdataarr();
}, [dataarr[0]]);

useEffect(() => {
if(props.addg === "yes") {
 //   if(tokeninpageprop.beforegraph === "no"){
      let newtokeninpageprop = {addprop: "yes", 
vis: "tokeninpagesh", /* beforegraph: "no",*/ 
graphicsviewdiv: "divtokeninpagetop" };
       setTokeninpageprop(newtokeninpageprop);
// }
}}, [props.addg] );

console.log('isi props.addg' + props.addg);
console.log('isi tokeninpagediv' + tokeninpageprop.graphicsviewdiv);
console.log('isi addprop' + tokeninpageprop.addprop);
console.log('isi dari pageview' + tokeninpageprop.vis);

return(
<div className={tokeninpageprop.graphicsviewdiv} >
   <div className={tokeninpageprop.vis}>
  <TokeninPage provdatprop={providedata}
    addprop={tokeninpageprop.addprop}  />
</div>
<div>
  <LineGPage datalinegpage={dataarr}
emptydata={emptydataarr} />
</div>
</div>
)

}

export default GraphicsView;
