const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

async function updatedbgoarr(chain, dex, tokenname1, tokenname2, pricein) {
try {
    await client.connect()
    const database = client.db('account');
    const custdata = database.collection('accountcollcomp');
    // Query for a movie that has the title 'Back to the Future'
    const query = {chainname: chain, dexname: dex, tokenname1tok: tokenname1, tokenname2tok: tokenname2,
            priceinnow: pricein };
    const exist = await custdata.deleteOne(query);
    if(exist  === null ){
      return "failedremovegoarr";
    }       
    else if(exist !== null) {
            return "successremovegoarr";
}
}
finally{
await client.close();
}

}


module.exports = {updatedbgoarr};

