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