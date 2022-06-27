import React, {useState, useRef, useEffect} from 'react';
import TokenPage from './TokenPage';

const TokeninPage = (props) => {

const [arrTokenpage, setArrTokenpage] = useState([]);   
const [arrdatatoken, setArrdatatoken] = useState([]);
const [ticketings, setTicketings] = useState([]);
const [number, setNumber] = useState();
const tokenin = useRef(null);

const eachtokendata = (input) => {
   setArrdatatoken(arrdatatoken => [...arrdatatoken, input]);
}

console.log("arrdatatoken" + arrdatatoken.length);



const numlist = (num) => {

let numnya = number;
    numnya = num;
setNumber(numnya);
}

function stupidreact() {
  
    let indexnya = ticketings.indexOf(number); 

  setTicketings((ticketings) => 
ticketings.filter((i) => i !== number));
    
       setArrTokenpage((arrTokenpage) => arrTokenpage.filter((i) => 
arrTokenpage.indexOf(i) !== indexnya)); 

}





if(arrTokenpage.length === 0 && arrdatatoken.length !== 0){
   props.provdatprop(arrdatatoken);
   let arrdatatokennew = [...arrdatatoken];
    arrdatatokennew.length = 0;
    setArrdatatoken(arrdatatokennew);
}

useEffect(() => { stupidreact() }, [number]);

const handleClick = (event) => {
          event.preventDefault();

     if(tokenin.current.value){
    console.log(tokenin.current.value);
     for(let x = 0; x < tokenin.current.value; x++){
        setTicketings(ticketings => [...ticketings, x]);
        setArrTokenpage(arrTokenpage => 
[...arrTokenpage,<div key={x} ><TokenPage id={x} eachtoken={eachtokendata} 
numberlist={numlist} /><br></br> </div>]);
         }
}
}


return(
<>
   <label>How many Token to monitor ?</label>
   <input type="text" size="5" ref={tokenin} /> 
   <button type="button" size="10" onClick={(e) => handleClick(e)}>
    Submit</button>
   
   {arrTokenpage}
</>
)
}

export default TokeninPage;

