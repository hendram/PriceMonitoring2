const { ChainId, Token, Fetcher, Route, TradeType, TokenAmount, Trade } = 
require('@pancakeswap-libs/sdk-v2')

const BUSD =  new Token(ChainId.MAINNET,
'0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18)


const WBNB =  new Token(ChainId.MAINNET, 
 '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18)




fetchToken1Token2 = async () => {
try {
  const pairToken1Token2 = await Fetcher.fetchPairData(BUSD, WBNB)
  const routeToken2ForToken1 = new Route([pairToken1Token2], WBNB);
const tradeToken2ForToken1 = new Trade(routeToken2ForToken1, 
 new TokenAmount(WBNB, BigInt(1E18)), TradeType.EXACT_INPUT);
  const Token2Token1 = tradeToken2ForToken1.executionPrice.toSignificant(6) +
 " BUSD for 1 WBNB"

console.log(Token2Token1);
}
catch(error){
console.error(error)

}};



fetchToken1Token2();
