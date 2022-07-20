import React, {ReactElement} from 'react';
import './Closingbuttonwal.css';

type props = {
  closewal: Function;
}

const Closingbutton:React.FC<props> = ({closewal,}: props):
ReactElement => {
  
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
   event.preventDefault();
   closewal("true");
}

return(
   <div className="toprightclosewaldiv">
<button className="buttonsmallclosewal" onClick={(e) => handleClick(e)}>
x</button>
   </div>
)
}

export default Closingbutton;
