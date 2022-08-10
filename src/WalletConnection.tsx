import React, { useState, ReactElement } from 'react';
import './WalletConnection.css';
import Metamsk from './images/metamask.png';
import { ethers } from 'ethers';
import Closingbuttonwal from './Closingbuttonwal';
import detectEthereumProvider from '@metamask/detect-provider';
import { MetaMaskInpageProvider } from '@metamask/providers';
// declare let window: unknown;

type Datamet = {
  address: string;
  Balance: string;
}

type props = {
  closingwal: Function;
}

const WalletConnection: React.FC<props> = ({closingwal,}: props): 
ReactElement => {

const ethereum = window.ethereum as MetaMaskInpageProvider;

const beginconnect = async () => {
const provider: unknown = await detectEthereumProvider();
if(provider) {
  startApp(provider);
}
 else {
   console.log('please install metamask');
}
}

const [datamet, setDatamet] = useState<Datamet>({
    address: "",
    Balance: "",
  });

async function startApp(provider: unknown) {
     if(provider !== window.ethereum) {
   console.error('Do you have multiple wallets installed?');
   }
   const chainId: unknown = await ethereum.request({method: 'eth_chainId' });
   if(typeof chainId === "string"){
   handleChainChanged(chainId);
}
}

// ethereum.on('chainChanged', handleChainChanged);

function handleChainChanged(chainId: string){
    
// don't compare chainId with parseInt never works
     if(ethers.utils.hexValue(chainId) !== ethers.utils.hexValue(80001)) {
    changedchain();
}
  else {
      getAccount();
    }               
}

async function getAccount(){
 /* if not using .then again, then need await as replacement */ 
 const connacct = await ethereum.request({ method: "eth_requestAccounts" });
      if(connacct && Array.isArray(connacct)){
        accountChange(connacct[0]);
   }
}

 ethereum.on('accountsChanged', (accounts) => {  
      console.log('account dari getAccount' + JSON.stringify(accounts));
       if(accounts && Array.isArray(accounts)){
        accountChange(accounts[0])
   }
    else {
     console.log('tampilan error accounts' + accounts);
   /*  if (Error === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error);
      }  */   
}
});

async function changedchain(){
   const switchchain = await ethereum.request({
       method: 'wallet_switchEthereumChain',
       params: [{ chainId: ethers.utils.hexValue(80001)}],
     });
  if(switchchain === null){
          getAccount();
   } 
   else {
      if(switchchain === 4902) {
         try {
           await ethereum.request({
             method: 'wallet_addEthereumChain',
             params: [
                {
                chainId: ethers.utils.hexValue(80001),
                chainName: 'Mumbai network',
                 nativeCurrency: {
                    name: 'MATIC',
                    decimals: 18
         },
               rpcUrls: "https://rpc-mumbai.maticvigil.com"
       },
],
     });
   } catch (Error) {
   console.log('failed to add mumbai network');
    }
}
}
}

const getBalance = async (address: string) => {
    
     const getBal =  await ethereum.request({
             method: "eth_getBalance",
             params: [address, "latest"]
        });

if(getBal && (typeof getBal === "string")){
          setDatamet(newdatamet => ({...newdatamet, 
  Balance: ethers.utils.formatEther(getBal)}));
}
};

const accountChange = (account: string) => {
        setDatamet(newdatamet => ({...newdatamet, 
address: account}));

      getBalance(account);
}

const metconnect = (event: React.MouseEvent<HTMLImageElement>) => {
event.preventDefault();
beginconnect();

}

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
)
}

export default WalletConnection;
