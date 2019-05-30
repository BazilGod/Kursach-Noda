'use strict'

const tokens = require('../helpers/tokens');
const authCookie = '__service_token';

const {
    AbilityBuilder,
    Ability
} = require('casl');

module.exports.ability = () =>
    ((req, res, next) => {
        const {
            rules,
            can,
            cannot
        } = AbilityBuilder.extract();

        const token = req.cookies[authCookie];
        const userToken = tokens.verifyToken(token);

        const name = userToken.login || 'anon';

        if(name !== 'anon'){
            can('delete', 'User', {
                login: name
            });
            can('update', 'User', {
                login: name
            });
            can('create', 'User', { //for creating chat
                login: name
            });
        }

        req.ability = new Ability(rules);
        next();
    });

module.exports.checkAuth = (ability, action, obj) => {
    if (obj && ability && ability.cannot(action, obj)) {
        return {
            access: false,
            error: {
                message: `Unauthorized access. Action ${action} on item ${obj._modelOptions.name.singular}`,
                status: 403
            }
        };
    }
    return {
        access: true
    };
};

