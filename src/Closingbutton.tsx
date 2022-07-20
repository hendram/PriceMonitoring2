import React, {ReactElement} from 'react';
import './Closingbutton.css';

type props = {
   delme: Function;
   id: number;
}

const Closingbutton:React.FC<props> = ({delme, id,}: props):
ReactElement => {
  
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
   event.preventDefault();
   delme(id);
}

return(
   <div className="toprightdiv">
<button className="buttonsmall" onClick={(e) => handleClick(e)}>
x</button>
   </div>
)
}

export default Closingbutton;
