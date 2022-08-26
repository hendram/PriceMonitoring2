const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

async function insertgoarraccount(accountaddr, chain, dex, pricein, tokenname1, tokenaddress1, digittoken1,
tokenname2, tokenaddress2, digittoken2, milisecondselapse, currentts, ntimes, timestampthreemonth){
try{
 await client.connect()
     const dbo = client.db("account");
     const myobj = { accountaddress: accountaddr, chainname: chain, dexname: dex, priceinnow: pricein,
tokenname1tok: tokenname1, tokenaddress1addr: tokenaddress1, digittoken1num: digittoken1,
tokenname2tok: tokenname2, tokenaddress2addr: tokenaddress2, digittoken2num: digittoken2,
milisecondselapsetime: milisecondselapse, currenttstime: currentts, ntimestime: ntimes, 
stampthreemonth: timestampthreemonth};
    const insgoarr = await dbo.collection("accountcollcomp").insertOne(myobj);
    if(insgoarr === null){
           console.log("failed to insert goarr");
         }
       else if(insgoarr){
        console.log("1inserted");
       }
}
finally{
  await client.close();
}

}

module.exports = {insertgoarraccount};
