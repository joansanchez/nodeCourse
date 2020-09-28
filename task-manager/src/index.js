//External modules requirements
const express = require('express')
require('./db/mongoose')

//Internal modules requirements
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const Task = require('./models/task')
const User = require('./models/user')

//Express server config
const app = express()
const port = process.env.PORT || 3000

//adding glogal middleware functions:    new request -> midxdleware function -> run route handler 
/* app.use((req, res, next) => {
    res.status(503).send('Site under maintainance, please come back soon')    
}) */

//congiguration server options
app.use(express.json())

//Reference to router files
app.use(userRouter)
app.use(taskRouter)

//Turning on server
app.listen(port, () => {
    console.log('Server is up at port ' + port)
})


/* const main = async () => {
    const task = await Task.findById('5f7196ee344ec12bb8e7f7d2')
    await task.populate('author').execPopulate()
    console.log(task.author);

    const user = await User.findById('5f71964a66def11b242e6c26')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}
main() */