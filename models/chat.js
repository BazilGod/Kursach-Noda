'use strict';

module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Chat', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        }
    })
}