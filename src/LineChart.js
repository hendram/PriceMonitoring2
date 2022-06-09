import React, {useRef} from "react"
import "./LineChart.css"


const LineChart = (props) => {

console.log(props.data.length);
console.log(props.data[5]);
let c;
let ydata;

if(props.data.length > 1){
  // GET MAX & MIN Y
/* function  getMaxXLength() {
    const data = props.data;
    const lengthest = data.reduce((min, p) => parseFloat(p.x).toString().length < min ? 
  parseFloat(p.x).toString().length :  min, 
parseFloat(data[0].x).toString().length);
  for(let u = 0; u < data.length; u++){
        if(parseFloat(data[u].x).toString().length === lengthest){
          return data[u].x;
    }
}
  } */
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
// const maxxLength = getMaxXLength();
  const w = (getLabelMaxX()-getLabelMinX());


if(w === 0){
 ydata = (2 * maxpoint) + 50 }
else {
 ydata = (props.data.length * maxpoint) + 50
}  

   for(let p=100; p < (props.data.length * maxpoint) + 100; p=p+50){
       let o = ((p-50)/50) - 1; 
       let k = props.data[o].y;
       let rotdata =  ydata + 20;
       let rot = "rotate(30," + p + "," + rotdata +")";
   
    graphx.push(<g key={p}>  
              <line x1={p} y1={ydata}
 x2={p+50} y2={ydata} 
className="linechart_path"/>
              <line x1={p+50} 
y1={ydata - 10} 
x2={p+50} y2={ydata +10}
    className="linechart_path" />
             <text x={p} 
y={ydata + 20} fill="blue" 
transform={rot}>
{k} </text> 
            </g> );
}


for(let a=(w === 0 ? ((2 * maxpoint) + 50) :
 (props.data.length * maxpoint) + 50) ; a > 50 ; 
a=a-50){

console.log("nilai a" + a);
   if(w === 0){
    let z = (getLabelMaxX() + ((20/100)*getLabelMaxX()));
  let b = z/2; 
     c = b + (b * (((2 * maxpoint) + 50) - a)/50);
}
    else {
let b = w/props.data.length; 
     c = getLabelMinX()+b*((((props.data.length * maxpoint) + 50) - a)/50);
}
    
/* 
   
let ytext = (w === 0 ? ( 2 * maxpoint) + 50 - (a === 150 ? 0 : 50) :
((props.data.length * maxpoint) + 50) - 
50*(((props.data.length * maxpoint) + 50) - a/50));
*/

   

        graphy.push(<g key={a}>  
              <line x1="100" 
y1={a} 
x2="100" y2={a-50} 
className="linechart_path"/>
             <line x1={100-10} y1={a-50} x2={100+10} y2={a-50} 
   className="linechart_path"/>
             <text x={100-100} 
y={a} fill="red">
{c} </text> 
            </g> );
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
    <circle cx={j} cy={keepfinal[l]} r="6"   
className="linechart_circle"/>
     { (j-50)-50 === 0 ? 
      <line  x1={j}  
            y1={keepfinal[l]} 
            x2={j} 
y2={keepfinal[l]} 
className="linechart_path" />    
         :
      <line  x1={j-50} 
             y1={keepfinal[l-1]}
            x2={j} 
y2={keepfinal[l]} 
className="linechart_path" />    
       }
            </g> );
}


return(
 <svg width="500" height="400" xlmns="http://www/w3/org/2000/svg">
{graphx}
{graphy}
{linenya}
      </svg>
);
}

else {  
  return (
     <> Test dulu goblok

</>
   );
  
}
}

export default LineChart;
