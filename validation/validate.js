//Validation
const Joi = require('@hapi/joi');


//SignUP Validation
module.exports = {
    signUp: (data) => {
        const schema = Joi.object().keys({
            email: Joi.string().email({
                minDomainSegments: 2,
                tlds: {
                    allow: ['com', 'net']
                }
            }).trim().required().label('Email Incorrect'),
            password: Joi.string().min(6).max(30).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required().label('Password is too short'),
            username: Joi.string().min(3).max(30).trim().required().label('Name is too short')
        });

        return schema.validate(data, {
            abortEarly: false
        });
    }
}