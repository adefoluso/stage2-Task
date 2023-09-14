const Joi = require("joi");

const createPersonSchema = Joi.object({
  name: Joi.string().min(4).max(255).required(),
});

const validateFetchPersonSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

const validateModifyPersonSchema = Joi.object({
  name: Joi.string().required(),
  id: Joi.string().uuid().required(),
});

const validateDeletePersonSchema = Joi.object({
    id: Joi.string().uuid().required(),
})
module.exports = {
  createPersonSchema,
  validateModifyPersonSchema,
  validateFetchPersonSchema,
  validateDeletePersonSchema,
};
