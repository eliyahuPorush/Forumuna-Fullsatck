const joi = require('Joi') ;

export const newForum = joi.object({
    title: joi.string().require().min(5).max(50),
    content: joi.string().require().min(10).max(300)
})