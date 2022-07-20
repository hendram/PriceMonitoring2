import React, {useState, useEffect} from 'react';

const Token = () => {

const Tokens = [
  { price: '11.5', Name: 'WETH' },
  { price: '20', Name: 'WMATIC' },
 ]

const WMATIC = '';
const [TokenName, setTokenName] = useState('');

 // now set up the remaining questions' state hooks as ''. This hides the question as you'll
  // see in the HobbyQuestion component below.
let Tokenyes = false;
 
 for (let i = 0; i < Tokens.length; i++) {
    if(Tokens[i].Name === 'WMATIC'){
    const [TokenName, setTokenName] = useState(Tokens[i].price)
   Tokens[i].Name = TokenName;
       Tokenyes = true;
       console.log(Tokens[i].Name);
  }
}

useEffect(() => {
   setTokenName(TokenName);
}, [TokenName]);

  return (
    <>
        <p>
      {Tokens[1].Name}
</p>
    </>
  )
}

export default Token;
