'use strict'

const CrudService = require('./crud');
const bcrypt = require('bcrypt');
const validator = require('../helpers/validator');
const tokens = require('../helpers/tokens');

class UserService extends CrudService{
    constructor(repository, errors){
        super(repository, errors);
    }

    async update(id, data){
        if(data.password)
            data.password = bcrypt.hashSync(data.password, 8);
        return await super.update(id, data);
    }

    async checkCredentials(data){
        let users = await this.repository.findAll({
            where: {login: data.login}
        });
        if(users.length !== 0)
            throw this.errors.loginExist;
        else
            return true;
    }

    async create(data){
        data.password = bcrypt.hashSync(data.password, 8);
        const validRes = validator.check('user', data);
        
        if(validRes.error)
            throw this.errors.validationError;
        else
            return await super.create(data);
    }

    async readByLogin(login){
        const user =  await this.repository.findOne({
            where: {
                login: login
            }
        });
        if(user)
            return user;
        else
            throw this.errors.notFound;
    }
}

module.exports = UserService;