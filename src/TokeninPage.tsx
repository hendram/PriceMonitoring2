import React, {useState, useRef, useEffect, ReactElement} from 'react';
import TokenPage from './TokenPage';
import Tokeninputask from './Tokeninputask';
import './TokeninPage.css';

type props = {
   addprop: string
   senddatatoken: Function;
   tokeninpagech: Function;
}

type Listdatain = {
id: number;
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

type Countertype = {
counter: number;
}

// addprop yes will make tokeninputask dialog question to popup 
const TokeninPage: React.FC<props> = ({addprop, senddatatoken, tokeninpagech}: props): 
ReactElement => {

// useState will only execute from queue when finish from top function which function directly
// under class declaration

const [arrTokenpage, setArrTokenpage] = useState<JSX.Element[]>([]);   
const [ticketings, setTicketings] = useState<number[]>([]);
// numid specifically use when user click cancel button to remove Tokenpage
const [numid, setNumid] = useState<number>(NaN);
const counternya = useRef<Array<Countertype>>([]);
// dont use empty object cause empty object will be value as not empty or true
const passtorun = useRef<string>("no");

const eachtokendata = (input: Listdatain) => {
    if((isNaN(Number(input.pricein))) ||
 (/\s/g.test(input.pricein))) {
    if(counternya.current[input.id].counter === 1000000) {
    counternya.current[input.id].counter = 1;
}
 else {
       counternya.current[input.id].counter = 
counternya.current[input.id].counter + 1;
       }      
}
else {
       senddatatoken(input);
     numidnya(input.id);
}
}

let divtokeninpage = "";
let setzero: number = 0;


const [tokeninputaskvis, setTokeninputaskvis] = useState("tokeninputasksh");

const numidnya = (numidnow: number) => {
      let newnumid = numid;
         newnumid = numidnow;
        setNumid(newnumid);
  console.log('inside numidnya');
}

// Why this react is so stupid ? Because you can't using indexOf directly from 
// callback function or function which called from inside callback function.

function stupidreact(idnum: number) {
    console.log('inside stupidreact tokeninpage' + arrTokenpage.length);
  if(arrTokenpage.length !== 0){  
    let indexnya = ticketings.indexOf(idnum); 
   
    counternya.current.splice(indexnya, 1);
 
  setTicketings((ticketings) => 
ticketings.filter((i) => i !== indexnya));
    
       setArrTokenpage((arrTokenpage) => arrTokenpage.filter((i) => 
arrTokenpage.indexOf(i) !== indexnya)); 
       
             let newnumid = numid;
                newnumid = NaN;
             setNumid(newnumid);

passtorun.current = "yes";
}
}

// this if part is only to change location of question to top when press add graph after first add graph
if(arrTokenpage.length === 0 && passtorun.current === "yes"){
  console.log('masuk tokeninpagech');
   tokeninpagech();
   passtorun.current = "no";
}

useEffect(() => { stupidreact(numid); }, [numid]);

const handleClick = (valuenumber: string) => {
 if((isNaN(Number(valuenumber)))
    || (valuenumber === "0") || (valuenumber === "") 
|| (/\s/g.test(valuenumber))){
    if(setzero === 1000000){
     setzero = 1;
}
else {
      setzero = setzero + 1;
}
}

else {
      for(let x = 0; x < (+valuenumber); x++){
     counternya.current.push({counter: 0});

        setTicketings(ticketings => [...ticketings, x]);
        setArrTokenpage(arrTokenpage => 
[...arrTokenpage,<div key={x} ><TokenPage id={x} eachtoken={eachtokendata} 
 numberlist={numidnya} counterset={counternya.current[x].counter} />
<br></br> </div>]);
         }

       let newtokeninputaskvis = tokeninputaskvis;
             newtokeninputaskvis = "tokeninputaskhid";
        setTokeninputaskvis(newtokeninputaskvis);
}
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
handleClicking={handleClick}  passtokinput={addprop} zeroset={setzero} />
  </div>
   <div>
   {arrTokenpage}
   </div>
</div>
)
}

export default TokeninPage;

