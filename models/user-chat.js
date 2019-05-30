'use strict';

module.exports = (Sequelize, sequelize) => {
    return sequelize.define('UserChat', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    })
}