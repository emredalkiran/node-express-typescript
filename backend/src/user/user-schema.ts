const Joi  = require('joi')

export const userAuthenticationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(3).max(50).required(),
})

export const userSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(50).required(),
  lastName: Joi.string().alphanum().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(15).required(),
})
