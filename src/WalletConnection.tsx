import React, { useState, ReactElement } from 'react';
import './WalletConnection.css';
import Metamsk from './images/metamask.png';
import { ethers } from 'ethers';
import Closingbuttonwal from './Closingbuttonwal';
declare let window: any;

type Datamet = {
  address: string;
  Balance: string;
}

type props = {
  closingwal: Function;
}

const WalletConnection: React.FC<props> = ({closingwal,}: props): 
ReactElement => {

const [datamet, setDatamet] = useState<Datamet>({
    address: "",
    Balance: "",
  });

const getBalance = (address: string) => {
       window.ethereum
         .request({
             method: "eth_getBalance",
             params: [address, "latest"]
        })
      .then((balance: number) => {
          setDatamet(newdatamet => ({...newdatamet, 
  Balance: ethers.utils.formatEther(balance)}));
    });
};

const accountChange = (account: string) => {
        setDatamet(newdatamet => ({...newdatamet, 
address: account}));

      getBalance(account);
}


const metconnect = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
   if(window.ethereum) {
     window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res: string) => accountChange(res[0]));
      } else {
        alert("Please install metamask or using another wallet");
     }
};

console.log(datamet.address);
console.log(datamet.Balance);


    return(
<div className="wallconndiv">
<div className="closingwaldiv">
   <Closingbuttonwal closewal={closingwal}/>
</div>
<div>
  <img src={Metamsk} width="120" height="120" onClick={(e) => metconnect(e)}>
</img>
</div>
</div>
);
}

export default WalletConnection;
