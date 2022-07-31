import React, {useState, useRef, useEffect, ReactElement} from 'react';
import LineChart from './LineChart'
import Closingbutton from './Closingbutton'
import './LineGPage.css';
import Singletonws from './Singletonws';

type Pricetime = {
 x: string;
 y: string;
}

type AllPricein = {
chain: string;
dex: string,
pricetime: Array<Pricetime>;
tokenname: string;
tokenanchor: string;
pricein: string;
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

type widheset = {
width: number; 
height: number; 
widthlast: number;
heightlast: number;
}


type props = {
  datalinegpage:  [];
  emptydata: Function;
}

type SVGchange = {
svghidorsh: string;
divwaithidorsh: string;
afteronelock: string;
}


const LineGPage: React.FC<props> = ({datalinegpage, emptydata,}: props):
ReactElement => {

const url="wss://localhost";
// using useRef for Websocket singleton will makes more controllabel and
// predictable when new instance need it
const websock = useRef<WebSocket>(Singletonws.getInstance());


const allpricetime = useRef<Array<AllPricein>>([]);
const tnum = useRef<number>(NaN);

const listdatain: Array<Listdatain> = [];
const widhehold = useRef<Array<widheset>>([]);
const [lchartdata, setLchartdata] = useState<JSX.Element[]>([]);
const divlchart = useRef<Array<SVGchange>>([]);

      websock.current.onopen = () => {
 const message = { messagenya: "fromgui" }
        websock.current.send(JSON.stringify(message));
}             

window.addEventListener('unload', function(event){
        let message = {deleteall: "windowclose"};
          websock.current.send(JSON.stringify(message));
   });

// set and delete table number using useEffect after user click delete chart

const changetnum = (tnumn: number) => {
     tnum.current = tnumn;
     tlinecex(tnum.current);
   console.log("nilai tnum" + tnum.current);
  }

// tlinecex for deleted graph
const tlinecex = (tnumin: number) => {
                 allpricetime.current.splice(tnumin, 1);

    divlchart.current.splice(tnumin, 1);     
 widhehold.current.splice(tnumin, 1);
                    tnum.current = NaN;

 // JSON.stringify cannot automatically makes value of object become string
// while only string accepted for websock send

    let message = {deleteone: tnumin.toString()};


  websock.current.send(JSON.stringify(message));
                     rerenderlchart();              
                    

}



const afterlengthone = (idnya: number) => {
    if(divlchart.current[idnya].afteronelock === "no"){
      
      divlchart.current[idnya].svghidorsh = "svgsh";
      divlchart.current[idnya].divwaithidorsh = "divwaithid";
      divlchart.current[idnya].afteronelock = "yes";
     rerenderlchart();

}
}

const handlemouseenterfunc = (idnya: number) => {

      divlchart.current[idnya].svghidorsh = "svgshwithblock";
      rerenderlchart();
}


const handlemouseleavefunc = (idnya: number) => {
       divlchart.current[idnya].svghidorsh = "svgsh";
      rerenderlchart();
}

useEffect(() => {
if(datalinegpage.length !== 0 && 
websock.current.readyState === WebSocket.OPEN){
       listdatain.length = 0;
      let goodform = JSON.parse(JSON.stringify(datalinegpage));
// Check if allpricetime array has tokenname2 data already or not
   for(let w=0; w < datalinegpage.length; w++){
       let newdata = "yes";
         for(let k=0; k < allpricetime.current.length; k++){
          if((allpricetime.current[k].tokenname === goodform[w].tokenname2)
          && (allpricetime.current[k].tokenanchor === goodform[w].tokenname1)){
             newdata = "no";

}}
      if(newdata === "yes"){
           listdatain.push(goodform[w]);
           
}
}         

     const message = { datanya: listdatain };

     console.log("message datanya " + JSON.stringify(message.datanya[0]));
      
          websock.current.send(JSON.stringify(message));


      for(let u=0;  u < listdatain.length; u++){

      let newpricetime = {chain: listdatain[u].chain, dex: listdatain[u].dex,
pricetime:[], tokenname: listdatain[u].tokenname2, 
tokenanchor: listdatain[u].tokenname1,
pricein: listdatain[u].pricein}
       allpricetime.current.push(newpricetime);
  
     widhehold.current.push({width: NaN, 
height: NaN, widthlast: NaN, heightlast: NaN});

    divlchart.current.push({svghidorsh: "svghid",
divwaithidorsh: "divwaitsh", afteronelock: "no"}); 

}
         
rerenderlchart();

if(datalinegpage.length !== 0){
emptydata();
}
     
}
},[datalinegpage]);




console.log("panjang lchartdata "+ lchartdata.length);

          websock.current.onmessage = (e) => {
             console.log(JSON.parse(e.data));
         if(JSON.parse(e.data).price && JSON.parse(e.data).time){
  let splitresult = JSON.parse(e.data).price.split(' ');
             console.log(splitresult[4]);
      for(let v=0; v < allpricetime.current.length; v++){
// fill in allpricetime pricetime array data         
    if((splitresult[4] === allpricetime.current[v].tokenname) &&
            (splitresult[1] === allpricetime.current[v].tokenanchor))
         {
                if(allpricetime.current[v].pricetime.length < 6){
                        let k = splitresult[0];
                        let l = JSON.parse(e.data).time;
                      let z = {x: k, y: l};
                   allpricetime.current[v].pricetime.push(z);
                       rerenderlchart();
            break;
        }
             else {
                   let k = splitresult[0];
                        let l = JSON.parse(e.data).time;
                      let z = {x: k, y: l};
                   allpricetime.current[v].pricetime.splice(0, 1);
                  allpricetime.current[v].pricetime.push(z);
                   rerenderlchart();
          break;
}}        

}

}
}

// using useRef in this function, cause useState cannot rerender at all
const widhesetlp = (idnya: number, widthnya: number, heightnya: number) => {
   console.log('width from lchart' + idnya + ' ' + widthnya +' ' + heightnya);
        
    if(isNaN(widhehold.current[idnya].width) && 
 isNaN(widhehold.current[idnya].height)){
      widhehold.current.splice(idnya, 1, {width: widthnya, 
height: heightnya, widthlast: NaN, heightlast: NaN});
  
      rerenderlchart();

       console.log('inside if');
  }
  else {

    widhehold.current.splice(idnya, 1, { width: widhehold.current[idnya].width, 
 height: widhehold.current[idnya].height, 
     widthlast: widthnya -  widhehold.current[idnya].width, 
heightlast: heightnya - widhehold.current[idnya].height});

    rerenderlchart();
}

console.log('isi widhehold' + widhehold.current[0].width + 'plus' + 
widhehold.current[0].widthlast);     
}



const rerenderlchart = () => {

let newlchartdata = [...lchartdata];

if(newlchartdata.length !== 0) {
     newlchartdata.length = 0;
}

for(let m =0; m < allpricetime.current.length; m++){
  newlchartdata.push( <div key={m} className="lchartgr">
        <Closingbutton id={m} delme={changetnum} /> 
        <LineChart  id={m} data={allpricetime.current[m].pricetime}
namatoken={allpricetime.current[m].tokenname} 
tokenacuan={allpricetime.current[m].tokenanchor}
priceawal={allpricetime.current[m].pricein} widhesetlc={widhesetlp} 
widhenow={widhehold.current[m]} divwait={divlchart.current[m].divwaithidorsh} 
svghs={divlchart.current[m].svghidorsh}
handlemouseenter={handlemouseenterfunc} 
handlemouseleave={handlemouseleavefunc} 
afterlength={afterlengthone} />
      </div>);
}

setLchartdata(newlchartdata);

 }





    return (
      <div className="divlchartdata">
{lchartdata}
</div>
    );
  }


export default LineGPage;
