import React, {useState, useRef, useEffect, createContext} from 'react';
import WalletConnection from './WalletConnection';
import GraphicsView from './GraphicsView';
import MonitorView from './MonitorView';
import Singletonws from './Singletonws';
import TransferPage from './TransferPage';
import topimage from './images/topimage.png';
import './MainPage.css';
import { MetaMaskInpageProvider } from '@metamask/providers';
import {ethers} from 'ethers';

interface AppContext1  {
accountada: Function;
}

interface AppContext2  {
showagaintrans: Function;
}

interface AppContext3  {
showaddmenu: Function;
}

interface AppContext4 {
graphicsshowm: Function;
}

type comingobject = {
from: string;
id: number;
}

export const MainContext1 = React.createContext<AppContext1 | null>(null);
export const MainContext2 = React.createContext<AppContext2 | null>(null);
export const MainContext3 = React.createContext<AppContext3 | null>(null);
export const MainContext4 = React.createContext<AppContext4 | null>(null);

const MainPage = () => {

// using useRef for Websocket singleton will makes more controllabel and
// predictable when new instance need it
const wsock = useRef<WebSocket>(Singletonws.getInstance());

const [walletconn, setWalletconn] = useState({vis: "walletconnhid"});
const [transferpage, setTransferpage] = useState({vis: "transferpagehid"});
const [addmenu, setAddmenu] = useState({vis: "addmenuhid"});
const [addts, setAddts] = useState({vis: "addtshid"});

const [graphicsviewdiv, setGraphicsviewdiv] = useState({
togglegv: "graphicsviewhid", yesno: "no", formember: "no"});
const [monitorviewdiv, setMonitorviewdiv] = useState({
togglemon: "monitorviewsh" });
const [walletbutton, setWalletbutton] = useState({
connectdiv: "connectshdiv", transferdiv: "transferhiddiv", connecteddiv: "connectedhiddiv" });
const accountkeep = useRef<string>("");
const balancekeep = useRef<string>("");
const providerkeep = useRef<MetaMaskInpageProvider | null>(null);
const topdiv = useRef<HTMLDivElement>(null);
const bannerdiv = useRef<HTMLDivElement>(null);
const [addsubdiv, setAddsubdiv]  = useState<string>("");
const coming = useRef<comingobject>({from: "", id: NaN});

//const ethereum = window.ethereum as MetaMaskInpageProvider;

      wsock.current.onopen = () => {
}

window.addEventListener('unload', function(event){
          wsock.current.onclose = () => { } 
   });

 
const addginit = (initval: string) => {
          if(initval === "yes"){
       let newgraphicsviewdiv = {togglegv: "graphicsviewsh", yesno: "no", formember: "no"};
            setGraphicsviewdiv(newgraphicsviewdiv);

}
}


const tutup = (val: string) => {
        if(val === "true"){
        let newwalletconn = walletconn;
    newwalletconn = {vis: "walletconnhid"};
    setWalletconn(newwalletconn);
        }
}

function toconnected(){
        let newtransferpage = transferpage;
    newtransferpage = {vis: "transferpagehid"};
    setTransferpage(newtransferpage);

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

useEffect(() => {
     if((topdiv.current !== null) && (bannerdiv.current !== null)){
     let newaddsubdiv = addsubdiv;
         newaddsubdiv = (topdiv.current.clientHeight + 
bannerdiv.current.clientHeight).toString() + 'px';
         
     setAddsubdiv(newaddsubdiv);

console.log('topdiv ne' + topdiv.current.clientHeight);
console.log('bannerdiv ne' + bannerdiv.current.clientHeight);

}}, [bannerdiv]);

console.log('addsubdiv ne' + addsubdiv);

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
    let newgraphicsviewdiv = { togglegv: "graphicsviewsh", yesno: "no", formember: "yes"}
         setGraphicsviewdiv(newgraphicsviewdiv);
 let newmonitorviewdiv = {togglemon: "monitorviewhid"};   
    setMonitorviewdiv(newmonitorviewdiv);
}

const a: AppContext1 = { accountada }
const b: AppContext2 = {showagaintrans}
const c: AppContext3 = {showaddmenu }
const d: AppContext4 = {graphicsshowm}

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
   let newwalletconn = walletconn;
    newwalletconn = {vis: "walletconnsh"};
    setWalletconn(newwalletconn);
}


