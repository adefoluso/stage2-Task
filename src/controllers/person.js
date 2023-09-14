const { Person } = require("../models/index");
const {
  createPersonSchema,
  validateFetchPersonSchema,
  validateModifyPersonSchema,
  validateDeletePersonSchema,
} = require("../utils/validation/person");

//CREATE A PERSON
const createPerson = async (req, res) => {
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

const getAllPersons = async (_req, res) => {
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

//GET A PERSON
const fetchPerson = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = validateFetchPersonSchema.validate(req.params);

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

//UPDATE A PERSON using id as params and data to be updated as request body
const modifyPersonInfo = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const { error } = validateModifyPersonSchema.validate({ name, id });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const person = await Person.findByPk(id);
    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }

    // Check if name already exists
    const personExists = await Person.findOne({ where: { name } });
    if (personExists && personExists.id !== person.id) {
      return res
        .status(400)
        .json({
          error:
            "Name already exists, please enter this person name or a unique name",
        });
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

const deletePerson = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = validateDeletePersonSchema.validate(req.params);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
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
  createPerson,
  fetchPerson,
  modifyPersonInfo,
  deletePerson,
  getAllPersons,
};
