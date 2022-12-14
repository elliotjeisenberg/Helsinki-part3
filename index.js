require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Phonebook = require('./models/phonebook')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))


morgan.token('request', function(req,res) { 
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request'))

// let persons = 
// [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

app.get('/api/persons', (request, response) => {
    // response.json(persons)
    Phonebook.find({}).then(entries => {
        response.json(entries)
    })
})

app.get('/api/persons/:id', (request, response) => {
    
    Phonebook.findById(request.params.id).then(entry=>{
        response.json(entry)
    })
    
    // const id = Number(request.params.id)
    // const entry = persons.find(ent => ent.id === id)
    
    // if (entry) {
    //     response.json(entry)
    // } else {
    //     response.status(404).end()
    // }
})

app.get('/api/info', ((request, response) => {
    Phonebook.find({}).then((entries) => {
        response.send(`<p>Phonebook has info for ${entries.length} people<p><br />${new Date()}`)
    })
    //response.send(`<p>Phonebook has info for ${persons.length} people<p><br />${new Date()}`)
}))

app.delete('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    persons = persons.filter( entry => entry.id !== id)

    response.status(204).end()
})

// const generateId  = () => {
//     const maxId = persons.length > 0 
//         ? Math.max(...persons.map(n => n.id))
//         : 0
//     return maxId + 1
// }

app.post('/api/persons', (request, response) => {
    const body = (request.body)

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'object not complete'
        })
    } 

    const newEntry = new Phonebook( {
        id: Math.floor(Math.random()*10000),
        name: body.name,
        number: body.number
    })

    newEntry.save().then(savedEntry => {
        response.json(savedEntry)
    })

    // persons = persons.concat(newEntry)
    // response.json(newEntry)
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
