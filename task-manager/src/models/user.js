const mongoose = require('mongoose')
const validator = require('validator')
const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Task = require('./task')

const userSchema = new mongoose.Schema({
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
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error ('Email is invalid')
        }
    },
    password: {
        type: String, 
        required: true,
        minlength: 7,
        trim: true,
        validate (value) {
            if(value.toLowerCase().includes("password")) throw new Error ('Password can nmot conatin the term \"password\"')
        }
    },
    tokens: [{
        token: {
            type: String, 
            required: true
        }
    }]
}, {
    timestamps: true
})


//virtual variables
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'author'
})

//methods for instance functions
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, 'thisismynewcourse')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//Statics for class functions
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error ('Unable to log in')
    }

    const isMatch = await bycript.compare(password, user.password)

    if (!isMatch){
        throw new Error ('Unable to log in')
    }
    return user
}

//hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')){
        user.password = await bycript.hash(user.password, 8)
    }
    next()
})

//delete user tasks when user is deleted
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ author: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User