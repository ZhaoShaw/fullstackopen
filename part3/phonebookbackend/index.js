require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function (req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))

// let persons = [
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

// app.get('/info', (request, response) => {
//     const date = new Date
//     response.send(`<div>Phonebook has info for ${persons.length} people</div><div>${date}</div>`)
// })

app.get('/info', (request, response) => {
  (async () => await Person.count())()
    .then(res => {
      const countTotal = res
      const date = new Date
      response.send(`<div>Phonebook has info for ${countTotal} people</div><div>${date}</div>`)
    })
})

app.get('/api/persons', (request, response, next) => {
  Person
    .find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => {
      // console.log(error);
      next(error)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      // console.log(error);
      next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      // console.log(person);
      response.status(204).end()
    })
    .catch(error => {
      // console.log(error);
      next(error)
    })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // if (!body.name) {
  //     return response.status(400).json({
  //         error: 'name missing'
  //     })
  // }

  // if (!body.number) {
  //     return response.status(400).json({
  //         error: 'number missing'
  //     })
  // }

  let findPerson = {}
  Person.find({ name: new RegExp(body.name, 'i') })
    .then(persons => {
      console.log(persons)
      findPerson = persons[0]
      // console.log('find ...', findPerson);
      if (!findPerson) {
        const newPerson = new Person({
          'name': body.name,
          'number': body.number
        })
        newPerson
          .save()
          .then(savedPerson => {
            response.json(savedPerson)
          })
          .catch(error => next(error))
      } else {
        return response.status(400).json({
          error: 'name must be unique'
        })
      }
    })

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  Person.findByIdAndUpdate(request.params.id, { number: body.number }, { new: true, runValidators:true, context:'query' })
    .then(person => {
      response.json(person)
    })
    .catch(error => {
      // console.log(error);
      next(error)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3106
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})