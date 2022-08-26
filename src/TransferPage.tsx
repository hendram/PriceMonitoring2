import React, {useRef, useState, ReactElement} from 'react';
import './TransferPage.css';

type props = {
accountpass: string;
closingtrans: Function;
sendtransfunc: Function;
}


const TransferPage : React.FC<props> = ({accountpass, 
closingtrans, sendtransfunc}: props): ReactElement => {

const graphordered = useRef<HTMLInputElement>(null);
const [price, setPrice] = useState<number>(NaN);

const Changeprice = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if((graphordered.current !== null) && (graphordered.current.value)){
         let newprice = price;
             newprice = (Number(graphordered.current.value)/10);
             setPrice(newprice);
}
}

const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
     closingtrans("true");
}

const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
       sendtransfunc(price);     
}

return(
<div className="divTransferPage">
     <div className="divrow1tp"> 
    <div className="fromspandivtp">   
     <span className="fromspantp"> From: </span>
   </div>
     <div className="frominputdivtp">
      <input type="text" maxLength={30} className="fromaddresstxt"
 value={accountpass} readOnly/>
    </div>
</div>
<div className="divrow2tp" >
      <div className="tospandivtp">
      <span className="tospantp"> To: </span>
      </div>
      <div className="toinputdivtp">
     <input type="text" maxLength={30} className="toaddresstxt" 
  value='0xB080b617c9c4C74f0A69291Bfe92f3Ca4579DCdF' readOnly/>
      </div>
</div>
<div className="divrow3tp">
      <div className="graphspandivtp">
      <span className="graphspantp"> Graph: </span>
      </div>
      <div className="graphinputdivtp">
       <input type="text" ref={graphordered} maxLength={3} className="graphorderedtxt"
  onChange={(e) => Changeprice(e)} />
       </div>
       <div className="pricespandivtp" >
       <span className="pricespantp">Price: </span>
       </div>
       <div className="priceinputdivtp" >
        <input type="text" value={price} maxLength={3} className="pricetxt" readOnly
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
