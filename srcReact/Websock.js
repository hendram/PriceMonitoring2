import React, {memo} from 'react';

const Websock = (props) => {

const url="wss://localhost:443";


const wethusdc = [];
const wmaticusdc = [];
const uniusdc = [];
const pearusdc = [];

         const websock = new WebSocket(url);


      websock.onopen = () => {
 const message = { messagenya: "fromgui" }
             websock.send(JSON.stringify(message));
}



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
                    wethusdc.push(z);
                   props.givewethusdc(z);
        }
             else {
                   let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                      let z = {x,y};
                  wethusdc.splice(0,1);
                wethusdc.push(z); 
                props.givewethusdc(z);
}
                break;
/*
              case 'WMATIC':
                if(wmaticusdc.length < 6){
                        let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                      let z = {x,y};
                    wmaticusdc.push(z);
        }
             else {
                   let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                      let z = {x,y};
                  wmaticusdc.splice(0,1);
                wmaticusdc.push(z); 
}
                break;
              case 'UNI':
                if(uniusdc.length < 6){
                        let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                      let z = {x,y};
                    uniusdc.push(z);
        }
             else {
                   let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                      let z = {x,y};
                  uniusdc.splice(0,1);
                  uniusdc.push(z); 
}
                break;
              case 'PEAR':
                if(pearusdc.length < 6){
                        let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                      let z = {x,y};
                    pearusdc.push(z);
        }
             else {
                   let x = splitresult[0];
                        let y = JSON.parse(e.data).time;
                      let z = {x,y};
                  pearusdc.splice(0,1);
                pearusdc.push(z); 
}
                break;
*/

 default: console.log("error");
}

}
}
}

export default memo(Websock);
