const mongoose = require('mongoose')

if (process.argv.length > 2 && process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('Provide the necessary parameters')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://databaseuser:${password}@elliotdb.u45oy4m.mongodb.net/phonebook?retryWrites=true&w=majority`

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)
if (process.argv.length == 5) {
mongoose
    .connect(url)
    .then(result => {
        console.log('Connected')

        const phonebook = new Phonebook({
            name: name,
            number:number
        })

        return phonebook.save()

    })
    .then(()=>{
        console.log(`added ${name} number ${number} to phonebook`)
        return mongoose.connection.close()
    })
    .catch(err => {console.log(err)})
} else {
    mongoose
    .connect(url)
    .then(result => {
        Phonebook.find({}).then(result => {
            result.forEach(entry => {
                console.log(`${entry.name} ${entry.number}`)
            })
            mongoose.connection.close()
        })
    })
}