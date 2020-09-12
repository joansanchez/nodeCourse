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
    
    /* db.collection('users').findOne({ _id: new ObjectID("5f564edcca38c5287c2c835b")}, (error, user) => {
        if (error) return console.log('UNable to fetch user')
        console.log(user)
    })

    db.collection('users').find({ age: 22}).toArray((error, users)=>{
        console.log(users)
    }) */

    db.collection('tasks').findOne({ _id: new ObjectID("5f565089475dc321f41b9fe1")}, (error, result) => {
        if (error) return console.log('Unable to fetch task')
        console.log(result)
    })

    db.collection('tasks').find({ completed: false}).toArray((error, tasks) => {
        console.log(tasks)
    })
})