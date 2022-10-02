const joi = require('joi');

const userValidation = (body) => {
    const userValidationSchema = joi.object({
        firstName: joi.string().max(12).min(4).trim().required(),
        password: joi.string().max(16).min(4).trim().required()
    })

    return userValidationSchema.validate(body._doc)
}

module.exports = { userValidation }