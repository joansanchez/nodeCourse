require('../src/db/mongoose')
const Task = require('../src/models/task')


Task.findByIdAndDelete('5f5e373b310715484800646e').then(() => {
    return Task.countDocuments({ completed: false})
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
})