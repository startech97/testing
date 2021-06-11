require('dotenv').config();
const {Sequelize} = require('sequelize')
    const name = process.env.DB_NAME
    const user = process.env.DB_USER
    const password = process.env.DB_PASSWORD
    const port = process.env.DB_PORT
    
module.exports = new Sequelize(
    name,
    user,
    password,
    {
        dialect: 'postgres',
        host: "localhost",
        port,
    }
)