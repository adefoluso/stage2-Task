const Joi = require("joi");

const createPersonSchema = Joi.object({
  name: Joi.string().min(4).max(255).required(),
});

const fetchPersonSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
module.exports = {
  createPersonSchema,
 fetchPersonSchema
};