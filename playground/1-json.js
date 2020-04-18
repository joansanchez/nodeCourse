const fs = require('fs')
// const book = {
//     title: 'Teo',
//     author: 'EL Johnny'
// }

// const bookJSON = JSON.stringify(book)

// fs.writeFileSync('1-json.json', bookJSON)

// const dataBuffer = fs.readFileSync('1-json.json')
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)
// console.log(data.title)

const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
data.name = 'Joan'
data.age = 22
const dataString = JSON.stringify(data)
fs.writeFileSync('1-json.json', dataString)