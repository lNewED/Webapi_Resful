const config = require("../config/db.configs")

const Sequelize = require('sequelize');
const sequalize = new Sequelize(config.DB, config.USER , config.PASSWORD, {
    host:config.HOST,
    dialect: config.dialect,
    dialectOptions:{
        ssl:{
            require:true,
            rejectUnauthorized:false
        }
    },
    pool:{
        max:config.pool.max,
        min:config.pool.min,
        acqurire:config.pool.acquire,
        idle:config.pool.idle
    }
})

const db = {};
db.Sequelize = Sequelize;
db.sequalize = sequalize;

db.user = require("./user.model")(sequalize, Sequelize);
db.role = require("./role.model")(sequalize, Sequelize);

//one to many
db.role.belongsToMany(db.user,{
    through:"user_roles"
});

//one to many 
db.user.belongsToMany(db.role,{
    through:"user_roles"
});

db.ROLES=["user", "admin", "moderator"]

module.exports = db;