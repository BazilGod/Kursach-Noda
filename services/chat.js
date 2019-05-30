'use strict';

const CrudService = require('./crud');
const validator = require('../helpers/validator');

class ChatService extends CrudService{
    constructor(repository, errors){
        super(repository, errors);
    }

   

    async create(data){
        let item;
        const validRes = validator.check('chat', data);
        if(validRes.error)
            throw this.errors.validationError;
        else{
            item = await super.create(data);
        }
        return item;
    }

    async getByName(name){
        const chat = this.repository.findOne({
            where:{
                name: name
            }
        });
        if(chat)
            return chat;
        else
            return null;
    }
}

module.exports = ChatService;