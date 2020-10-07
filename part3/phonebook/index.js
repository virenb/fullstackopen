const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122',
  },
];

const generateId = () => {
  const newId = Math.floor(Math.random() * 1000);
  return newId + 1;
};

app.get('/', (request, response) => {
  response.send('<h1>Hello, from Phonebook</h1>');
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  response.send(`<div>Phonebook has info for ${
    persons.length
  } people</div><br />
  <div>${Date()}</div>`);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  person ? response.json(person) : response.status(404).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  const name = body.name;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or number are missing',
    });
  }
  let personExists = persons.find((p) => p.name === name);
  if (personExists) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
  function replacer(key, value) {
    // Filtering out properties
    if (typeof value === 'number') {
      return undefined;
    }
    return value;
  }
  console.log(JSON.stringify(person, replacer));
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
