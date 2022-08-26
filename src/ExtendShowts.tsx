import  React, {ReactElement, useState, useEffect, useContext } from 'react';
import './ExtendShowts.css';
import { MainContext2 } from './MainPage';

type props = {
 dataextend: string;
 id: number;
 showcurrent: Function;
 delme: Function;
}

const ExtendShowts:React.FC<props> = ({dataextend, id, showcurrent, delme}: props):ReactElement => {

const [extendtsdiv, setExtendtsdiv] = useState({vis: "extendtsdivhid"});
const [shextsdiv, setShextsdiv] = useState({vis: "shextsdivhid" });
const b = useContext(MainContext2);


// dataextend will be use to show or hide menu before closingmenu
useEffect(() => {
if(dataextend && (dataextend !== "")){
      let newextendtsdiv = extendtsdiv;
        newextendtsdiv = {vis: "extendtsdivsh"};
    setExtendtsdiv(newextendtsdiv);
}}, [dataextend] );

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

     let newshextsdiv = shextsdiv;
       if(newshextsdiv.vis === "shextsdivsh"){
        newshextsdiv = ({vis: "shextsdivhid" });
          }
       else{
        newshextsdiv = ({vis: "shextsdivsh" });
}     
setShextsdiv(newshextsdiv);
  showcurrent(id, "musthide");
}


const handleClicksh = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
     showcurrent(id, "");
}

const handleClickex = (event: React.MouseEvent<HTMLButtonElement>) => {
     event.preventDefault();

     if(b && (typeof b === "object")){
     b.showagaintrans(id);         
}
}

const handleClickclose = (event: React.MouseEvent<HTMLButtonElement>) => {
   event.preventDefault();
   delme(id);
}

return(
<>
<div className="toprightdiv">
<div className={extendtsdiv.vis}>
 <button className="buttonextendshow" onClick={(e) => handleClick(e)} >&#187;</button>
</div>

<div className="buttonsmalldiv">
<button className="buttonsmallclose" onClick={(e) => handleClickclose(e)}>
x</button>
   </div>
</div>
<div className={shextsdiv.vis}>
<div className="showtsdiv">
<button className="showtsbutton" onClick={(e) => handleClicksh(e)} > Show Subscription </button>
</div>
    <div className="extendtsdiv">
<button className="extendtsbutton" onClick={(e) => handleClickex(e)} > Extend Subscription </button>
    </div>
</div>

</>
);
}

export default ExtendShowts;
