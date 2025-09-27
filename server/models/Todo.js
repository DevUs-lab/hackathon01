const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, location: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: true
    }, status: { type: String, default: "active" },
    dateCreated: { type: Date, default: Date.now }
})
const TodoModel = mongoose.model('todos', TodoSchema)

module.exports = TodoModel