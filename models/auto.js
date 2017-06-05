'use strict';
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('auto', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        nameAuto:Sequelize.STRING,
        
        time:Sequelize.STRING,
        
        nameStop:Sequelize.STRING
    });
};