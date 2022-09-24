import React, {useState, useRef, useEffect, createContext} from 'react';
import WalletConnection from './WalletConnection';
import AddTokenDexGPage from './AddTokenDexGPage';
import MonitorPage from './MonitorPage';
import TokenDexGPage from './TokenDexGPage';
import Singletonws from './Singletonws';
import TransferPage from './TransferPage';
import DonatePage from './DonatePage';
import topimage from './images/topimage.png';
import './MainPage.css';
import { MetaMaskInpageProvider } from '@metamask/providers';
import {ethers} from 'ethers';
import BurgerMenu from './BurgerMenu';

interface AppContext2  {
showagaintrans: Function;
}

type comingobject = {
from: string;
id: number;
}

export const MainContext2 = React.createContext<AppContext2 | null>(null);

const MainPage = () => {

// using useRef for Websocket singleton will makes more controllabel and
// predictable when new instance need it

const [walletconn, setWalletconn] = useState({vis: "walletconnhid"});
const [transferpage, setTransferpage] = useState({vis: "transferpagehid"});
const [donatepage, setDonatepage] = useState({vis: "donatehiddiv"});
const [addmenu, setAddmenu] = useState({vis: "addmenuhid"});
const [menubranch, setMenubranch] = useState({addtokendexg: "addtokendexghid", 
viewgraphtokendex: "viewgraphtokendexhid", addts: "addtshid"});
const wsock = useRef<WebSocket>(Singletonws.getInstance());

const [pagecontentdiv, setPagecontentdiv] = useState({monitordiv: "monitordivsh", 
addtokendexgpagediv: "addtokendexgpagedivhid", tokendexgpagediv: "tokendexgpagedivhid"});

 const [graphicspagelock, setGraphicspagelock] = useState({yesno: "no", formember: "no"});

const [walletbutton, setWalletbutton] = useState({
connectdiv: "connectshdiv", transferdiv: "transferhiddiv", connecteddiv: "connectedhiddiv" });
const accountkeep = useRef<string>("");
const balancekeep = useRef<string>("");
const providerkeep = useRef<MetaMaskInpageProvider | null>(null);
const providerdonate = useRef<MetaMaskInpageProvider | null>(null);
const coming = useRef<comingobject>({from: "", id: NaN});

      wsock.current.onopen = () => {
}

window.addEventListener('unload', function(event){
          Singletonws.removeInstance();
            wsock.current.close();  

// don't use onclose, that for executing something after receiving
// close event from server 
  });


const tutup = (val: string) => {
        if(val === "true"){
    let newwalletconn = {vis: "walletconnhid"};
    setWalletconn(newwalletconn);
        }
}


const tutupdon = (val: string) => {
        if(val === "true"){
    let newdonatepage = {vis: "donatehiddiv"};
    setDonatepage(newdonatepage);
        }
}

let nVer = navigator.appVersion;
let nAgt = navigator.userAgent;
let browserName  = navigator.appName;
let fullVersion  = ''+parseFloat(navigator.appVersion); 
let majorVersion = parseInt(navigator.appVersion,10);
let nameOffset,verOffset,ix;

// In Opera, the true version is after "Opera" or after "Version"
if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
 browserName = "Opera";
 fullVersion = nAgt.substring(verOffset+6);
 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   fullVersion = nAgt.substring(verOffset+8);
}
// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
 browserName = "Microsoft Internet Explorer";
 fullVersion = nAgt.substring(verOffset+5);
}
// In Chrome, the true version is after "Chrome" 
else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
 browserName = "Chrome";
 fullVersion = nAgt.substring(verOffset+7);
}
// In Safari, the true version is after "Safari" or after "Version" 
else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
 browserName = "Safari";
 fullVersion = nAgt.substring(verOffset+7);
 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   fullVersion = nAgt.substring(verOffset+8);
}
// In Firefox, the true version is after "Firefox" 
else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
 browserName = "Firefox";
 fullVersion = nAgt.substring(verOffset+8);
}
// In most other browsers, "name/version" is at the end of userAgent 
else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
          (verOffset=nAgt.lastIndexOf('/')) ) 
{
 browserName = nAgt.substring(nameOffset,verOffset);
 fullVersion = nAgt.substring(verOffset+1);
 if (browserName.toLowerCase()==browserName.toUpperCase()) {
  browserName = navigator.appName;
 }
}
// trim the fullVersion string at semicolon/space if present
if ((ix=fullVersion.indexOf(";"))!=-1)
   fullVersion=fullVersion.substring(0,ix);
if ((ix=fullVersion.indexOf(" "))!=-1)
   fullVersion=fullVersion.substring(0,ix);

