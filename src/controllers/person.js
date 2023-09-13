const { Person } = require("../models/index");
const { createPersonSchema, getUserSchema } = require("../utils/validation/person");

const createUser = async (req, res) => {
  const { name } = req.body;
  try {
    const { error } = createPersonSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const userExist = await Person.findOne({
      where: {
        name,
      },
    });

    if (userExist) {
      return res.status(400).json({ error: "Name already exists" });
    }

    const person = await Person.create({
      name,
    });

    const response = {
      id: person.id,
      name: person.name,
      createdAt: person.createdAt,
      updatedAt: person.updatedAt,
    };
    return res.status(201).json({
      person: response,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await Person.findAll();
    res.status(200).json({
      message: "All users data",
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchPerson = async (req, res) => {
  const { id } = req.params;
  try {

    const { error } = fetchPersonSchema.validate(req.params);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const person = await Person.findByPk(id);

    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }

    return res.status(200).json({ person });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPersonByName = async (req, res) => {
  const { name } = req.params;

  console.log(name);

  try {
    const person = await Person.findOne({ where: { name } });

    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }

    const response = {
      id: person.id,
      name: person.name,
      createdAt: person.createdAt,
      updatedAt: person.updatedAt,
    };

    return res.status(200).json({
      person: response,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const modifyPersonInfo = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const person = await Person.findByPk(id);
    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }

    person.name = name;
    await person.save();

    return res.status(200).json({
      message: "Person details updated successfully",
      person,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserByName = async (req, res) => {
  const { name } = req.params;
  const updatedData = req.body;

  try {
    const user = await Person.findOne({ where: { name } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update(updatedData);

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deletePerson = async (req, res) => {
  const { id } = req.params;
  try {
    const person = await Person.findByPk(id);
    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }

    await person.destroy();

    return res.status(200).json({
      message: "Person deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  fetchPerson,
  getPersonByName,
  modifyPersonInfo,
  deletePerson,
  updateUserByName,
  getAllUsers,
};
