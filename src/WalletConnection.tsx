import React, { useState, ReactElement } from 'react';
import './WalletConnection.css';
import Metamsk from './images/metamask.png';
import { ethers } from 'ethers';
import Closingbutton from './Closingbutton';
import detectEthereumProvider from '@metamask/detect-provider';
import { MetaMaskInpageProvider } from '@metamask/providers';

type props = {
  websock: WebSocket;
  closingwal: Function;
  providerwal: Function;
}

const WalletConnection: React.FC<props> = ({websock, closingwal, providerwal}: props): 
ReactElement => {
let provider: any = null;

const beginconnect = async () => {
const provide: unknown = await detectEthereumProvider();

if(provide && (typeof provide === "object")) {
  startApp(provide);
}
 else {
   console.log('please install metamask');
}
}


async function startApp(provide: object) {
  try { 
    if(provide !== window.ethereum) {
   console.error('Do you have multiple wallets installed?');
   }
      else{
   provider =  provide as MetaMaskInpageProvider;

   const chainId = await provider.request({method: 'eth_chainId' });
   if(typeof chainId === "string"){
   handleChainChanged(chainId, provider);
}
}
}
catch(error){
console.log(error);
}
}

// ethereumwal.on('chainChanged', handleChainChanged);

function handleChainChanged(chainId: string, provider:MetaMaskInpageProvider){
    
// don't compare chainId with parseInt never works
     if(ethers.utils.hexValue(chainId) !== ethers.utils.hexValue(80001)) {
    changedchain(provider);
}
  else {
      getAccount(provider);
    }               
}

async function getAccount(provider: MetaMaskInpageProvider){
 /* if not using .then again, then need await as replacement */ 
 const connacct = await provider.request({ method: "eth_requestAccounts" });
      if(connacct && Array.isArray(connacct)){
        accountChange(connacct[0], provider);
   }
}

if(provider !== null) {
 provider.on('accountsChanged', (accounts: string) => {  
      console.log('account dari getAccount' + JSON.stringify(accounts));
       if(accounts && Array.isArray(accounts)){
        accountChange(accounts[0], provider);
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
}

async function changedchain(provider: MetaMaskInpageProvider){
   const switchchain = await provider.request({
       method: 'wallet_switchEthereumChain',
       params: [{ chainId: ethers.utils.hexValue(80001)}],
     });
  if(switchchain === null){
          getAccount(provider);
   } 
   else {
      if(switchchain === 4902) {
         try {
           await provider.request({
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

const getBalance = async (address: string, provider: MetaMaskInpageProvider) => {
try{    
     const getBal =  await provider.request({
             method: "eth_getBalance",
             params: [address, "latest"]
        });

if(getBal && (typeof getBal === "string")){
         let balance = ethers.utils.formatEther(getBal);
     let message = {accountaddr: address, balanceval: balance}
       websock.send(JSON.stringify(message));          
}
providerwal(provider);
}
catch(error){
console.log(error);
}
};



const accountChange = (account: string, provider: MetaMaskInpageProvider) => {

      getBalance(account, provider);
}

const metconnect = (event: React.MouseEvent<HTMLImageElement>) => {
event.preventDefault();
beginconnect();

}


    return(
<div className="wallconndiv">
<div className="closingwaldiv">
   <Closingbutton close={closingwal}/>
</div>
<div>
  <img src={Metamsk} width="120" height="120" onClick={(e) => metconnect(e)}>
</img>
</div>
</div>
)
}

export default WalletConnection;
