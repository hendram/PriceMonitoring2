const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

async function updatedbaccount(accountaddr, stampthreem) {
try {
    await client.connect()
    const database = client.db('account');
    const custdata = database.collection('accountcoll');
    // Query for a movie that has the title 'Back to the Future'
    const query = {accountaddress: accountaddr};
    const updated = {$set: { accountaddress: accountaddr, stampthreemonth: stampthreem } };
    const exist = await custdata.updateOne(query, updated);
    if(exist  === null ){
      return "failedupdate";
    }       
    else if(exist !== null) {
            return "successupdate";
}
}
finally{
await client.close();
}

}


module.exports = {updatedbaccount};

