const express = require("express");

const PORT = 3001;

const persons = [
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

app.get("/info", (req, res) => {
  res.send(
    `Phonebook has information for ${persons.length} people  
    <br/><br/>
    ${new Date().toString()}`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
