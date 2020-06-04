const express = require("express");

const PORT = 3001;

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6445678",
    id: 4,
  },
];

const app = express();

// Middleware
app.use(express.json());

// Info about the people in the phonebook
app.get("/info", (req, res) => {
  res.send(
    `Phonebook has information for ${persons.length} people  
    <br/><br/>
    ${new Date().toString()}`
  );
});

// Handling get requests
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    return res.json(person);
  }
  res.status(404).json({ error: "person with that id could not be found" });
});

// Handling delete requests
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const personsOriginalLength = persons.length;
  persons = persons.filter((person) => person.id !== id);
  if (personsOriginalLength > persons.length) {
    return res.status(204).end();
  }
  res.status(404).json({
    error: "person with that id could not be found, no contact was deleted",
  });
});

// Handling post requests
const generateID = () => Math.random() * 100000;
app.post("/api/persons", (req, res) => {
  const person = req.body;
  if (!person.name) {
    return res
      .status(400)
      .json({ error: "This person is missing a name field" });
  }
  if (!person.number) {
    return res
      .status(400)
      .json({ error: "This person is missing a number field" });
  }

  if (persons.some((p) => p.name === person.name)) {
    return res.status(400).json({
      error:
        "This name is already in use in the phonebook. Each name must be unique",
    });
  }
  const newPerson = {
    name: person.name,
    number: person.number,
    id: generateID(),
  };
  persons.push(newPerson);
  res.json(newPerson);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});