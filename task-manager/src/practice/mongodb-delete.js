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

    db.collection('tasks').deleteOne({
        description: 'Lavadora'
    }).then((result)=>{
        console.log('Lavadora deleted');
    }).catch((error)=>{
        console.log(error);
    })

    /* db.collection('users').deleteMany({
        age: 22
    }).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    }) */
})