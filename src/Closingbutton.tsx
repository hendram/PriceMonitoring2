import React, {ReactElement} from 'react';
import './Closingbutton.css';

type props = {
  close: Function;
}

const Closingbutton:React.FC<props> = ({close,}: props):
ReactElement => {
  
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
   event.preventDefault();
   close("true");
}

return(
   <div className="toprightclosediv">
<button className="buttonsmallclose" onClick={(e) => handleClick(e)}>
x</button>
   </div>
)
}

export default Closingbutton;
