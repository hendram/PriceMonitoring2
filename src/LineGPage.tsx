import React, {useState, useEffect, ReactElement} from 'react';
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


type props = {
  datalinegpage:  [];
  emptydata: Function;
}


const LineGPage: React.FC<props> = ({datalinegpage, emptydata,}: props):
ReactElement => {

const url="wss://localhost:8443";

const [websock, setWebsock] = useState<WebSocket>
(Singletonws.getInstance());

const [allpricetime, setAllpricetime] = useState<Array<AllPricein>>([]);
const tlinechart: number[] = [];
const [tnum, setTnum] = useState<number>(NaN);
const lchartdata: JSX.Element[] = []
const listdatain: Array<Listdatain> = [];


      websock.onopen = () => {
 const message = { messagenya: "fromgui" }
        websock.send(JSON.stringify(message));
}             

window.addEventListener('unload', function(event){
        let message = {deleteall: "windowclose"};
          websock.send(JSON.stringify(message));
   });

// set and delete table number using useEffect after user click delete chart

const changetnum = (tnumn: number) => {
      let tnumnew = tnum;
        tnumnew = tnumn;
       setTnum(tnumnew);
     console.log("nilai tnum" + tnum);
  }

// tlinecex for deleted graph
const tlinecex = (tnum: number) => {
                let indexdel = tlinechart.indexOf(tnum);
                let deleteitem = [...allpricetime];
                 deleteitem.splice(indexdel, 1);
                   setAllpricetime(deleteitem);
                 let message = {deleteone: indexdel};
  websock.send(JSON.stringify(message));         
                  let tnumnew = tnum;
                   tnumnew = NaN;
                 setTnum(tnumnew);
}

 useEffect(() => {
if(!isNaN(tnum)){
tlinecex(tnum);
}
}, [tnum]);

useEffect(() => {
if(datalinegpage.length !== 0 && websock.readyState === WebSocket.OPEN){
      let goodform = JSON.parse(JSON.stringify(datalinegpage));
// Check if allpricetime array has tokenname2 data already or not
   for(let w=0; w < datalinegpage.length; w++){
       let newdata = "yes";
         for(let k=0; k < allpricetime.length; k++){
          if((allpricetime[k].tokenname === goodform[w].tokenname2)
          && (allpricetime[k].tokenanchor === goodform[w].tokenname1)){
             newdata = "no";

}}
      if(newdata === "yes"){
           listdatain.push(goodform[w]);
           
}
}         

     const message = { datanya: listdatain };

     console.log("message datanya " + JSON.stringify(message.datanya[0]));
      
          websock.send(JSON.stringify(message));


      for(let u=0;  u < listdatain.length; u++){

      let newpricetime = {chain: listdatain[u].chain, dex: listdatain[u].dex,
pricetime:[], tokenname: listdatain[u].tokenname2, 
tokenanchor: listdatain[u].tokenname1,
pricein: listdatain[u].pricein}
       setAllpricetime(allpricetime => [...allpricetime, newpricetime]);
}
         
if(datalinegpage.length !== 0){
emptydata();
}
     
}
},[datalinegpage]);


console.log("panjang lchartdata "+ lchartdata[0]);

          websock.onmessage = (e) => {
             console.log(JSON.parse(e.data));
         if(JSON.parse(e.data).price && JSON.parse(e.data).time){
  let splitresult = JSON.parse(e.data).price.split(' ');
             console.log(splitresult[4]);
      for(let v=0; v < allpricetime.length; v++){
// fill in allpricetime pricetime array data         
    if((splitresult[4] === allpricetime[v].tokenname) &&
            (splitresult[1] === allpricetime[v].tokenanchor))
         {
                if(allpricetime[v].pricetime.length < 6){
                        let k = splitresult[0];
                        let l = JSON.parse(e.data).time;
                      let z = {x: k, y: l};
                   let a = [...allpricetime];
                   let b = allpricetime[v];
                   let c = [...allpricetime[v].pricetime];
                    c.push(z);
                    b.pricetime = c;
                    a[v] = b;
           setAllpricetime(a);
            break;
        }
             else {
                   let k = splitresult[0];
                        let l = JSON.parse(e.data).time;
                      let z = {x: k, y: l};
                   let a = [...allpricetime];
                   let b = allpricetime[v];
                   let c = [...allpricetime[v].pricetime];
                    c.splice(0,1);
                    c.push(z);
                    b.pricetime = c;
                    a[v] = b;
           setAllpricetime(a);
           break;
}}        

}

}
}

if(allpricetime.length !== 0){
for(let m =0; m < allpricetime.length; m++){
  tlinechart.push(m);
  lchartdata.push( <div key={m} className="lchartgr">
        <Closingbutton id={m} delme={changetnum} /> 
        <LineChart  data={allpricetime[m].pricetime}
namatoken={allpricetime[m].tokenname} tokenacuan={allpricetime[m].tokenanchor}
priceawal={allpricetime[m].pricein} />
      </div>);
}
}


    return (
      <div className="divlchartdata">
{lchartdata}
</div>
    );
  }


export default LineGPage;
