const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-api'

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser:true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type:String
    },
    age: {
        type: Number
    }
})

const Joan = new User({
    name: 'Joan',
    age: 22
})

Joan.save().then((result)=>{
    console.log(Joan)
}).catch((error) => {
    console.log(error)
})