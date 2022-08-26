const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

async function deletegoarraccount(accountaddr, chain, dex, pricein, tokenname1, tokenaddress1, digittoken1,
tokenname2, tokenaddress2, digittoken2, milisecondselapse, currentts, ntimes, timestampthreemonth){
try{
   await client.connect();
     const dbo = client.db("account");
     const myobj = { accountaddress: accountaddr, chainname: chain, dexname: dex, priceinnow: pricein,
tokenname1tok: tokenname1, tokenaddress1addr: tokenaddress1, digittoken1num: digittoken1,
tokenname2tok: tokenname2, tokenaddress2addr: tokenaddress2, digittoken2num: digittoken2,
milisecondselapsetime: milisecondselapse, currenttstime: currentts, ntimestime: ntimes, 
stampthreemonth: timestampthreemonth};
    const delgoarr = await dbo.collection("accountcollcomp").deleteOne(myobj);
    if(delgoarr === null){
           console.log("failed to delete goarr");
         }
       else if(delgoarr){
        console.log("1deleted");
       }
}
finally{
  await client.close();
}

}

module.exports = {deletegoarraccount};
