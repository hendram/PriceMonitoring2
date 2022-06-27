import React, {useRef, useState} from 'react';
import './TokenPage.css';

const TokenPage = (props) => {

const chain = useRef();
const dex = useRef();
const pricein = useRef();

const tokenname1 = useRef();     
const tokenaddress1 = useRef();
const digittoken1 = useRef();

const tokenname2 = useRef();
const tokenaddress2 = useRef();
const digittoken2 = useRef();

const handleCancel = (event) => {
       event.preventDefault();
console.log(props.id);

props.numberlist(props.id);
}

const handleSubmit = (event) => {
     event.preventDefault();

if(pricein.current.value && tokenname1.current.value && 
tokenaddress1.current.value && digittoken1.current.value &&
tokenname2.current.value && 
tokenaddress2.current.value && digittoken2.current.value)
{

     let dataToken = {
chain: chain.current.value, 
dex: dex.current.value,
pricein: pricein.current.value, 
tokenname1: tokenname1.current.value,
tokenaddress1: tokenaddress1.current.value, 
digittoken1: digittoken1.current.value,
tokenname2: tokenname2.current.value,
tokenaddress2: tokenaddress2.current.value, 
digittoken2: digittoken2.current.value,
}


console.log("dataToken" + dataToken);
props.eachtoken(dataToken);
props.numberlist(props.id);

}
}


return(
<div className="divTokenpage">
<label className="labeling">chain:</label>
<select ref={chain} >
<option>polygon</option>
<option>bsc</option>
</select>

<label className="labeling">dex:</label>
<select ref={dex} >
<option>quickswap</option>
<option>pancakeswap</option>
</select>
<br></br>
<label className="labeling">pricein:</label>
<input type="text" size="20" ref={pricein} />
<br></br>
<label className="labeling">tokenname1:</label>
<input type="text" size="20" ref={tokenname1} />
<label className="labeling">tokenaddress1:</label>
<input type="text" size="40" ref={tokenaddress1} />
<label className="labeling">digittoken1:</label>
<input type="text" size="3" ref={digittoken1} />
<br></br>
<label className="labeling">tokenname2:</label>
<input type="text" size="20" ref={tokenname2} />
<label className="labeling">tokenaddress2:</label>
<input type="text" size="40" ref={tokenaddress2} />
<label className="labeling">digittoken2:</label>
<input type="text" size="3" ref={digittoken2} />
<br></br>
<button className="buttoncancel" size="10" onClick={(e) => handleCancel(e)}>Cancel</button>
<button className="buttonsubmit" size="10" onClick={(e) => handleSubmit(e)}>Submit</button>

</div>
)
}

export default TokenPage;
