'use strict';
module.exports = (Sequelize, config) => {
    let sequelize;
    if (process.env.NODE_KIN === 'production') {
        const options = {
            host: config.prod.host,
            dialect: config.prod.dialect,
            logging: false,
            define: {
                timestamps: true,
                paranoid: true,
                defaultScope: {
                    where: {
                        deletedAt: {$eq: null}
                    }
                }
            }
        };
        sequelize = new Sequelize(config.prod.name, config.prod.user, config.prod.password, options);
    }
    else{
        const options = {
            host: config.dev.host,
            dialect: config.dev.dialect,
            logging: false,
            define: {
                timestamps: true,
                paranoid: true,
                defaultScope: {
                    where: {
                        deletedAt: {$eq: null}
                    }
                }
            }
        };
        sequelize = new Sequelize(config.dev.name, config.dev.user, config.dev.password, options);
    }

    const User = require('../models/user')(Sequelize, sequelize);
    const Role = require('../models/role')(Sequelize, sequelize);
    const Auto = require('../models/auto')(Sequelize, sequelize);

    User.belongsTo(Role);
    Role.hasMany(User);

    return {
        user: User,
        role: Role,
        auto: Auto,
        sequelize: sequelize
    };
};