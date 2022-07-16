import React from 'react';
import './Closingbutton.css';

const Closingbutton = (props) => {
  
const handleClick = (event) => {
   event.preventDefault();
   props.delme(props.id);
}

return(
   <div className="toprightdiv">
<button size="10" className="buttonsmall" onClick={(e) => handleClick(e)}>
x</button>
   </div>
)
}

export default Closingbutton;
