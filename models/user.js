const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('User',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    },
    phoneNumber:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    linkedId:{
        type: Sequelize.INTEGER,
    },
    linkedPrecedence:{
        type: Sequelize.STRING,
        defaultValue: 'primary'
    },
    createdAt:{
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('now')
    },
    updatedAt:{
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('now')
    },
    deletedAt:{
        type: Sequelize.DATE,
    }
});

module.exports = User;