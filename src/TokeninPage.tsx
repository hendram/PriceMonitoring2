import React, {useState, useRef, useEffect, ReactElement} from 'react';
import TokenPage from './TokenPage';
import Tokeninputask from './Tokeninputask';
import './TokeninPage.css';

type props = {
   provdatprop: Function;
   addprop: string
}

type Listdatain = {
chain: string;
dex: string;
pricein: string;
tokenname1: string;
tokenaddress1: string;
digittoken1: string;
tokenname2: string;
tokenaddress2: string;
digittoken2: string;
milisecondselapse: number;
currentts: number;
ntimes: number;
}



const TokeninPage: React.FC<props> = ({provdatprop, addprop,}: props): 
ReactElement => {

const [arrTokenpage, setArrTokenpage] = useState<JSX.Element[]>([]);   
const [arrdatatoken, setArrdatatoken] = useState<Array<Listdatain>>([]);
const [ticketings, setTicketings] = useState<number[]>([]);
const [number, setNumber] = useState<number>(NaN);


const eachtokendata = (input: Listdatain) => {
   setArrdatatoken(arrdatatoken => [...arrdatatoken, input]);
}

let divtokeninpage = "";

console.log("arrdatatoken" + arrdatatoken.length);

const [tokeninputaskvis, setTokeninputaskvis] = useState("tokeninputasksh");


const numlist = (num: number) => {

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
          newnumber = NaN;
         setNumber(newnumber);
}

console.log('nomor numbernya' + number);

if(arrTokenpage.length === 0 && arrdatatoken.length !== 0){
   provdatprop(arrdatatoken);
   let arrdatatokennew = [...arrdatatoken];
    arrdatatokennew.length = 0;
    setArrdatatoken(arrdatatokennew);
}

useEffect(() => { stupidreact() }, [number]);

const handleClick = (valuenumber: number) => {

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
if(addprop === "yes"){
   divtokeninpage = "tokeninpagetop";
    let newtokeninputaskvis = tokeninputaskvis;
             newtokeninputaskvis = "tokeninputasksh";
        setTokeninputaskvis(newtokeninputaskvis);
   
}
else if(addprop === "no") {
   divtokeninpage ="tokeninpagebottom";
}
}, [addprop]);


return(
<div className={divtokeninpage}>
  <div className={tokeninputaskvis}>
 <Tokeninputask 
handleClicking={handleClick}  passtokinput={addprop} />
  </div>
   <div>
   {arrTokenpage}
   </div>
</div>
)
}

export default TokeninPage;

