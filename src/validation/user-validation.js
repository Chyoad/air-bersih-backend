import Joi from "joi";

const registerUserValidation = Joi.object({
  nama: Joi.string().max(100).required(),
  no_telepon: Joi.string().max(20).required(),
  email: Joi.string().max(200).email().required(),
  password: Joi.string().max(100).required(),
  alamat: Joi.string().max(255).required()
});

const loginUserValidation = Joi.object({
  email: Joi.string().max(200).email().required(),
  password: Joi.string().max(100).required()
});

const getUserValidation = Joi.string().max(200).email().required();


export {
  registerUserValidation,
  loginUserValidation,
  getUserValidation
}