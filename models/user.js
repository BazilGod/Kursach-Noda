'use strict';

module.exports = (Sequelize, sequelize) => {
    return sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        name: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        login: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    })
}