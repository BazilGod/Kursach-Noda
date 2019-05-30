'use strict'

const CrudController = require('./crud');

class ChatController extends CrudController{
    constructor(messageService, userService){
        super(messageService);

        this.userService = userService;

        this.registerRoutes();
    }

    async create(req, res){
        const data = {
            userId: parseInt(req.params.userId),
            chatId: parseInt(req.params.chatId),
            text: req.body.text
        }
        const user = await this.userService.read(data.userId);
        const chats = await user.getChats();
        let flag = false;
        for(let i = 0; i < chats.length; i++){
            if(chats[i].id == data.chatId)
                flag = true;
        }
        let message;
        if(!flag)
            throw this.service.errors.accessDenied;
        else
            message = await this.service.create(data);
        res.json(message);
    }

    async readAll(req, res){
        const data = {
            userId: parseInt(req.params.userId),
            chatId: parseInt(req.params.chatId),
        }
        const user = await this.userService.read(data.userId);
        const chats = await user.getChats();
        let flag = false;
        for(let i = 0; i < chats.length; i++){
            if(chats[i].id == data.chatId)
                flag = true;
        }
        let messages;
        let result = [];
        if(!flag)
            throw this.service.errors.accessDenied;
        else
        {
            messages = await this.service.readChunk(data);
            for(let i = 0; i < messages.length; i++){
                let user = await this.userService.read(messages[i].userId);
                result.push({
                    message: messages[i],
                    userName: user.name,
                    userSurname: user.surname,
                    userLogin: user.login
                });
            }
        }
        res.json(result);
    }

    async read(req, res){
        res.sendStatus(404);
    }

    async update(req, res){
        res.sendStatus(404);
    }

    async delete(req, res){
        res.sendStatus(404);
    }
}

module.exports = (messageService, userService) => {
    const controller = new ChatController(
        messageService,
        userService
    );
    return controller.router;
}