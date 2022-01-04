const Joi = require('@hapi/joi');

// Register Validation 
const registerValidation = (data) => {
    const schema = Joi.object({
    userID: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    phoneNumber: Joi.string().length(10).required(),
    createdDate: Joi.string().required(),
    admin: Joi.boolean().required(),
    bio : Joi.string().required(),
    wishList : Joi.array().required(),
})    
return  schema.validate(data)
}
// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
})    
return  schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
