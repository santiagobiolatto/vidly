const Joi = require('joi');

function validationGenres(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}

module.exports = validator;