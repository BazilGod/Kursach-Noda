'use strict';

module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Message', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: Sequelize.STRING
        }
    })
}