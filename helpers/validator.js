const Joi = require('joi');

const schemas = {
    'user': Joi.object().keys({
        name: Joi.string(),
        surname: Joi.string(),
        login: Joi.string(),
        password: Joi.string()
    }),
    'chat': Joi.object().keys({
        name: Joi.string()
    }),
    'user-chat': Joi.object().keys({
        UserId: Joi.number().integer().positive(),
        ChatId: Joi.number().integer().positive()
    }),
    'message': Joi.object().keys({
        userId: Joi.number().integer().positive(),
        chatId: Joi.number().integer().positive(),
        text: Joi.string()
    })
}

exports.check = function (schema, body) {
    if(!schemas[schema])
        return {};
    return Joi.validate(body, schemas[schema], {presence: 'required'});
}