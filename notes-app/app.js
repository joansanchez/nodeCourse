const getNotes = require('./notes')
const chalk = require('chalk')

const message = getNotes()
console.log(message)
console.log(chalk.red('Success!'));
console.log(chalk.green.bold.bgRed('Success!'));




