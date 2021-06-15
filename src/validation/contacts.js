const Joi = require('joi');

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).optional(),
  phone: Joi.string().optional(),
  email: Joi.string().optional(),
}).or('name', 'phone', 'email');

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  console.log(error);
  if (error) {
    const [{ message }] = error.details;
    return next({
      message,
    });
  }
  next();
};
module.exports.validateAddContac = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.validateUpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
