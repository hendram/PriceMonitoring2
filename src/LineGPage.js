import React, {useState, useEffect} from 'react';
import LineChart from './LineChart.js'


const LineGPage = (props) => {

const url="wss://localhost:8443";

const [websock, setWebsock] = useState(new WebSocket(url));
const [allpricetime, setAllpricetime] = useState([]);
const tlinechart = [];
const tnum = "";
const lchartdata = []

      websock.onopen = () => {
 const message = { messagenya: "fromgui" }
        websock.send(JSON.stringify(message));
             
}

const changetnum = (tnumn) => {
      tnum = tnumn;
  }

const tlinecex = (tnum) => {
                indexdel = tlinechart.indexOf(tnum);
                let deleteitem = [...allpricetime];
                 deleteitem.splice(indexdel, 1);
                   setAllpricetime(deleteitem);
                 let message = {deleteone: indexdel};
                 websock.send(JSON.stringify(message));         
}

 useEffect(() => {
tlinecex();
}, [tnum]);

useEffect(() => {
if(props.datalinegpage.length !== 0 && 
websock.readyState === WebSocket.OPEN){
     const message = { datanya: props.datalinegpage };
     console.log("message datanya " + JSON.stringify(message.datanya[0]));
        websock.send(JSON.stringify(message));
      let goodform = JSON.parse(JSON.stringify(props.datalinegpage));

      for(let u=0;  u < props.datalinegpage.length; u++){

      let newpricetime = {chain: goodform[u].chain, dex: goodform[u].dex,
pricetime:[], tokenname: goodform[u].tokenname2, 
tokenanchor: goodform[u].tokenname1,
pricein: goodform[u].pricein}
       setAllpricetime(allpricetime => [...allpricetime, newpricetime]);
}
         
if(props.datalinegpage.length !== 0){
props.emptydata();
}
     
}
},[props.datalinegpage[0]]);


console.log("panjang lchartdata "+ lchartdata[0]);

          websock.onmessage = (e) => {
             console.log(JSON.parse(e.data));
         if(JSON.parse(e.data).price && JSON.parse(e.data).time){
  let splitresult = JSON.parse(e.data).price.split(' ');
             console.log(splitresult[4]);
      for(let v=0; v < allpricetime.length; v++){
             if(splitresult[4] === allpricetime[v].tokenname){
                if(allpricetime[v].pricetime.length < 6){
                        let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                      let z = {x,y};
                   let a = [...allpricetime];
                   let b = allpricetime[v];
                   let c = [...allpricetime[v].pricetime];
                    c.push(z);
                    b.pricetime = c;
                    a[v] = b;
           setAllpricetime(a);
            break;
          console.log("allpricetime" + allpricetime[v].pricetime.length);
        }
             else {
                   let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                      let z = {x,y};
                   let a = [...allpricetime];
                   let b = allpricetime[v];
                   let c = [...allpricetime[v].pricetime];
                    c.splice(0,1);
                    c.push(z);
                    b.pricetime = c;
                    a[v] = b;
           setAllpricetime(a);
           break;
              console.log(allpricetime[v].pricetime.length);
}}        

}

}
}

if(allpricetime.length !== 0){
for(let m =0; m < allpricetime.length; m++){
  tlinechart.push(m);
  lchartdata.push( <div key={m} style={{display: "inline-block"}}>
        <LineChart id={m} delme={changetnum} data={allpricetime[m].pricetime}
namatoken={allpricetime[m].tokenname} tokenacuan={allpricetime[m].tokenanchor}
priceawal={allpricetime[m].pricein} />
      </div>);
}
}


    return (
      <>
{lchartdata}
</>
    );
  }


export default LineGPage;
