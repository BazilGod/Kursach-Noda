'use strict'

const CrudService = require('./crud');
const validator = require('../helpers/validator');

class UserChatService extends CrudService{
    constructor(repository, errors){
        super(repository, errors);
    }

    async create(userId, chatId){
        let data = {
            UserId: userId,
            ChatId: chatId
        }
        const validRes = validator.check('user-chat', data);
        if(validRes.error)
            throw this.errors.validationError;
        else
            return await super.create(data);
    }

    

}

module.exports = UserChatService;