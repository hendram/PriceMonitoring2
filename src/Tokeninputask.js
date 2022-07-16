import React, {useRef} from 'react';
import './Tokeninputask.css';

let namaclass = "";

const Tokeninputask = (props) => {

const tokenin = useRef(null);

const handleClick = (event) => {
   event.preventDefault();
   if(tokenin.current.value !== 0){
   props.handleClicking(tokenin.current.value);
}
}

if(props.passtokinput === "yes"){
namaclass="divcontainertop" }
else if(props.passtokinput === "no"){
namaclass="divcontainerbottom" }

return(
<>
<div width="auto" height="auto" className={namaclass}>
<div className="divtable" >

<div className="toprow">
<span className="tokenqlabel">How many Token to monitor ?</span></div>

 <div className="divcelltext">
 <input className="tokenqinput" type="text" size="13" ref={tokenin} /> 
</div>
 <div className="divcellsubmit">  <button className="buttontoksubmit"  
type="button" size="10" onClick={(e) => handleClick(e)}>
    Submit</button>
</div>
</div>
</div>
</>

)
}

export default Tokeninputask;


