const mongoose = require('mongoose')

// if (process.argv.length < 5) {
//     console.log('Please provide db password, person name, person number')
//     process.exit(1)
// }

const password = process.argv[2]

const url = `mongodb+srv://node-app:${password}@cluster0.5jvjafe.mongodb.net/node-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person' , personSchema)
if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
    Person
        .find({})
        .then(persons=> {
            console.log(persons);
            mongoose.connection.close()
        })
}

