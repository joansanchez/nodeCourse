require('../src/db/mongoose')
const Task = require('../src/models/task')


/* Task.findByIdAndDelete('5f5e373b310715484800646e').then(() => {
    return Task.countDocuments({ completed: false})
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
}) */

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false})
    return count
}

deleteTaskAndCount('5f6b063e034922303483d6e5').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})