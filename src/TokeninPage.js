import React, {useState, useRef, useEffect} from 'react';
import TokenPage from './TokenPage';
import Tokeninputask from './Tokeninputask';
import './TokeninPage.css';

const TokeninPage = (props) => {

const [arrTokenpage, setArrTokenpage] = useState([]);   
const [arrdatatoken, setArrdatatoken] = useState([]);
const [ticketings, setTicketings] = useState([]);
const [number, setNumber] = useState();


const eachtokendata = (input) => {
   setArrdatatoken(arrdatatoken => [...arrdatatoken, input]);
}

let divtokeninpage = "";

console.log("arrdatatoken" + arrdatatoken.length);

const [tokeninputaskvis, setTokeninputaskvis] = useState("tokeninputasksh");


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
       
        let newnumber = number;
          newnumber = "";
         setNumber(newnumber);
}

console.log('nomor numbernya' + number);

if(arrTokenpage.length === 0 && arrdatatoken.length !== 0){
   props.provdatprop(arrdatatoken);
   let arrdatatokennew = [...arrdatatoken];
    arrdatatokennew.length = 0;
    setArrdatatoken(arrdatatokennew);
}

useEffect(() => { stupidreact() }, [number]);

const handleClick = (valuenumber) => {

       for(let x = 0; x < valuenumber; x++){
        setTicketings(ticketings => [...ticketings, x]);
        setArrTokenpage(arrTokenpage => 
[...arrTokenpage,<div key={x} ><TokenPage id={x} eachtoken={eachtokendata} 
numberlist={numlist} /><br></br> </div>]);
         }

       let newtokeninputaskvis = tokeninputaskvis;
             newtokeninputaskvis = "tokeninputaskhid";
        setTokeninputaskvis(newtokeninputaskvis);

}

useEffect(() => {
if(props.addprop === "yes"){
   divtokeninpage = "tokeninpagetop";
    let newtokeninputaskvis = tokeninputaskvis;
             newtokeninputaskvis = "tokeninputasksh";
        setTokeninputaskvis(newtokeninputaskvis);
   
}
else if(props.addprop === "no") {
   divtokeninpage ="tokeninpagebottom";
}
}, [props.addprop]);


return(
<div className={divtokeninpage}>
  <div className={tokeninputaskvis}>
 <Tokeninputask 
handleClicking={handleClick}  passtokinput={props.addprop} />
  </div>
   <div>
   {arrTokenpage}
   </div>
</div>
)
}

export default TokeninPage;