majorVersion = parseInt(''+fullVersion,10);
if (isNaN(majorVersion)) {
 fullVersion  = ''+parseFloat(navigator.appVersion); 
 majorVersion = parseInt(navigator.appVersion,10);
}

console.log('Browser name  = '+ browserName  +
 'Full version  = '+ fullVersion +
 'Major version = ' + majorVersion + 
 'navigator.appName = ' +navigator.appName +
 'navigator.userAgent = ' +navigator.userAgent);

function toconnected(){
 
      let newwalletbutton = {connectdiv: "connecthiddiv", transferdiv: "transferhiddiv", 
connecteddiv: "connectedshdiv"}
       setWalletbutton(newwalletbutton);

     showaddmenu("false");
}

function accountada(account: string, accountid: string, balanceval: string) {
      accountkeep.current = accountid;
      balancekeep.current = balanceval;
   if(account === "true"){
  // tutup function is for closing wallet dialog page   
   tutup("true");
   showaddmenu("false"); 
     }

  else if(account === "false"){
   console.log('nilai dari balance' + balanceval);
   if((+balanceval) < 0.1){
   tutup("true");
        alert('Sorry not enough MATIC in your wallet');
   }
    else if((+balanceval) >= 0.1){
        tutup("true");
    let newwalletbutton = walletbutton;
        newwalletbutton = {connectdiv: "connecthiddiv", transferdiv: "transfershdiv", 
connecteddiv: "connectedhiddiv"}
       setWalletbutton(newwalletbutton); 
   }
}
}

 
const showagaintrans = (id: number) => {
   let newtransferpage = transferpage;
    newtransferpage = {vis: "transferpagesh"};
    setTransferpage(newtransferpage);

      coming.current = {from: "extendsub", id: id};

    console.log('inside showagaintrans neh');
}

const showaddmenu = (hasempty: string) => {
 if(hasempty === "false"){
  if(walletbutton.connecteddiv === "connectedhiddiv"){
      let newwalletbutton = {connectdiv: "connecthiddiv", transferdiv: "transferhiddiv", 
connecteddiv: "connectedshdiv"}
       setWalletbutton(newwalletbutton);
}
  if(addmenu.vis === "addmenuhid"){
   let newaddmenu = {vis: "addmenush"};
    setAddmenu(newaddmenu);
}
}
  else {
  if(walletbutton.connecteddiv === "connectedshdiv"){
      let newwalletbutton = {connectdiv: "connectshdiv", transferdiv: "transferhiddiv", 
connecteddiv: "connectedhiddiv"}
       setWalletbutton(newwalletbutton);
}
  if(addmenu.vis === "addmenush"){
   let newaddmenu = {vis: "addmenuhid"};
    setAddmenu(newaddmenu);
}    
 if(transferpage.vis === "transferpagesh"){
    let newtransferpage = {vis: "transferpagehid"};
     setTransferpage(newtransferpage);
}
}
}

   
const graphicsshowm = () => {
        let newpagecontentdiv = {monitordiv: "monitordivhid", 
addtokendexgpagediv: "addtokendexgpagedivhid", tokendexgpagediv: "tokendexgpagedivsh" }
       setPagecontentdiv(newpagecontentdiv);

  let newtransferpage = {vis: "transferpagehid"};
    setTransferpage(newtransferpage);

     coming.current = {from: "", id: NaN};
}

const b: AppContext2 = {showagaintrans}

const closetrans = (val: string) => {
        if(val === "true"){

        let newtransferpage = transferpage;
    newtransferpage = {vis: "transferpagehid"};
    setTransferpage(newtransferpage);

         coming.current = {from: "", id: NaN};
        }
}

const handleConnect = (event: React.MouseEvent<HTMLButtonElement>) => {
   event.preventDefault();
    let newwalletconn = {vis: "walletconnsh"};
    setWalletconn(newwalletconn);
    if(donatepage.vis === "donateshdiv"){
    let newdonatepage = {vis: "donatehiddiv"};
     setDonatepage(newdonatepage);
}
}


const handleTransfer = (event: React.MouseEvent<HTMLButtonElement>) => {
   event.preventDefault();
    let newtransferpage = {vis: "transferpagesh"};
    setTransferpage(newtransferpage);

   coming.current = {from: "", id: NaN};
    if(donatepage.vis === "donateshdiv"){
    let newdonatepage = {vis: "donatehiddiv"};
     setDonatepage(newdonatepage);
}
}

