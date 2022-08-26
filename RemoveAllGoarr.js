const MongoClient = require('mongodb').MongoClient;
const _ = require('underscore');

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

async function removegoarraccount() {
try {
    await client.connect()
    const database = client.db('account');
    const custdata = database.collection('accountcollcomp');
    // Query for a movie that has the title 'Back to the Future'
    const exist = await custdata.deleteMany({});
    if(exist === null ){
      return "notfind";
    }       
    else if(exist){
            return "success remove All accountcollcomp";
}
}
finally {
   await client.close();
}

}


module.exports = {removegoarraccount};

