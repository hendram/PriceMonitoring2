const { ChainId, Token, Fetcher, Route, TradeType, TokenAmount, Trade } = 
require('@pancakeswap-libs/sdk-v2')

class BSCPancake {

Token1;
Token2;

constructor(TokenA, TokenB, DigitA, DigitB) {
  this.TokenAdd1 = TokenA;
  this.TokenAdd2 = TokenB;
  this.Digit1 = DigitA;
  this.Digit2 = DigitB;
}

fetchToken1Token2 = async () => {
try {
this.Token1 =  new Token(ChainId.MAINNET, this.TokenAdd1, this.Digit1)
this.Token2 =  new Token(ChainId.MAINNET, this.TokenAdd2, this.Digit2)

  const pairToken1Token2 = await Fetcher.fetchPairData(this.Token1, this.Token2)
  const routeToken2ForToken1 = new Route([pairToken1Token2], this.Token2);
const tradeToken2ForToken1 = new Trade(routeToken2ForToken1, 
 new TokenAmount(this.Token2, BigInt(1E18)), TradeType.EXACT_INPUT);
  const Token2Token1 = tradeToken2ForToken1.executionPrice.toSignificant(6) +
 " Token1 for 1 Token2"

return Token2Token1;
}
catch(error){
console.error(error)

}};

}

module.exports = BSCPancake;
