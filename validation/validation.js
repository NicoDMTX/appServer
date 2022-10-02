const joi = require('joi');

const userValidation = (body) => {
    const userValidationSchema = joi.object({
        firstName: joi.string().min(4).max(12).trim().required()
    })

    return userValidationSchema.validate(body)
}

module.exports = { userValidation }