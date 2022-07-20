import React, {useState} from 'react';
import WalletConnection from './WalletConnection.js';
import GraphicsView from './GraphicsView.js';
import MonitorView from './MonitorView.js';
import './MainPage.css';

const MainPage = () => {

const [walletconn, setWalletconn] = useState({vis: "walletconnhid"});
const [graphicsviewdiv, setGraphicsviewdiv] = useState({
togglegv: "graphicsviewhid", yesno: "no"});
const [monitorviewdiv, setMonitorviewdiv] = useState({
togglemon: "monitorviewsh" });

const addginit = (initval) => {
          if(initval === "yes"){
       let newgraphicsviewdiv = {togglegv: "graphicsviewsh", yesno: "no"};
            setGraphicsviewdiv(newgraphicsviewdiv);

}
}

const handleConnect = (event) => {
   event.preventDefault();
   let newwalletconn = walletconn;
    newwalletconn = {vis: "walletconnsh"};
    setWalletconn(newwalletconn);
}

const handleClickgv = (event) => {
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

const handleClickmon = (event) => {
    event.preventDefault();
    let newmonitorviewdiv = {togglemon: "monitorviewsh"};   
    setMonitorviewdiv(newmonitorviewdiv);

 let newgraphicsviewdiv = {togglegv: "graphicsviewhid", yesno: "no"};
            setGraphicsviewdiv(newgraphicsviewdiv);
         }
     

return(
<>
<div className="bannerdiv">
<span onClick={(e) => handleClickmon(e)} className="monitoring">Monitoring
</span>
<span onClick={(e) => handleClickgv(e)} className="addgraph">Add Graph</span>

<button size="30" className="buttonconnect"
onClick={(e) => handleConnect(e)} > Connect </button>

</div>
<div className={monitorviewdiv.togglemon} >
<MonitorView />
</div>
<div className={graphicsviewdiv.togglegv}>
<GraphicsView addg={graphicsviewdiv.yesno} returnback={addginit}/>
</div>
<div className={walletconn.vis}>
<WalletConnection />
 </div>
</>
)
}

export default MainPage;
