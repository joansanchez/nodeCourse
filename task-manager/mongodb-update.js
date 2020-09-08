const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if (error){
        return console.log('Unable to connect to DB!')
    }
    
    const db = client.db(databaseName)

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error);
    })
    
    /* db.collection('users').updateOne({
        _id: new ObjectID("5f564c6f0929c74280cbde21")
    }, {
        // $set: {
        //    name: 'Alex'
        //} 
        $inc: {
            age: 1
        }
    }).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    }) */
})