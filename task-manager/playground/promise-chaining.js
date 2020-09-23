require('../src/db/mongoose')
const User = require('../src/models/user')

//5f6afd83dd737d3d68c76210

User.findByIdAndUpdate('5f6b2350954517375c4a468a', {
    age: 1
}).then((user) => {
    console.log(user)
    return User.countDocuments({age: 1})
}).then((users) => {
    console.log(users)
}).catch((e) => {
    console.log(e);
})