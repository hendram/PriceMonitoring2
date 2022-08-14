const MongoClient = require('mongodb').MongoClient;
const _ = require('underscore');

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

async function checkdbaccount(accountaddr) {
try {
    await client.connect()
    const database = client.db('account');
    const custdata = database.collection('accountcoll');
    // Query for a movie that has the title 'Back to the Future'
    const query = { accountaddress: accountaddr };
    const exist = await custdata.findOne(query, {accountaddress: 1, _id: 0});
    if(exist  == null ){
      return "notfind";
    }       
    else if((exist != null) && (query.accountaddress === exist.accountaddress)) {
            return "find";
}

await client.close();

}
catch(error){
console.error(error)
}

}


module.exports = {checkdbaccount};

