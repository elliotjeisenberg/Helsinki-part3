const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://databaseuser:${password}@elliotdb.u45oy4m.mongodb.net/myNotes?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,   
  important: Boolean,
})

const Note = mongoose.model('note', noteSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    Note.find({}).then( result => {
      result.forEach(note => {
        console.log(note)
      })
    })
  })

    //return note.save()
  .then(() => {
    console.log('notes printed!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))