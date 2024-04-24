require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(`${process.env.DB_NAME}`,`${process.env.DB_USERNME}`,`${process.env.DB_PSW}`,{
    dialect:'mysql',
    host: 'localhost'
});

module.exports = sequelize;
