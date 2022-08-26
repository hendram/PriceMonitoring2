const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

async function deletedbaccount(accountaddr) {
try {
    await client.connect()
    const database = client.db('account');
    const custdata = database.collection('accountcoll');
    // Query for a movie that has the title 'Back to the Future'
    const query = { accountaddress: accountaddr };
    const exist = await custdata.deleteOne(query);
    if(exist === null ){
      return "notfind";
    }       
    else if(exist !== null) {
            return "1deleted";
}
}
finally {
   await client.close();
}

}


module.exports = {deletedbaccount};

