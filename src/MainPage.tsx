import React, {useState, useRef} from 'react';
import WalletConnection from './WalletConnection';
import GraphicsView from './GraphicsView';
import MonitorView from './MonitorView';
import Singletonws from './Singletonws';
import TransferPage from './TransferPage';
import topimage from './images/topimage.png';
import { MetaMaskInpageProvider } from '@metamask/providers';
import './MainPage.css';
import { useAppDispatch, useAppSelector } from './hook/hooks'
import { accountinit } from './reduxslice/accountslice'

const MainPage = () => {

// using useRef for Websocket singleton will makes more controllabel and
// predictable when new instance need it
const wsock = useRef<WebSocket>(Singletonws.getInstance());
const accountkeep = useRef<string>("");
const balancekeep = useRef<number>(NaN);

const [walletconn, setWalletconn] = useState({vis: "walletconnhid"});
const [transferpage, setTransferpage] = useState({vis: "transferpagehid" });
const [graphicsviewdiv, setGraphicsviewdiv] = useState({
togglegv: "graphicsviewhid", yesno: "no"});
const [monitorviewdiv, setMonitorviewdiv] = useState({
togglemon: "monitorviewsh" });
const [walletbutton, setWalletbutton] = useState({
connectdiv: "connectshdiv", transferdiv: "transferhiddiv" });
const [providermain, setProvidermain] = useState<MetaMaskInpageProvider | undefined>();
const accountada = useAppSelector(state => state.accountnya.value);
const dispatch = useAppDispatch();

//const ethereum = window.ethereum as MetaMaskInpageProvider;

      wsock.current.onopen = () => {
}

window.addEventListener('unload', function(event){
        let message = {deleteall: "windowclose"};
          wsock.current.send(JSON.stringify(message));
   });

 
const addginit = (initval: string) => {
          if(initval === "yes"){
       let newgraphicsviewdiv = {togglegv: "graphicsviewsh", yesno: "no"};
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

if(accountada === "false"){
   dispatch(accountinit());

   console.log('nilai dari balance' + balancekeep.current);
 
   if(balancekeep.current < 0.1){
   tutup("true");
        alert('Sorry not enough MATIC in your wallet');
   }
    else if(balancekeep.current >= 0.1){
        tutup("true");
    let newwalletbutton = walletbutton;
        newwalletbutton = {connectdiv: "connecthiddiv", transferdiv: "transfershdiv"}
       setWalletbutton(newwalletbutton); 
   }
}

const balance = (balanceval: string) => {
    balancekeep.current = +balanceval;
}

const account = (accountval: string) => {
     accountkeep.current = accountval;
}

const closetrans = (val: string) => {
        if(val === "true"){
        let newtransferpage = transferpage;
    newtransferpage = {vis: "transferpagehid"};
    setTransferpage(newtransferpage);
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
}

const handleClickgv = (event: React.MouseEvent<HTMLSpanElement>) => {
       event.preventDefault();

       if(graphicsviewdiv.togglegv === "graphicsviewhid"){
     let newgraphicsviewdiv = {togglegv: "graphicsviewsh", yesno: "no"};
            setGraphicsviewdiv(newgraphicsviewdiv);
 let newmonitorviewdiv = {togglemon: "monitorviewhid"};   
    setMonitorviewdiv(newmonitorviewdiv);

         }

       if(graphicsviewdiv.togglegv === "graphicsviewsh"){
   let newgraphicsviewdiv = {togglegv: "graphicsviewsh", yesno: "yes"};
            setGraphicsviewdiv(newgraphicsviewdiv);
}
}

const handleClickmon = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    let newmonitorviewdiv = {togglemon: "monitorviewsh"};   
    setMonitorviewdiv(newmonitorviewdiv);

 let newgraphicsviewdiv = {togglegv: "graphicsviewhid", yesno: "no"};
            setGraphicsviewdiv(newgraphicsviewdiv);
         }
     
const providertomain = (providerhere: MetaMaskInpageProvider) => {
         let newprovidermain = providermain;
               newprovidermain = providerhere;
            setProvidermain(newprovidermain);
}      

return(
<>
<div className="topimagediv">
<img src={topimage} className="topimageimg"></img>
</div>
<div className="bannerdiv">
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
</div>
<div className={monitorviewdiv.togglemon} >
<MonitorView />
</div>
<div className={graphicsviewdiv.togglegv}>
<GraphicsView wss={wsock.current} addg={graphicsviewdiv.yesno} returnback={addginit}/>
</div>
<div className={walletconn.vis}>
<WalletConnection balancewal={balance} accountwal={account}  providerwal={providertomain} 
websock={wsock.current} closingwal={tutup} />
 </div>
<div className={transferpage.vis}>
<TransferPage 
accountpass={accountkeep.current} closingtrans={closetrans} />
 </div>
</>
)
}

export default MainPage;
