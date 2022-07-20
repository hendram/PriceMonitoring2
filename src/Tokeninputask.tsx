import React, {useRef, ReactElement} from 'react';
import './Tokeninputask.css';

let namaclass = "";

type props = {
 handleClicking: Function;
 passtokinput:  string;
}

const Tokeninputask: React.FC<props> = ({handleClicking, passtokinput}, props):
ReactElement => {

const tokenin = useRef<HTMLInputElement>(null);

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
   event.preventDefault();
   if((tokenin.current !== null) && (Number(tokenin.current.value) !== 0)){
   handleClicking(tokenin.current.value);
}
}

if(passtokinput === "yes"){
namaclass="divcontainertop" }
else if(passtokinput === "no"){
namaclass="divcontainerbottom" }

return(
<>
<div className={namaclass}>
<div className="divtable" >

<div className="toprow">
<span className="tokenqlabel">How many Token to monitor ?</span></div>

 <div className="divcelltext">
 <input className="tokenqinput" type="text" size={13} ref={tokenin} /> 
</div>
 <div className="divcellsubmit">  <button className="buttontoksubmit"  
type="button" onClick={(e) => handleClick(e)}>
    Submit</button>
</div>
</div>
</div>
</>

)
}

export default Tokeninputask;


