import { people } from "../data.js";

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      success: false,
      msg: "Please provide name value!",
    });
  }

  const newPerson = { id: 42, name: name };
  res.status(201).json({ success: true, data: [...people, newPerson] });
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const person = people.find((person) => person.id === Number(id));

  if (!name || !id || !person) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide credentials!" });
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });

  res.status(200).json({ success: true, data: newPeople });
};

const deletePerson = (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `Couldn't find a person with id: ${id}` });
  }

  const newPeople = people.filter((person) => person.id !== Number(id));
  return res.status(200).json({ success: true, data: newPeople });
};

export { getPeople, createPerson, updatePerson, deletePerson };
