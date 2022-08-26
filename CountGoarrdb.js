const MongoClient = require('mongodb').MongoClient;
const _ = require('underscore');

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

async function countgoarraccount(accountaddr) {
try {
    await client.connect()
    const database = client.db('account');
    const custdata = database.collection('accountcollcomp');
    // Query for a movie that has the title 'Back to the Future'
    const query = { accountaddress: accountaddr };

    const exist = await custdata.find(query, {accountaddress: 1, _id: 0}).count();
    if(exist  == null ){
      return "notfind";
    }       
    else if(exist != null) {
            return exist;
}
}
finally {
await client.close();
}

}


module.exports = {countgoarraccount};

