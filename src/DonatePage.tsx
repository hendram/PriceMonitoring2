import React, {useRef, useState, ReactElement} from 'react';
import { ethers } from 'ethers';
import Closingbutton from './Closingbutton';
import './DonatePage.css';
import detectEthereumProvider from '@metamask/detect-provider';
import { MetaMaskInpageProvider } from '@metamask/providers';

type props = {
websock: WebSocket;
providerdon: Function;
senddonatefunc: Function;
closingdon: Function;
}


const DonatePage : React.FC<props> = ({websock, providerdon, closingdon, senddonatefunc}: props): ReactElement => {
const accountaddr = useRef<string>("");
const takeusdcval = useRef<HTMLInputElement>(null);
const [buttonstatus, setButtonstatus] = useState({donbuttondiv: "donatebuttonhid", 
conntodiv: "connectpolygonsh"});
let provider: any  = null;

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
     if(ethers.utils.hexValue(chainId) !== ethers.utils.hexValue(137)) {
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
       params: [{ chainId: ethers.utils.hexValue(137)}],
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
                chainId: ethers.utils.hexValue(137),
                chainName: 'Matic network',
  nativeCurrency: {
                    name: 'MATIC',
                    decimals: 18
         },
               rpcUrls: "https://polygon-rpc.com"
       },
],
     });
   } catch (Error) {
   console.log('failed to add mumbai network');
    }
}
}
}

const accountChange = (account: string, provider: MetaMaskInpageProvider) => {
     let newbuttonstatus = {donbuttondiv: "donatebuttonsh", conntodiv: "connectpolygonhid"}
         setButtonstatus(newbuttonstatus);
           accountaddr.current = account;
           providerdon(provider);
}


const handleSubmitconn = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
beginconnect();
}

const handleSubmitdon = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
         if(takeusdcval && (takeusdcval.current !== null)){
       senddonatefunc(takeusdcval.current.value, accountaddr.current);     
}
}

return(
<div className="donatepagediv">
<div className="closingdondiv">
   <Closingbutton close={closingdon}/>
</div>
<div className="donatediv">
   <span className="donatespan">
      Please Donate to this projects, We have success to make this Proof of Concept 100% working, but 
      as with all other web projects, this needs to be test by tester from around the world. Moreover this
      is quite realtime graphics which needs to be verified that time is still in range of acceptable from
      user around the world. We will use your generous donation money to hire good tester from around the 
      world to test it and see if there are bugs needs to fix before confident to full launch using 
      mainnet for payment. Lots of thanks before for your kindly understanding. 
    </span>
</div>
<div className="divrowdonate">
       <div className="inputdiv">
        <input type="text" className="usdctoken" ref={takeusdcval}/>
        </div>
         <div className="usdcspandiv">
         <span className="usdctext">USDC</span>
         </div>
</div>

       <div className={buttonstatus.conntodiv}>
          <button className="connectpoly" onClick={(e) =>
handleSubmitconn(e)} >Connect to Polygon Mainnet</button>
        </div>
       <div className={buttonstatus.donbuttondiv}>
          <button className="donatesubmit" onClick={(e) =>
handleSubmitdon(e)} >Donate</button>
        </div>
</div>
);
}

export default DonatePage;
