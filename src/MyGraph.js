import React, {useState} from 'react';
import LineChart from './LineChart.js'


const MyGraph = () => {

const url="wss://localhost:443";

const [websock, setWebsock] = useState(new WebSocket(url));
const [wethusdc, setWethusdc] = useState([]);
const [wmaticusdc, setWmaticusdc] = useState([]);
const [uniusdc, setUniusdc] = useState([]);
const [pearusdc, setPearusdc] = useState([]);



      websock.onopen = () => {
 const message = { messagenya: "fromgui" }
        websock.send(JSON.stringify(message));
}


/*
 console.log(wmaticusdc.length);
console.log(uniusdc.length);
console.log(pearusdc.length);
*/
          websock.onmessage = (e) => {
             console.log(JSON.parse(e.data));
         if(JSON.parse(e.data).price && JSON.parse(e.data).time){
  let splitresult = JSON.parse(e.data).price.split(' ');
            switch(splitresult[4]){
              case 'WETH':
                if(wethusdc.length < 6){
                        let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                      let z = {x,y};
                    setWethusdc(wethusdc => [...wethusdc, z]);
                   console.log(wethusdc.length);
        }
             else {
                   let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                      let z = {x,y};
            setWethusdc([...wethusdc.splice(1,5)])
                 setWethusdc(wethusdc => [...wethusdc, z]);
              console.log(wethusdc.length);
}
                break;

              case 'WMATIC':
                if(wmaticusdc.length < 6){
                        let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                      let z = {x,y};
                    setWmaticusdc(wmaticusdc => [...wmaticusdc, z]);
                   console.log(wmaticusdc.length);
        }
             else {
                   let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                          let z = {x,y};
                      setWmaticusdc([...wmaticusdc.splice(1,5)])
                 setWmaticusdc(wmaticusdc => [...wmaticusdc, z]);
}
                break;
              case 'UNI':
                if(uniusdc.length < 6){
                        let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                      let z = {x,y};
                    setUniusdc(uniusdc => [...uniusdc, z]);
                   console.log(uniusdc.length);
        }
             else {
                   let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                      let z = {x,y};
                          setUniusdc([...uniusdc.splice(1,5)])
                 setUniusdc(uniusdc => [...uniusdc, z]);
}
                break;
              case 'PEAR':
                if(pearusdc.length < 6){
                        let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                      let z = {x,y};
                    setPearusdc(pearusdc => [...pearusdc, z]);
                   console.log(pearusdc.length);
        }
             else {
                   let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                      let z = {x,y};
                      setPearusdc([...pearusdc.splice(1,5)])
                 setPearusdc(pearusdc => [...pearusdc, z]);
      
}
                break;

 default: console.log("error");
}

}

}

    return (
      <>
        <div style={{display: "inline-block"}}>
        <LineChart data={wethusdc} />
      </div>
 <div style={{display: "inline-block"}}>
        <LineChart data={wmaticusdc} />
      </div>
 <div style={{display: "inline-block"}}>
        <LineChart data={uniusdc} />
      </div>
 <div style={{display: "inline-block"}}>
        <LineChart data={pearusdc} />
      </div>
</>
    );
  }


export default MyGraph;
