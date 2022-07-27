import React, {useEffect, useRef, forwardRef,  ReactElement, useState, 
RefObject} from "react"
import "./LineChart.css"

type Data = {
 x: string;
 y: string;
}

type widhe = {
width: number;
height: number;
widthlast: number;
heightlast: number;
}

type props = {
   data: Array<Data>;
   namatoken: string;
   tokenacuan: string;
   priceawal: string;
   widhesetlc: Function;
   id: number;
   widhenow: widhe;
   divwait: string;
   svghs: string;
   handlemouseenter: Function;
   handlemouseleave: Function;
   afterlength: Function;
}


const LineChart: React.FC<props> = ({data, namatoken,tokenacuan,
   priceawal, widhesetlc, id, widhenow, divwait, svghs, handlemouseenter,
   handlemouseleave, afterlength}: props): ReactElement => {


const resizeObserver = React.useRef<ResizeObserver>(new 
ResizeObserver((entries: ResizeObserverEntry[]) => {
 entries.forEach(entry => {

     widhesetlc(id, entry.contentRect.width, entry.contentRect.height);
     console.log('entry contentRect' + entry.contentRect.width);
  });
}));

const resizedRef = React.useCallback((container: HTMLDivElement) => {
    if (container !== null) {
        resizeObserver.current.observe(container);
      console.log('masuk container');
    }
    // When element is unmounted, ref callback is called with a null argument
    // => best time to cleanup the observer
    else {
        if (resizeObserver.current)
            resizeObserver.current.disconnect();
    }
}, [resizeObserver.current]);




console.log(data.length);

let c;
let ydata;
let tokenpairn;
let rectdata;
let textdata;
let legenddata;
let testcallpr = namatoken;
console.log(testcallpr);


function  getLabelMinX() {
    
    const dat: Array<Data> = data;
    return dat.reduce((min: number, p: any) => 
parseFloat(p.x) < min ? parseFloat(p.x) : min, parseFloat(dat[0].x));
  }
function  getLabelMaxX() {
    const dat: Array<Data> = data;
    return dat.reduce((max: number, p: any) => 
parseFloat(p.x) > max ? parseFloat(p.x) : max, parseFloat(dat[0].x));
  }

const mouseenter = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
     handlemouseenter(id);
}
const mouseleave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
     handlemouseleave(id);
}


   const graphx = []; 
  const graphy = [];
   const linenya = [];
  const keepfinal = [];
// maxpoint is length anchor for every line end
let maxpointx;
let maxpointy;
let widthdata;
let heightdata;
let canvaswidth;
let canvasheight;
let yaddtext;
let yaddrect;
let xtextrect;
let tokenpairnx;
// b is for calculating each point value in y axis label need two or six point
let b;
let initxpos;

if(!isNaN(widhenow.widthlast)){
  maxpointx = 50 + Math.floor((50/widhenow.width) * widhenow.widthlast);
  widthdata = 40 + Math.floor((40/widhenow.width) * widhenow.widthlast);
  canvaswidth = 500 + Math.floor((500/widhenow.width) * widhenow.widthlast);
  xtextrect = 150 + Math.floor((150/widhenow.width) * widhenow.widthlast);
  tokenpairnx = 200 + Math.floor((200/widhenow.width) * widhenow.widthlast);
  
}
else {
  maxpointx = 50;
  widthdata = 40;
  canvaswidth = 500;
  xtextrect = 150;
  tokenpairnx = 200;
}

if(!isNaN(widhenow.heightlast)){
  maxpointy = 50 + Math.floor((50/widhenow.height) * widhenow.heightlast);
  heightdata = 20 + Math.floor((20/widhenow.height) * widhenow.heightlast);
  canvasheight = 500 + Math.floor((500/widhenow.height) * widhenow.heightlast);
  yaddtext = 100 + Math.floor(((100/widhenow.height) * widhenow.heightlast)/2);
  yaddrect = 60 + Math.floor(((60/widhenow.height) * widhenow.heightlast)/2);
  
}
else {
  maxpointy = 50;
  heightdata = 20;
  canvasheight = 500;
  yaddtext = 100;
  yaddrect = 60
}


