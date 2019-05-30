'use strict';

const CrudController = require('../controllers/crud');
const tokens = require('../helpers/tokens');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authCookie = '__service_token';

class AuthenticationController extends CrudController{
    constructor(userService){
       super(userService);

        this.login = this.login.bind(this);

       this.routes = {
            '/*(api|main)/*': [
                { method: 'use', cb: this.authenticate }
            ],
            '/login': [
                { method: 'post', cb: this.login }
            ]
        }
        this.registerRoutes();
    }

    async authenticate(req, res, next){
        const token = req.cookies[authCookie];
        const userToken = tokens.verifyToken(token);
        if(userToken == '') res.redirect('/login');
        if(userToken){
            next();
        }
        else{ 
            res.redirect('/login');
        }
    }

    async login(req, res){
        const user = await this.service.readByLogin(req.body.login);
        if(!bcrypt.compareSync(req.body.password, user.password))
            throw this.service.errors.wrongCredentials;
        else{
            const token = jwt.sign({
                'login': user.login
            }, 
            'zemla4ok',
            {
                expiresIn: 60*60    
            });
            res.cookie(authCookie, token);
            res.json({userId: user.id});
        }
    }
}

module.exports = (userService) => {
    const controller = new AuthenticationController(
        userService
    );
    return controller.router;
}