import React from 'react';

const BurgerMenu: React.FC<{}> = props => {


return(
<div>
<svg height={20} width={25}>
  <line x1={5} y1={5} x2={20} y2={5} style={{stroke: 'rgb(255,0,0)', width:'3'}} />
  <line x1={5} y1={10} x2={20} y2={10} style={{stroke: 'rgb(255,0,0)', width:'3'}} />
   <line x1={5} y1={15} x2={20} y2={15} style={{stroke: 'rgb(255,0,0)', width:'3'}} />
  Sorry, your browser does not support inline SVG.
</svg>
</div>
);

} 

export default BurgerMenu;
