import React from 'react';
import './MonitorPage.css';
import Swap from './images/Swap.png';


const MonitorPage = () => {


return(
<div className="monitorpagediv">
<div className="swapimagediv">
<img src={Swap} className="swapimage"></img>
</div>
<div className="swapdiv">
<div className="titleswapdiv">
<span className="titleswapspan">
Why DEX Token Price Monitor ?
</span>
</div>
<div className="contentswapdiv">
<span className="contentswapspan">
DEX token price monitor brings benefit for users who wants to know if their 
assets now in profit position. Holding tens to hundreds of different tokens
will makes taking profit so challenges. Token price monitor can be use to 
see price movement directly from Dexes too where users token accepted to swap
on that platform. This makes price realtime and guarantee can be traded. Some
new breed and profitable tokens which still doesn't have their token name 
searchable on dexes can be monitored too.
</span>
</div>
</div>
</div>
)
}

export default MonitorPage;
