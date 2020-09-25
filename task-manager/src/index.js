//External modules requirements
const express = require('express')
require('./db/mongoose')

//Internal modules requirements
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

//Express server config
const app = express()
const port = process.env.PORT || 3000

//congiguration server options
app.use(express.json())

//Reference to router files
app.use(userRouter)
app.use(taskRouter)

//Turning on server
app.listen(port, () => {
    console.log('Server is up at port ' + port)
})




const bycript = require('bcryptjs')
const myFunction = async () => {
    const password = 'Red12345!'
    const hashedPassword = await bycript.hash(password, 8)

    console.log(password);
    console.log(hashedPassword);
}

myFunction()