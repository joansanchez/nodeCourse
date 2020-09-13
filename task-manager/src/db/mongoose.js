const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-api'

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser:true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error ('Email is invalid')
        }
    }
})

const Joan = new User({
    name: 'Mike Andrew',
    email: 'joan@jo.com' 
    
})

Joan.save().then((result)=>{
    console.log(Joan)
}).catch((error) => {
    console.log(error)
})

/* const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task ({
    description: 'Llamar a Jazztel',
    completed: false
})

task.save().then((result) => {
    console.log(task);
}).catch((error) => {
    console.log(error);
}) */