const handleTransfer = (event: React.MouseEvent<HTMLButtonElement>) => {
   event.preventDefault();
   let newtransferpage = transferpage;
    newtransferpage = {vis: "transferpagesh"};
    setTransferpage(newtransferpage);

   coming.current = {from: "", id: NaN};
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
    if(addts.vis === "addtssh"){
   let newaddts = addts;
     newaddts = {vis: "addtshid"};
     setAddts(newaddts);
}
   else {
   let newaddts = addts;
     newaddts = {vis: "addtssh"};
     setAddts(newaddts);
}
}

const handleClickgv = (event: React.MouseEvent<HTMLSpanElement>) => {
       event.preventDefault();

       if(graphicsviewdiv.togglegv === "graphicsviewhid"){
     let newgraphicsviewdiv = {togglegv: "graphicsviewsh", yesno: "no", 
formember: "no"};
            setGraphicsviewdiv(newgraphicsviewdiv);
 let newmonitorviewdiv = {togglemon: "monitorviewhid"};   
    setMonitorviewdiv(newmonitorviewdiv);

         }

       if(graphicsviewdiv.togglegv === "graphicsviewsh"){
   let newgraphicsviewdiv = {togglegv: "graphicsviewsh", yesno: "yes",
 formember: "no"};
            setGraphicsviewdiv(newgraphicsviewdiv);
}
}

const handleClickmon = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    let newmonitorviewdiv = {togglemon: "monitorviewsh"};   
    setMonitorviewdiv(newmonitorviewdiv);

 let newgraphicsviewdiv = {togglegv: "graphicsviewhid", yesno: "no", formember: "no"};
            setGraphicsviewdiv(newgraphicsviewdiv);
         }
     
const providertomain = (providerhere: MetaMaskInpageProvider) => {
       
       providerkeep.current = providerhere;
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
wsock.current.send(JSON.stringify({txnumberextend: txHash, idgraph: coming.current.id, extendorder: pricevalue }));
 coming.current = { from: "", id: NaN }

console.log('inside extendsub sialan');
}
else if(coming.current.from === "addsub"){

let pricevalue = pricemain * 10;
wsock.current.send(JSON.stringify({txnumberadd: txHash, orderedvaladd: pricevalue, currenttimestadd:Date.now() }));
 coming.current = { from: "", id: NaN }
}
else {
let pricevalue = pricemain * 10;
wsock.current.send(JSON.stringify({txnumber: txHash, orderedval: pricevalue, currenttimest:Date.now() }));
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
<div className="topimagediv" ref={topdiv}>
<img src={topimage} className="topimageimg"></img>
</div>
<div className="bannerdiv" ref={bannerdiv}>
<div className="monitoringdiv">
<span onClick={(e) => handleClickmon(e)} className="monitoring">Monitoring
</span>
</div>
<div className="addgraphdiv">
<span onClick={(e) => handleClickgv(e)} className="addgraph">Add Graph</span>
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
<div className={addmenu.vis} >
<button className="buttonmenu" onClick={(e) => handleClickbm(e)} >&#926;</button>
<div className={addts.vis}   style={{top: addsubdiv, right: '0px'}}>
<button className="buttonaddsub" onClick={(e) => handleClickats(e)} >Add Subscription</button>
</div>    {/* div addts inside addmenu because only have 1 parent */}
</div>
</div>    {/* end of banner div */}

<div className={monitorviewdiv.togglemon} >
<MonitorView />
</div>

<div className={graphicsviewdiv.togglegv}>
<MainContext1.Provider value={a} >
<MainContext2.Provider value={b} >
<MainContext3.Provider value={c} >
<MainContext4.Provider value={d} >
<GraphicsView wss={wsock.current} addg={graphicsviewdiv.yesno} returnback={addginit} 
initmember={graphicsviewdiv.formember}/>
</MainContext4.Provider>
</MainContext3.Provider>
</MainContext2.Provider>
</MainContext1.Provider>
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


</>
)
}

export default MainPage;
