const {Sequelize,DataTypes} = require('sequelize');

const sequelize = new Sequelize("client","root","root",{
    host : "localhost",
    dialect : 'mysql'
})

sequelize.authenticate().then((err) => {
    if(err){
        console.log(err)
    }
    console.log("database connected...")
})

sequelize.sync()

module.exports =sequelize;