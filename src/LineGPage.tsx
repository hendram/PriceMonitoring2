import React, {useState, useRef, useEffect, useContext, useCallback, ReactElement} from 'react';
import LineChart from './LineChart'
import './LineGPage.css';
import { MainContext1 } from './MainPage'
import { MainContext3 } from './MainPage'
import { MainContext4 } from  './MainPage'
import ExtendShowts from './ExtendShowts'

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
threemonthstamp: string;
}

type Currentts = {
ts: string;
showtsbel: string;
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
}

type widheset = {
width: number; 
height: number; 
widthlast: number;
heightlast: number;
}


type props = {
  websock: WebSocket;
  datalinegpage: Listdatain | null;
 }

type SVGchange = {
svghidorsh: string;
divwaithidorsh: string;
afteronelock: string;
}

const LineGPage: React.FC<props> = ({websock, datalinegpage}: props):
ReactElement => {


const allpricetime = useRef<Array<AllPricein>>([]);
const tnum = useRef<number>(NaN);
const showcur = useRef<Array<Currentts>>([]);

// Using type assertion for empty object {} as type or <type>{}
let listdatain: Listdatain | null  = null;
const widhehold = useRef<Array<widheset>>([]);
const [lchartdata, setLchartdata] = useState<JSX.Element[]>([]);
const divlchart = useRef<Array<SVGchange>>([]);
const a = useContext(MainContext1);
const c = useContext(MainContext3);
const d = useContext(MainContext4);

// set and delete table number using useEffect after user click delete chart

const changetnum = (tnumn: number) => {
     tnum.current = tnumn;
     tlinecex(tnum.current);
   console.log("nilai tnum" + tnum.current);
  }

// tlinecex for deleted graph
const tlinecex = (tnumin: number) => {
    let message = {deleteone: allpricetime.current[tnumin]};

                 allpricetime.current.splice(tnumin, 1);
    showcur.current.splice(tnumin, 1);
    divlchart.current.splice(tnumin, 1);     
 widhehold.current.splice(tnumin, 1);
                    tnum.current = NaN;

 // JSON.stringify cannot automatically makes value of object become string
// while only string accepted for websock send


  websock.send(JSON.stringify(message));
                     rerenderlchart();              
                    

}

// showcurrentts works only when Showts component clicked to show threemonthstamp
const showcurrentts = (id: number, hidestatus: string) => {
           if((showcur.current[id].showtsbel === "showts") || (hidestatus === "musthide")){
             showcur.current[id].ts = "";
             showcur.current[id].showtsbel = "hidets";
}
    else{    
     showcur.current[id].ts = allpricetime.current[id].threemonthstamp;
          showcur.current[id].showtsbel = "showts";
}
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
if(datalinegpage && 
websock.readyState === WebSocket.OPEN){
     console.log('masuk useeffect datalinegpage linegpage');
      let goodform = JSON.parse(JSON.stringify(datalinegpage));
// Check if allpricetime array has tokenname2 data already or not
       let newdata = "yes";
         for(let k=0; k < allpricetime.current.length; k++){
          if((allpricetime.current[k].tokenname === goodform.tokenname2)
          && (allpricetime.current[k].tokenanchor === goodform.tokenname1)){
             newdata = "no";

} 
} 
      if(newdata === "yes"){
           listdatain = goodform;
           console.log('masuk newdata yes' + listdatain);
}

     if(listdatain){
     console.log('inside listdatain linegpage');
     const message = { datanya: listdatain };

     console.log("message datanya " + JSON.stringify(message.datanya));
      
          websock.send(JSON.stringify(message));



      let newpricetime = {chain: listdatain.chain, dex: listdatain.dex,
pricetime:[], tokenname: listdatain.tokenname2, 
tokenanchor: listdatain.tokenname1,
pricein: listdatain.pricein, threemonthstamp: ""}
       allpricetime.current.push(newpricetime);

        showcur.current.push({ts: "", showtsbel: "hidets"});  
// widhehold will be use as template for resizing width and height of graph object
     widhehold.current.push({width: NaN, 
height: NaN, widthlast: NaN, heightlast: NaN});

//divlchart will be use as template for show or not for every svgchart
    divlchart.current.push({svghidorsh: "svghid",
divwaithidorsh: "divwaitsh", afteronelock: "no"}); 
}
}
         
rerenderlchart();

}, [datalinegpage]);

console.log("panjang lchartdata "+ lchartdata.length);

          websock.onmessage = (e) => {
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
            break;
        }
             else {
                   let k = splitresult[0];
                        let l = JSON.parse(e.data).time;
                      let z = {x: k, y: l};
                   allpricetime.current[v].pricetime.splice(0, 1);
                  allpricetime.current[v].pricetime.push(z);
          break;
}}        

}

}
     else if(JSON.parse(e.data).account){
          if(a && (typeof a === "object")){
              a.accountada(JSON.parse(e.data).account, JSON.parse(e.data).accountid, 
JSON.parse(e.data).balanceval);
   }
}
      else if(JSON.parse(e.data).goarrlist) {
     let goarrlistlgp = JSON.parse(e.data).goarrlist;    
 allpricetime.current.length = 0;
  widhehold.current.length = 0;
  divlchart.current.length = 0;
              
    for(let w = 0; w < goarrlistlgp.length; w++){
      let newpricetime = {chain: goarrlistlgp[w].chain, dex: goarrlistlgp[w].dex,
pricetime:[], tokenname: goarrlistlgp[w].tokenname, 
tokenanchor: goarrlistlgp[w].tokenanchor,
pricein: goarrlistlgp[w].pricein, threemonthstamp: goarrlistlgp[w].threemonthstamp}
       allpricetime.current.push(newpricetime);
        showcur.current.push({ts: "", showtsbel: "hidets"});  
        
  
     widhehold.current.push({width: NaN, 
height: NaN, widthlast: NaN, heightlast: NaN});

    divlchart.current.push({svghidorsh: "svghid",
divwaithidorsh: "divwaitsh", afteronelock: "no"}); 

if(c && (typeof c === "object")){
     c.showaddmenu();
}
}

if(d && (typeof d === "object")){
   d.graphicsshowm();
}
   console.log('masuk dalam goarrlistlgp'); 

}

     else if(JSON.parse(e.data).threemonthstamplist){
                let threemonthlist = JSON.parse(e.data).threemonthstamplist;
               for(let u = 0; u < threemonthlist.length; u++){
                  allpricetime.current[u].threemonthstamp = threemonthlist[u];
}


if(c && (typeof c === "object")){
     c.showaddmenu();
}
          console.log('masuk ke dalam timestampthreemonthlist');
}

  rerenderlchart();

};


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
    <ExtendShowts id={m} dataextend={allpricetime.current[m].threemonthstamp} 
 showcurrent={showcurrentts} delme={changetnum} />
        <LineChart  id={m} data={allpricetime.current[m].pricetime}
namatoken={allpricetime.current[m].tokenname} 
tokenacuan={allpricetime.current[m].tokenanchor}
priceawal={allpricetime.current[m].pricein} widhesetlc={widhesetlp} 
widhenow={widhehold.current[m]} divwait={divlchart.current[m].divwaithidorsh} 
svghs={divlchart.current[m].svghidorsh}
handlemouseenter={handlemouseenterfunc} 
handlemouseleave={handlemouseleavefunc} 
afterlength={afterlengthone}
currentts={showcur.current[m].ts}
showtsbelow={showcur.current[m].showtsbel} />
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
