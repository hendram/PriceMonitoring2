import React, {useRef, useState, ReactElement} from 'react';
import './TransferPage.css';

type props = {
accountpass: string;
// ethereumtrans: object;
closingtrans: Function;
}


const TransferPage : React.FC<props> = ({accountpass, closingtrans}: props): ReactElement => {
    
const fromaddress = useRef<HTMLInputElement>(null);
const toaddress = useRef<HTMLInputElement>(null);
const graphordered = useRef<HTMLInputElement>(null);
const [price, setPrice] = useState<number>(NaN);

const Changeprice = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if((graphordered.current !== null) && (graphordered.current.value)){
         let newprice = price;
             newprice = Math.floor(Number(graphordered.current.value));
             setPrice(newprice);
}
}

const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
     closingtrans("true");
}

const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
     
}

return(
<div className="divTransferPage">
     <div className="divrow1tp"> 
    <div className="fromspandivtp">   
     <span className="fromspantp"> From: </span>
   </div>
     <div className="frominputdivtp">
      <input type="text" ref={fromaddress} maxLength={20} className="fromaddresstxt"
 value={accountpass} readOnly/>
    </div>
</div>
<div className="divrow2tp" >
      <div className="tospandivtp">
      <span className="tospantp"> To: </span>
      </div>
      <div className="toinputdivtp">
     <input type="text" ref={toaddress} maxLength={20} className="toaddresstxt" 
  value='0x42B1765F1C41024ee66E5ef9fA73d9963B23761A' readOnly/>
      </div>
</div>
<div className="divrow3tp">
      <div className="graphspandivtp">
      <span className="graphspantp"> Number of Graph ordered: </span>
      </div>
      <div className="graphinputdivtp">
       <input type="text" ref={graphordered} maxLength={5} className="graphorderedtxt"
  onChange={(e) => Changeprice(e)} />
       </div>
       <div className="pricespandivtp" >
       <span className="pricespantp">Price: </span>
       </div>
       <div className="priceinputdivtp" >
        <input type="text" value={price} maxLength={5} className="pricetxt" readOnly
 />
        </div>
</div>
<div className="divrow4tp">
       <div className="buttoncanceldivtp">
        <button className="buttoncanceltp" onClick={(e) =>
handleCancel(e)} >Cancel</button>
        </div>
       <div className="buttonsubmitdivtp">
          <button className="buttonsubmittp" onClick={(e) =>
handleSubmit(e)} >Submit</button>
        </div>
</div>
</div>
);
}

export default TransferPage;
