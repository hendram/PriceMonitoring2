import React, { useState, ReactElement } from 'react';
import './WalletConnection.css';
import Metamsk from './images/metamask.png';
import { ethers, providers } from 'ethers';
import Closingbuttonwal from './Closingbuttonwal';
import detectEthereumProvider from '@metamask/detect-provider';
import { MetaMaskInpageProvider } from '@metamask/providers';

type props = {
  websock: WebSocket;
  balancewal: Function;
  accountwal: Function;
  closingwal: Function;
  providerwal: Function;
}

const WalletConnection: React.FC<props> = ({websock, balancewal, accountwal, closingwal, providerwal}: props): 
ReactElement => {

const beginconnect = async () => {
const provide: unknown = await detectEthereumProvider();

if(provide && (typeof provide === "object")) {
   const provider =  provide as MetaMaskInpageProvider;
  startApp(provider);
}
 else {
   console.log('please install metamask');
}
}

async function startApp(provider: MetaMaskInpageProvider) {
     if(provider !== window.ethereum) {
   console.error('Do you have multiple wallets installed?');
   }
      else{
   const chainId = await provider.request({method: 'eth_chainId' });
   if(typeof chainId === "string"){
   handleChainChanged(chainId, provider);
}
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

 provider.on('accountsChanged', (accounts) => {  
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
    
     const getBal =  await provider.request({
             method: "eth_getBalance",
             params: [address, "latest"]
        });

if(getBal && (typeof getBal === "string")){
         balancewal(ethers.utils.formatEther(getBal));
}
providerwal(provider);

};



const accountChange = (account: string, provider: MetaMaskInpageProvider) => {
       accountwal(account);
     let message = {accountaddr: account}
       websock.send(JSON.stringify(message));
      getBalance(account, provider);
}

const metconnect = (event: React.MouseEvent<HTMLImageElement>) => {
event.preventDefault();
beginconnect();

}


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
