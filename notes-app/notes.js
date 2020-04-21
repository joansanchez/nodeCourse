const fs = require('fs')
const chalk = require('chalk')
const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }   
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (notes > notesToKeep){
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen('Note removed'))
    } else {
        console.log(chalk.bgRed('No note to remove'))
    }

}

const listNotes = () => {
    console.log(chalk.red(getNotes()))
    const notes = loadNotes()
    notes.forEach(element => console.log(element.title));
}

const readNote = (title) => {
    const notes = loadNotes()
    const NoteToRead = notes.find((note) => note.title === title)
    if (NoteToRead){
        console.log(chalk.bold.underline(NoteToRead.title))
        console.log(NoteToRead.body)
    } else {
        console.log(chalk.bgRed('No note has been found'))
    }
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}