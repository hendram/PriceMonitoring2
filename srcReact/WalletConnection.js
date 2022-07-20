import React, { useState } from 'react';
import './WalletConnection.css';
import Metamsk from './images/metamask.png';
import { ethers } from 'ethers';

const WalletConnection = () => {

const [datamet, setDatamet] = useState({
    address: "",
    Balance: null,
  });

const getBalance = (address) => {
       window.ethereum
         .request({
             method: "eth_getBalance",
             params: [address, "latest"]
        })
      .then((balance) => {
          setDatamet(newdatamet => ({...newdatamet, 
  Balance: ethers.utils.formatEther(balance)}));
    });
};

const accountChange = (account) => {
        setDatamet(newdatamet => ({...newdatamet, 
address: account}));

      getBalance(account);
}


const metconnect = (event) => {
    event.preventDefault();
   if(window.ethereum) {
     window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChange(res[0]));
      } else {
        alert("Please install metamask or using another wallet");
     }
};

console.log(datamet.address);
console.log(datamet.Balance);


    return(
<div className="wallconndiv">
  <img src={Metamsk} width="120" height="120" onClick={(e) => metconnect(e)}>
</img>
<span>{datamet.address}</span>
<span>{datamet.Balance}</span>
</div>
);
}

export default WalletConnection;
