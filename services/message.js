'use strict'

const CrudService = require('./crud');
const validator = require('../helpers/validator');

class MessageService extends CrudService{
    constructor(repository){
        super(repository);
    }

    async readChunk(data){
        return await this.repository.findAll({
            where: {
                chatId: data.chatId
            }
        })
    }

    async create(data){
        const validRes = validator.check('message', data);
        
        if(validRes.error)
            throw this.errors.validationError;
        else
            return await super.create(data);
    }
}

module.exports = MessageService;