import React, {useRef} from "react"
import "./LineChart.css"


const LineChart = (props) => {

console.log(props.data.length);
console.log(props.data[5]);
let c;
let ydata;
let tokenpairn;
let rectdata;
let textdata;
let legenddata;
let testcallpr = props.namatoken;
console.log(testcallpr);

if(props.data.length > 1){

function  getLabelMinX() {
    
    const data = props.data;
    return data.reduce((min, p) => parseFloat(p.x) < min ? parseFloat(p.x) :
 min, parseFloat(data[0].x));
  }
function  getLabelMaxX() {
    const data = props.data;
    return data.reduce((max, p) => parseFloat(p.x) > max ? parseFloat(p.x) : 
max, parseFloat(data[0].x));
  }
   const graphx = []; 
  const graphy = [];
   const linenya = [];
  const keepfinal = [];
 const maxpoint = 50;
  const w = (getLabelMaxX()-getLabelMinX());


if(w === 0){
 ydata = (2 * maxpoint) + 50 }
else {
 ydata = (props.data.length * maxpoint) + 50
}  

//for generating x data
   for(let p=100; p < (props.data.length * maxpoint) + 100; p=p+50){
       let o = ((p-50)/50) - 1; 
       let k = props.data[o].y;
       let rotdata =  ydata + 20;
       let rot = "rotate(30," + p + "," + rotdata +")";
   
    graphx.push(<g key={p}>  
              <line x1={p} y1={ydata}
 x2={p+50} y2={ydata} 
className="linechart_pathx1"/>
              <line x1={p+50} 
y1={ydata - 10} 
x2={p+50} y2={ydata +10}
    className="linechart_pathx2" />
             <text x={p} 
y={ydata + 20} fill="blue" 
transform={rot}>
{k} </text>
</g>);
rectdata = <g><rect x={100} y={ydata + 60} width="40" height="20" 
className="colorleg1"/>
<rect x={250} y={ydata + 60} width="40" height="20" className="colorleg2"/></g>
textdata = <g><text x={100} 
y={ydata + 100} fill="black">pricein</text><text x={250} 
y={ydata + 100} fill="black">profit price</text></g>  
 
}

//for generating y data
for(let a=(w === 0 ? ((2 * maxpoint) + 50) :
 ((props.data.length * maxpoint) + 50)) ; a > 50 ; a=a-50){

   if(w === 0){
    let z = (getLabelMaxX() + ((20/100)*getLabelMaxX()));
  let b = z/2; 
     c = b + (b * (((2 * maxpoint) + 50) - a)/50);
}
    else {
let b = w/props.data.length; 
     c = getLabelMinX()+b*((((props.data.length * maxpoint) + 50) - a)/50);
}

   

        graphy.push(<g key={a}>  
              <line x1="100" 
y1={a} 
x2="100" y2={a-50} 
className="linechart_pathy1"/>
             <line x1={100-10} y1={a-50} x2={100+10} y2={a-50} 
   className="linechart_pathy2"/>
             <text x={100-100} 
y={a} fill="red">
{c} </text>
             
            </g> );

tokenpairn = <g><text x={200} 
y={a - 80} fill="black"  >{props.tokenacuan}/{props.namatoken}
 </text></g> ;

}


   for(let j=100; j < (props.data.length * maxpoint) + 100; j=j+50){
       let l = ((j-50)/50) - 1;
      let w = (getLabelMaxX()-getLabelMinX());
  if(w === 0){
       w = (getLabelMaxX() + ((20/100)*getLabelMaxX()));
      let m = w/2;            // bottom value (this part still need thinking)
       let n = (parseFloat(props.data[l].x)) - m;
       let final = (n*50)/m;
         keepfinal.push(((2 * maxpoint) + 50) - final);

}
else{ 
    let m = w/props.data.length;
       let n = (parseFloat(props.data[l].x) - getLabelMinX())/m;
       let final = n*50;
         keepfinal.push(((props.data.length * maxpoint) + 50)-final);
     }
      
    linenya.push(<g key={j}> 

    { 
parseFloat(props.priceawal) < parseFloat(props.data[l].x) ?
          <circle cx={j} cy={keepfinal[l]} r="6"   
className="linechart_profit"/> 
     :
 <circle cx={j} cy={keepfinal[l]} r="6"   
className="linechart_circle"/>
}

     {
// Untuk menggambar graphic linenya 
 (j-50)-50 === 0 ? 
      <line  x1={j}  
            y1={keepfinal[l]} 
            x2={j} 
y2={keepfinal[l]} 
className="linechart_graphics" />    
         :
      <line  x1={j-50} 
             y1={keepfinal[l-1]}
            x2={j} 
y2={keepfinal[l]} 
className="linechart_graphics" />    
       }
            </g> );
}


return(
<div className="divalinechart">
 <svg width="500" height="500" xlmns="http://www/w3/org/2000/svg">
{tokenpairn}
{graphx}
{graphy}
{linenya}
{rectdata}
{textdata}
      </svg>
</div>
);
}

else {  
  return (
     <div className="divblinechart"> 
Waiting at least two points in graphics

</div>
   );
  
}
}

export default LineChart;
