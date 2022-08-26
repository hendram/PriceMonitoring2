const MongoClient = require('mongodb').MongoClient;


const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

async function insertdbaccount(accountaddr, stampthreem){

try {
     await client.connect()
     const dbo = client.db("account");
     const myobj = { accountaddress: accountaddr, stampthreemonth: stampthreem };
      const returninsert = await dbo.collection("accountcoll").insertOne(myobj);
        if(returninsert === null) {
           console.log("failed to insert dbid");
         }
       else if(returninsert){
           return "1inserted";
       }
}
finally {
        await client.close();
}   
}

module.exports = {insertdbaccount};