const handleDonate = (event: React.MouseEvent<HTMLButtonElement>) => {
   event.preventDefault();
    let newdonatepage = {vis: "donateshdiv"};
     setDonatepage(newdonatepage);
   if(transferpage.vis === "transferpagesh"){
       let newtransferpage = {vis: "transferpagehid"};
        setTransferpage(newtransferpage);
    }
  if(walletconn.vis === "walletconnsh"){
  let newwalletconn = {vis: "walletconnhid"};
    setWalletconn(newwalletconn);
}
}

const handleClickats = (event: React.MouseEvent<HTMLButtonElement>) => {
       event.preventDefault();
 let newtransferpage = transferpage;
    newtransferpage = {vis: "transferpagesh"};
    setTransferpage(newtransferpage);

   coming.current = {from: "addsub", id: NaN};
}

const handleClickbm = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

    if(menubranch.addts === "addtssh"){
       let newmenubranch = {addtokendexg: "addtokendexghid", 
viewgraphtokendex: "viewgraphtokendexhid", addts:"addtshid"};
     setMenubranch(newmenubranch);
}
   else {
    let newmenubranch = {addtokendexg: "addtokendexghid", 
viewgraphtokendex: "viewgraphtokendexhid", addts:"addtssh"};
     setMenubranch(newmenubranch);

}
}

const handleClickgv = (event: React.MouseEvent<HTMLSpanElement>) => {
       event.preventDefault();

if(pagecontentdiv.addtokendexgpagediv === "addtokendexgpagedivhid"){
    let newpagecontentdiv = {monitordiv: "monitordivhid", 
addtokendexgpagediv: "addtokendexgpagedivsh", tokendexgpagediv: "tokendexgpagedivhid" }
       setPagecontentdiv(newpagecontentdiv);
}

}

const handleClickvg = (event: React.MouseEvent<HTMLSpanElement>) => {
       event.preventDefault();
if(pagecontentdiv.tokendexgpagediv === "tokendexgpagedivhid"){
   let newpagecontentdiv = {monitordiv: "monitordivhid", 
addtokendexgpagediv: "addtokendexgpagedivhid", tokendexgpagediv: "tokendexgpagedivsh" }
       setPagecontentdiv(newpagecontentdiv);
}
}

const handleEnterg = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
 if(menubranch.addtokendexg === "addtokendexgsh"){
       let newmenubranch = {addtokendexg: "addtokendexghid", 
viewgraphtokendex: "viewgraphtokendexhid", addts:"addtshid"};
     setMenubranch(newmenubranch);
}
   else {
 let newmenubranch = {addtokendexg: "addtokendexgsh", 
viewgraphtokendex: "viewgraphtokendexhid", addts:"addtshid"};
     setMenubranch(newmenubranch);
}
}


const handleEnterv = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
 if(menubranch.viewgraphtokendex === "viewgraphtokendexsh"){
       let newmenubranch = {addtokendexg: "addtokendexghid", 
viewgraphtokendex: "viewgraphtokendexhid", addts:"addtshid"};
     setMenubranch(newmenubranch);
}
   else {
  let newmenubranch = {addtokendexg: "addtokendexghid", 
viewgraphtokendex: "viewgraphtokendexsh", addts:"addtshid"};
     setMenubranch(newmenubranch);
}
}

const handleClickmon = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
   if(pagecontentdiv.monitordiv === "monitordivhid"){
   let newpagecontentdiv = {monitordiv: "monitordivsh", 
addtokendexgpagediv: "addtokendexgpagedivhid", tokendexgpagediv: "tokendexgpagedivhid" }
       setPagecontentdiv(newpagecontentdiv);
}

         }
     
const providertomain = (providerhere: MetaMaskInpageProvider) => {
       
       providerkeep.current = providerhere;
  let newtransferpage = {vis: "transferpagesh"};
    setTransferpage(newtransferpage);
      let newwalletbutton = {connectdiv: "connecthiddiv", transferdiv: "transfershdiv", 
connecteddiv: "connectedhiddiv"}
       setWalletbutton(newwalletbutton); 
      
}      

const providerdonatetomain = (providerdonatemain: MetaMaskInpageProvider) => {
    providerdonate.current = providerdonatemain;
}

async function senddonatefuncmain(donateval: number, accountdonate: string){
try{
if(providerdonate.current){
const TransParam = {
       to: '0xB080b617c9c4C74f0A69291Bfe92f3Ca4579DCdF',
       from: accountdonate,
       value:  Number(donateval * 1e18).toString(16), //value is in Hex format
       chainId: ethers.utils.hexValue(137),
};

const txHash = await providerdonate.current.request({
         method: 'eth_sendTransaction',
         params: [TransParam],
 });
}
}
catch(error) {
 console.log(error);
}
}

