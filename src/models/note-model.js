const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
    title: {
        type: String
    },
    text: {
        type: String
    },
})

const NoteModel = mongoose.model('notes', NoteSchema)

module.exports = NoteModel
