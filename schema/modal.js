const {DataTypes} = require('sequelize');
const sequelize = require('../modal/database');

const User = sequelize.define("clientdata",{
    name : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING
    },
    admin : {
        type :DataTypes.STRING
    },
    photo : {
        type : DataTypes.STRING
    },
    agree : {
        type : DataTypes.STRING
    }
})

module.exports = User;