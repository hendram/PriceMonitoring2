import React, {useRef, ReactElement} from "react"
import "./LineChart.css"

type Data = {
 x: string;
 y: string;
}

type props = {
   data: Array<Data>;
   namatoken: string;
   tokenacuan: string;
   priceawal: string;
}

const LineChart: React.FC<props> = ({data, namatoken, tokenacuan,
priceawal,}: props): ReactElement => {



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


if(data.length > 1){

   const graphx = []; 
  const graphy = [];
   const linenya = [];
  const keepfinal = [];
 const maxpoint = 50;
  const w = (getLabelMaxX()-getLabelMinX());


if(w === 0){
 ydata = (2 * maxpoint) + 50 }
else {
 ydata = (data.length * maxpoint) + 50
}  

//for generating x data
   for(let p=100; p < (data.length * maxpoint) + 100; p=p+50){
       let o = ((p-50)/50) - 1; 
       let k : string = data[o].y;
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
 ((data.length * maxpoint) + 50)) ; a > 50 ; a=a-50){

   if(w === 0){
    let z = (getLabelMaxX() + ((20/100)*getLabelMaxX()));
  let b = z/2; 
     c = b + (b * (((2 * maxpoint) + 50) - a)/50);
}
    else {
let b = w/data.length; 
     c = getLabelMinX()+b*((((data.length * maxpoint) + 50) - a)/50);
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
y={a - 80} fill="black"  >{tokenacuan}/{namatoken}
 </text></g> ;

}


   for(let j=100; j < (data.length * maxpoint) + 100; j=j+50){
       let l = ((j-50)/50) - 1;
      let w = (getLabelMaxX()-getLabelMinX());
  if(w === 0){
       w = (getLabelMaxX() + ((20/100)*getLabelMaxX()));
      let m = w/2;            // bottom value (this part still need thinking)
       let n = (parseFloat(data[l].x)) - m;
       let final = (n*50)/m;
         keepfinal.push(((2 * maxpoint) + 50) - final);

}
else{ 
    let m = w/data.length;
       let n = (parseFloat(data[l].x) - getLabelMinX())/m;
       let final = n*50;
         keepfinal.push(((data.length * maxpoint) + 50)-final);
     }
      
    linenya.push(<g key={j}> 

    { 
parseFloat(priceawal) < parseFloat(data[l].x) ?
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
 <svg width="500" height="500" xmlns="http://www/w3/org/2000/svg">
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