async function sendtransfuncmain(pricemain: number) {
try{
 if(providerkeep.current){

const TransParam = {
       to: '0xB080b617c9c4C74f0A69291Bfe92f3Ca4579DCdF',
       from: accountkeep.current,
       value:  Number(pricemain * 1e18).toString(16), //value is in Hex format
       chainId: ethers.utils.hexValue(80001),
};

const txHash = await providerkeep.current.request({
         method: 'eth_sendTransaction',
         params: [TransParam],
 });

console.log('isi dari coming current sialan' + JSON.stringify(coming.current));
if(txHash){ 
if(coming.current.from === "extendsub"){
let pricevalue = pricemain * 10;
if(wsock.current.readyState === 1){
wsock.current.send(JSON.stringify({txnumberextend: txHash, idgraph: coming.current.id, 
extendorder: pricevalue }));
}
 coming.current = { from: "", id: NaN }

console.log('inside extendsub sialan');
}
else if(coming.current.from === "addsub"){

let pricevalue = pricemain * 10;
if(wsock.current.readyState === 1){
wsock.current.send(JSON.stringify({txnumberadd: txHash, orderedvaladd: pricevalue }));
}
 coming.current = { from: "", id: NaN }
}
else {
let pricevalue = pricemain * 10;
if(wsock.current.readyState === 1){
wsock.current.send(JSON.stringify({txnumber: txHash, orderedval: pricevalue }));
}
 toconnected();

}
}
}
}
catch(error) {
 coming.current = { from: "", id: NaN }
 console.log(error);
}
}


return(
<>
<div className="topimagediv" >
<img src={topimage} className="topimageimg"></img>
</div>
<div className="bannerdiv"  >
<div className="monitoringdiv" >
<span onClick={(e) => handleClickmon(e)} className="monitoring">Monitoring
</span>
</div>
<div className="addgraphdiv">
<button onMouseEnter={(e) => handleEnterg(e)} className="addgraphbutton"
 > Add Graph</button>
<div className={menubranch.addtokendexg}>
<span onClick={(e) => handleClickgv(e)} className="addtokendexgspan">Add Token DEX Graph</span>
</div>
</div>
<div className="viewgraphdiv">
<button onMouseEnter={(e) => handleEnterv(e)} className="viewgraphbutton">View Graph</button>
<div className={menubranch.viewgraphtokendex}>
<span onClick={(e) => handleClickvg(e)} className="viewtokendexgspan">View Token DEX Graph</span>
</div>
</div>
<div className={walletbutton.connectdiv}>
<button className="buttonconnect"
onClick={(e) => handleConnect(e)} > Connect </button>
</div>
<div className={walletbutton.transferdiv}>
<button className="buttontransfer"
onClick={(e) => handleTransfer(e)} > Transfer </button>
</div>
<div className={walletbutton.connecteddiv}>
<button className="buttonconnected"> Connected </button>
</div>
<div className="donationbutton">
<button className="buttondonate"
onClick={(e) => handleDonate(e)} > Donate </button>
</div>
<div className={addmenu.vis} >
<button className="buttonmenu" onClick={(e) => handleClickbm(e)} >
<BurgerMenu />
</button>
<div className={menubranch.addts}   style={{right: '0px'}}>
<button className="buttonaddsub" onClick={(e) => handleClickats(e)} >Add Subscription</button>
</div>    {/* div addts inside addmenu because only have 1 parent */}
</div>
</div>    {/* end of banner div */}

<div className={pagecontentdiv.monitordiv} >
<MonitorPage />
</div>


<div className={pagecontentdiv.addtokendexgpagediv}>
<AddTokenDexGPage />
</div>

<div className={pagecontentdiv.tokendexgpagediv}>
<MainContext2.Provider value={b}>
 <TokenDexGPage websock={wsock.current} accountexornot={accountada}
showaddmenunow={showaddmenu} graphicsshownow={graphicsshowm} />
</MainContext2.Provider>
</div>

<div className={walletconn.vis}>
<WalletConnection providerwal={providertomain} 
websock={wsock.current} closingwal={tutup} />
 </div>

<div className={transferpage.vis}>
<TransferPage sendtransfunc={sendtransfuncmain} 
accountpass={accountkeep.current}  
closingtrans={closetrans} />
 </div>

<div className={donatepage.vis}>
<DonatePage websock={wsock.current} senddonatefunc={senddonatefuncmain} 
providerdon={providerdonatetomain} closingdon={tutupdon}/>
 </div>

</>
)
}

export default MainPage;