if(data.length > 1){

  afterlength(id);

 
  const w = (getLabelMaxX()-getLabelMinX());
  console.log(widhenow.width);
  console.log(widhenow.height);

if(w === 0){
 ydata = (2 * maxpointy) + maxpointy 
    let z = (getLabelMaxX() + ((0.2)*getLabelMaxX()));
   b = z/2; 
   initxpos = b.toString().length * 8;
}
else {
 ydata = (data.length * maxpointy) + maxpointy
 b = w/data.length; 
 initxpos = b.toString().length * 8;
 
}  

//for generating x data
   for(let p=initxpos, u=0; p < (data.length * maxpointx) + initxpos,
 u < data.length;  p=p+maxpointx, u++){
        
//this part to determine position and rotation of x axis label
       let k : string = data[u].y;
       let rotdata =  ydata + 20;
       let rot = "rotate(30," + p + "," + rotdata +")";
   // consist of x axis line, x axis strips and x axis label
    graphx.push(<g key={p}>  
              <line x1={p} y1={ydata}
 x2={p + maxpointx} y2={ydata} 
className="linechart_pathx1"/>
              <line x1={p + maxpointx} 
y1={ydata - 10} 
x2={p + maxpointx} y2={ydata + 10}
    className="linechart_pathx2" />
             <text x={p} 
y={ydata + 20} className="linechart_xlabel" 
transform={rot}>
{k} </text>
</g>);
rectdata = <g><rect x={initxpos} y={ydata + yaddrect} width={widthdata} 
height={heightdata} className="colorleg1"/>
<rect x={initxpos + xtextrect} y={ydata + yaddrect} width={widthdata} height={heightdata}
 className="colorleg2"/></g>
textdata = <g>
<text x={initxpos} y={ydata + yaddtext} fill="black" 
style={{font: '1em bold sans-serif'}} >
pricein</text>
<text x={initxpos + xtextrect} y={ydata + yaddtext} fill="black" 
style={{font: '1em bold sans-serif'}} >
profit price</text>
</g>  
 
}

//for generating y data
for(let a=(w === 0 ? ((2 * maxpointy) + maxpointy) :
 ((data.length * maxpointy) + maxpointy)) ; a > maxpointy ; a=a-maxpointy){

   if(w === 0){
     c = b + (b * (((2 * maxpointy) + maxpointy) - a)/maxpointy);
}
    else {
     c = getLabelMinX()+b*((((data.length * maxpointy) + 
maxpointy) - a)/maxpointy);
}

   

        graphy.push(<g key={a}>  
              <line x1={initxpos} 
y1={a} 
x2={initxpos} y2={a-maxpointy} 
className="linechart_pathy1"/>
             <line x1={initxpos-10} y1={a-maxpointy} x2={initxpos+10} 
y2={a-maxpointy} 
   className="linechart_pathy2"/>
             <text x={0} 
y={a} className="linechart_ylabel">
{c} </text>
             
            </g> );

tokenpairn = <g><text x={tokenpairnx} 
y={25} fill="black" 
style={{font: '1.5em bold Arial'}} >{tokenacuan}/{namatoken}
 </text></g> ;

}


// for generating line graphics

   for(let j=initxpos, v=0; j < (data.length * maxpointx) + initxpos, 
v < data.length; j=j+maxpointx, v++){

 //this part all to calculate keepfinal for y axis line drawing
      let w = (getLabelMaxX()-getLabelMinX());
// w is zero if maxprice and minprice same at this moment
  if(w === 0){
       w = (getLabelMaxX() + ((0.2)*getLabelMaxX()));
      let m = w/2;            // bottom value (this part still need thinking)
       let n = (parseFloat(data[v].x)) - m;
       let final = (n*maxpointy)/m;
         keepfinal.push(((2 * maxpointy) + maxpointy) - final);

}
else{ 
    let m = w/data.length;
       let n = (parseFloat(data[v].x) - getLabelMinX())/m;
        // final is to get price label scale map to line y scale
       let final = n*maxpointy;
         keepfinal.push(((data.length * maxpointy) + maxpointy)-final);
     }
      
    linenya.push(<g key={j}> 

    { 
parseFloat(priceawal) < parseFloat(data[v].x) ?
          <circle cx={j} cy={keepfinal[v]} r="6"   
className="linechart_profit"/> 
     :
 <circle cx={j} cy={keepfinal[v]} r="6"   
className="linechart_pricein"/>
}

     {
// Untuk menggambar graphic linenya 
 v === 0 ? 
      <line  x1={j}  
            y1={keepfinal[v]} 
            x2={j} 
y2={keepfinal[v]} 
className="linechart_graphics" />    
         :
      <line  x1={j-maxpointx} 
             y1={keepfinal[v-1]}
            x2={j} 
y2={keepfinal[v]} 
className="linechart_graphics" />    
       }
            </g> );
}

}


return(
<div  className="topdivlchart"  >
     <div className={divwait}> 
Waiting at least two points in graphics

</div>
<div className={svghs} 
onMouseEnter={(e) => mouseenter(e)}
 onMouseLeave={(e) => mouseleave(e)} ref={resizedRef}>
 <svg width={canvaswidth} height={canvasheight} 
xmlns="http://www/w3/org/2000/svg">
{tokenpairn}
{graphx}
{graphy}
{linenya}
{rectdata}
{textdata}
      </svg>
</div>
</div>
);
};

export default LineChart;
