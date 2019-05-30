'use strict'

const jwt = require('jsonwebtoken');

function verifyToken(token){
    try{
        const user = jwt.verify(token, 'zemla4ok');

        return user;
    }
    catch(err){
        return false;
    }
}

module.exports = {
    verifyToken,
}