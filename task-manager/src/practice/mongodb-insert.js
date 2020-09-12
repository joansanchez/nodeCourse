const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

//las tres anteriores se pueden simplificar en
// const {MongoClient, ObjectID} = require('mongodb)

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

/* const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp()) */

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if (error){
        return console.log('Unable to connect to DB!')
    }
    
    const db = client.db(databaseName)
    
    /* db.collection('tasks').insertMany([
        {
            description: 'Hacer la compra',
            completed: true
        }, {
            description: 'Lavadora',
            completed: false
        }, {
            description: 'Hacer la comida',
            completed: true
        }
    ], (error, result) => {
        if (error) return console.log('Unable to insert tasks')
        console.log(result.ops) 
    }) */

    //inserting a simple colllection to the db
    /* db.collection('users').insertOne({
        name: 'Alex',
        age: 24
    },(error, result) => {
        if(error) return console.log('Unable to insert user')

        console.log(result.ops)
    }) */



    //inserting more than a collection to a document
    /* db.collection('users').insertMany([
        {
            name: 'Maria',
            age:20
        }, {
            name: 'mama',
            age: 50
        }
    ], (error, result) => {
        if (error) return console.log('Unable to inset user')
        console.log(result.ops)
    }) */
})