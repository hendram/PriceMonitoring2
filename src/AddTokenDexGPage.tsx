import React, {useState, useRef, useEffect} from 'react';
import TokenPage from './TokenPage';
import Tokeninputask from './Tokeninputask';
import './AddTokenDexGPage.css';

type Countertype = {
counter: number;
}


// addprop yes will make tokeninputask dialog question to popup 
const AddTokenDexGPage: React.FC<{}> =  props  => {
const counternya = useRef<Array<Countertype>>([]);

// useState will only execute from queue when finish from top function which function directly
// under class declaration

const [arrTokenpage, setArrTokenpage] = useState<JSX.Element[]>([]);   
const [ticketings, setTicketings] = useState<number[]>([]);
// numid specifically use when user click cancel button to remove Tokenpage
const [numid, setNumid] = useState<number>(NaN);
// dont use empty object on useRef cause empty object will be value as not empty or true


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

}
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
[...arrTokenpage,<div key={x} ><TokenPage id={x}  numberlist={numidnya}  />
<br></br> </div>]);
         }

       let newtokeninputaskvis = tokeninputaskvis;
             newtokeninputaskvis = "tokeninputaskhid";
        setTokeninputaskvis(newtokeninputaskvis);
}
}

useEffect(() => {
  if(arrTokenpage.length === 0){
      let newtokeninputaskvis = "tokeninputasksh";
      setTokeninputaskvis(newtokeninputaskvis);
}
}, [arrTokenpage.length]);

return(
<div className="tokeninpagetop">
  <div className={tokeninputaskvis}>
 <Tokeninputask 
handleClicking={handleClick}  zeroset={setzero} />
  </div>
   <div>
   {arrTokenpage}
   </div>
</div>
)
}

export default AddTokenDexGPage;

