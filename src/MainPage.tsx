import React, {useState} from 'react';
import WalletConnection from './WalletConnection';
import GraphicsView from './GraphicsView';
import MonitorView from './MonitorView';
import topimage from './images/topimage.png';
import './MainPage.css';

const MainPage = () => {

const [walletconn, setWalletconn] = useState({vis: "walletconnhid"});
const [graphicsviewdiv, setGraphicsviewdiv] = useState({
togglegv: "graphicsviewhid", yesno: "no"});
const [monitorviewdiv, setMonitorviewdiv] = useState({
togglemon: "monitorviewsh" });

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

const handleConnect = (event: React.MouseEvent<HTMLButtonElement>) => {
   event.preventDefault();
   let newwalletconn = walletconn;
    newwalletconn = {vis: "walletconnsh"};
    setWalletconn(newwalletconn);
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
<div className="buttonconnectdiv">
<button className="buttonconnect"
onClick={(e) => handleConnect(e)} > Connect </button>
</div>
</div>
<div className={monitorviewdiv.togglemon} >
<MonitorView />
</div>
<div className={graphicsviewdiv.togglegv}>
<GraphicsView addg={graphicsviewdiv.yesno} returnback={addginit}/>
</div>
<div className={walletconn.vis}>
<WalletConnection closingwal={tutup} />
 </div>
</>
)
}

export default MainPage;
