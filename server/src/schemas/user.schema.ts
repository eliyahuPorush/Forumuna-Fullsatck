const Joi = require('joi');

const   userSignupSchema = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
    passwordConfirm: Joi.ref('password')
})
const userLoginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
}) ;


export {userLoginSchema, userSignupSchema} ;