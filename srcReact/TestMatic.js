import React, {useState, useEffect} from 'react';
import { ethers } from 'ethers';

const TestMatic = () => {

let accounts = [];
let gasprice = "";
const url="wss://localhost:8443";

const [websock, setWebsock] = useState(new WebSocket(url));




/* async function getestimateGas() {
 gasprice = await window.ethereum.request({
      method: 'eth_estimateGas',
      params: [
        {
          from: accounts[0],
          to: '0xD55Cb2C0977570C17717DA435f8652188D0d292B',
          },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);

}
*/

function ethButton(event) {
//Sending Ethereum to an address
event.preventDefault();
  //   getestimateGas();

  window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: '0xD55Cb2C0977570C17717DA435f8652188D0d292B',
          value: '0x016345785D8A0000',
          gasPrice: gasprice,
          gas: '0x5208',
          chainID: '80001', 
        },
      ],
    })
    .then((txHash) =>  console.log(txHash))
    .catch((error) => console.error);

}

async function getAccount(event) {
   event.preventDefault();
  accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

}



return(
<>
<button size="40" onClick={(e) => getAccount(e)}>getAccount</button>
<button size="40" onClick={(e) => ethButton(e)}>sendTransfer</button>

</>
)

}

export default TestMatic;
