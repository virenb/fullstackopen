const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://virenb:${password}@cluster0.1ggcv.mongodb.net/pbook?retryWrites=true`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (!process.argv[3] || !process.argv[4]) {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  person.save().then(() => {
    console.log(
      `Added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    )
    mongoose.connection.close()
    // mongoose.connection.close();
  })
}

// Person.find({}).then((result) => {
//   result.forEach((person) => {
//     console.log(JSON.stringify(person));
//   });
//   // mongoose.connection.close();
// });
