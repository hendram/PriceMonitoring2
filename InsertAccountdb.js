const Mongoclient = require('mongodb').MongoClient;



function insertdbaccount(accountaddr){

const url = "mongodb://localhost:27017/";

Mongoclient.connect(url, function(err, db) {
    if(err) throw err;
     const dbo = db.db("account");
     const myobj = { accountaddress: accountaddr };
     dbo.collection("accountcoll").insertOne(myobj, function(err,res) {
        if(err) {
           console.log("failed to insert dbid");
        db.close();
         }
       else if(res){
        console.log("1 document inserted");
        db.close();
       }
     });
});
}

module.exports = {insertdbaccount};
