const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

function genreValidator(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(55).required(),
  });
  return schema.validate(genre);
}

function customerValidator(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(55).required(),
    phone: Joi.string().min(3).max(20).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
}

function movieValidator(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(55).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0),
    dailyRentalRate: Joi.number().min(0),
  });
  return schema.validate(movie);
}

function rentalValidation(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(rental);
}

function userValidation(user){
  const schema = Joi.object({
    name: Joi.string().min(3).max(55).required(),
    email: Joi.string().min(3).max(95).required().email(),
    password: Joi.string().min(3).max(1024).required(),
  });
  return schema.validate(user);
}

function authValidation(user){
  const schema = Joi.object({
    email: Joi.string().min(3).max(95).required().email(),
    password: Joi.string().min(3).max(1024).required(),
  });
  return schema.validate(user);
}


module.exports.rentalValidation = rentalValidation;
module.exports.genreValidator = genreValidator;
module.exports.customerValidator = customerValidator;
module.exports.movieValidator = movieValidator;
module.exports.userValidation = userValidation;
module.exports.authValidation = authValidation;
