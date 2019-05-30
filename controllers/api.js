'use strict';

const express = require('express');

module.exports = (
    chatService,
    userService,
    messageService
) => {
    const router = express.Router();

    //defining cntroller
    const userController = require('./user')(
        userService,
        chatService,
        messageService,
    );

    //defining routers    
    router.use('/users', userController);

    return router;
}