'use strict'

const CrudController = require('./crud');
const { checkAuth } = require('./../global-controllers/authorisation');

class UserController extends CrudController{
    constructor(userService, chatService, messageService){
        super(userService);

        const chatController = require('./chat')(
            chatService,
            userService,
            messageService
        );
        this.router.use('/:userId/chats', chatController);

        this.routes = {
            '/': [
                { method: 'get', cb: this.readAll },
            ],
            '/:login': [
                { method: 'get', cb: this.read },
                { method: 'put', cb: this.update },
                { method: 'delete', cb: this.delete }
            ]
        };

        this.registerRoutes();
    }

    async read(req, res){
        let data = await this.service.readByLogin(req.params.login);
        res.json(data);
    }

    async delete(req, res){
        const user = await this.service.readByLogin(req.params.login);
        const checkValue = await checkAuth(req.ability, 'delete', user);
        if(checkValue.access){
            await this.service.delete(user.id);
        }
        else{
            throw checkValue.error;
        }
        res.sendStatus(200);
    }

    async update(req, res){
        const user = await this.service.readByLogin(req.params.login);
        const checkValue = await checkAuth(req.ability, 'update', user);
        if(checkValue.access){
            await this.service.update(user.id, req.body);
        }
        else{
            throw checkValue.error;
        }
        res.sendStatus(200);
    }
}

module.exports = (userService, chatService, messageService) => {
    const controller = new UserController(
        userService,
        chatService,
        messageService
    );
    return controller.router;
};