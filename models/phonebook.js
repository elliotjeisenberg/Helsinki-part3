const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to ', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected')
    })
    .catch((error) => {
        console.log('error connecting to mongodb:', error.message)
    })

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String,
    id:Number
})

phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Phonebook', phoneBookSchema)